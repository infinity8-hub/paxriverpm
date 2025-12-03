import json
import smtplib
import ssl
from email.message import EmailMessage
import os
import re
from datetime import datetime
from typing import Dict, Any, Tuple

# SMTP setup (use Lambda environment variables for security)
SMTP_SERVER = "smtp.zeptomail.com"
PORT = 587
USERNAME = os.environ.get('ZEPTO_USER', '')
PASSWORD = os.environ.get('ZEPTO_PASS', '')
FROM_EMAIL = "noreply@paxriverpm.com"
TO_EMAIL = "info@paxriverpm.com"

# Validation constants
VALID_STATES = ['Maryland', 'Virginia', 'DC', 'District of Columbia']
VALID_COMMUNITY_TYPES = ['condo', 'hoa', 'coop', 'apartment']
VALID_ON_SITE_STAFF = ['yes', 'no']
MAX_STRING_LENGTH = 1000
MAX_TEXTAREA_LENGTH = 5000


def validate_email(email: str) -> bool:
    """Validate email format using regex."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_zip_code(zip_code: str) -> bool:
    """Validate US zip code format (5 digits or 5+4 format)."""
    pattern = r'^\d{5}(-\d{4})?$'
    return bool(re.match(pattern, zip_code))


def validate_date(date_str: str) -> Tuple[bool, str]:
    """Validate date format and ensure it's in the future."""
    try:
        # Try parsing different date formats
        date_formats = ['%Y-%m-%d', '%m/%d/%Y', '%Y/%m/%d']
        parsed_date = None
        
        for fmt in date_formats:
            try:
                parsed_date = datetime.strptime(date_str, fmt)
                break
            except ValueError:
                continue
        
        if parsed_date is None:
            return False, "Invalid date format"
        
        # Check if date is in the future
        if parsed_date.date() < datetime.now().date():
            return False, "Deadline date must be in the future"
        
        return True, ""
    except Exception as e:
        return False, f"Date validation error: {str(e)}"


def validate_number(value: str, field_name: str, min_value: int = 0, max_value: int = None) -> Tuple[bool, str]:
    """Validate numeric fields."""
    if not value or not value.strip():
        return False, f"{field_name} is required"
    
    try:
        num_value = int(value)
        if num_value < min_value:
            return False, f"{field_name} must be at least {min_value}"
        if max_value is not None and num_value > max_value:
            return False, f"{field_name} must not exceed {max_value}"
        return True, ""
    except ValueError:
        return False, f"{field_name} must be a valid number"


def validate_string(value: str, field_name: str, required: bool = True, max_length: int = MAX_STRING_LENGTH) -> Tuple[bool, str]:
    """Validate string fields."""
    if required and (not value or not value.strip()):
        return False, f"{field_name} is required"
    
    if value and len(value) > max_length:
        return False, f"{field_name} must not exceed {max_length} characters"
    
    return True, ""


def validate_proposal_data(body: Dict[str, Any]) -> Tuple[bool, Dict[str, str]]:
    """Comprehensive validation of proposal form data."""
    errors = {}
    
    # Required string fields
    required_string_fields = {
        'communityName': 'Community name',
        'address': 'Address',
        'city': 'City',
        'zipCode': 'Zip code',
        'specialRequirements': 'Special requirements',
        'communityAmenities': 'Community amenities',
        'annualBudget': 'Annual budget',
        'reserveBudget': 'Reserve budget',
        'contactName': 'Contact name',
        'contactEmail': 'Contact email'
    }
    
    for field, field_name in required_string_fields.items():
        value = body.get(field, '')
        if field == 'specialRequirements' or field == 'communityAmenities':
            is_valid, error_msg = validate_string(value, field_name, required=True, max_length=MAX_TEXTAREA_LENGTH)
        else:
            is_valid, error_msg = validate_string(value, field_name, required=True)
        
        if not is_valid:
            errors[field] = error_msg
    
    # Email validation (specific)
    contact_email = body.get('contactEmail', '').strip()
    if contact_email:
        if not validate_email(contact_email):
            errors['contactEmail'] = 'Please enter a valid email address'
    
    # Zip code validation (specific)
    zip_code = body.get('zipCode', '').strip()
    if zip_code:
        if not validate_zip_code(zip_code):
            errors['zipCode'] = 'Please enter a valid zip code (format: 12345 or 12345-6789)'
    
    # State validation
    state = body.get('state', '').strip()
    if not state:
        errors['state'] = 'State is required'
    elif state not in VALID_STATES:
        errors['state'] = f'State must be one of: {", ".join(VALID_STATES)}'
    
    # Community type validation
    community_type = body.get('communityType', '').strip()
    if not community_type:
        errors['communityType'] = 'Community type is required'
    elif community_type not in VALID_COMMUNITY_TYPES:
        errors['communityType'] = f'Community type must be one of: {", ".join(VALID_COMMUNITY_TYPES)}'
    
    # Number validations
    number_fields = {
        'numberOfUnits': ('Number of units', 1, 100000),
        'selfManagementYears': ('Self-management years', 0, 100),
        'professionalManagementYears': ('Professional management years', 0, 100)
    }
    
    for field, (field_name, min_val, max_val) in number_fields.items():
        value = body.get(field, '').strip()
        is_valid, error_msg = validate_number(value, field_name, min_value=min_val, max_value=max_val)
        if not is_valid:
            errors[field] = error_msg
    
    # On-site staff validation (optional but should be valid if provided)
    on_site_staff = body.get('onSiteStaff', '').strip().lower()
    if on_site_staff and on_site_staff not in VALID_ON_SITE_STAFF:
        errors['onSiteStaff'] = f'On-site staff must be one of: {", ".join(VALID_ON_SITE_STAFF)}'
    
    # Deadline date validation
    deadline_date = body.get('deadlineDate', '').strip()
    if not deadline_date:
        errors['deadlineDate'] = 'Deadline date is required'
    else:
        is_valid, error_msg = validate_date(deadline_date)
        if not is_valid:
            errors['deadlineDate'] = error_msg
    
    # Optional fields validation (length checks)
    optional_fields = {
        'boardMemberInfo': ('Board member info', MAX_STRING_LENGTH),
        'boardPresidentInfo': ('Board president info', MAX_TEXTAREA_LENGTH)
    }
    
    for field, (field_name, max_length) in optional_fields.items():
        value = body.get(field, '')
        if value:
            is_valid, error_msg = validate_string(value, field_name, required=False, max_length=max_length)
            if not is_valid:
                errors[field] = error_msg
    
    return len(errors) == 0, errors


def format_email_content(body: Dict[str, Any]) -> str:
    """Format the proposal data into a readable email."""
    content = f"""
New Proposal Request Submission:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMMUNITY INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Community Name: {body.get('communityName', 'N/A')}
Address: {body.get('address', 'N/A')}
City: {body.get('city', 'N/A')}
State: {body.get('state', 'N/A')}
Zip Code: {body.get('zipCode', 'N/A')}
Number of Units: {body.get('numberOfUnits', 'N/A')}
Community Type: {body.get('communityType', 'N/A').upper()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MANAGEMENT HISTORY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Self-Management Years: {body.get('selfManagementYears', 'N/A')}
Professional Management Years: {body.get('professionalManagementYears', 'N/A')}
On-Site Staff: {body.get('onSiteStaff', 'N/A').upper()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BOARD INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Board Member Info: {body.get('boardMemberInfo', 'Not provided')}
Board President Info: {body.get('boardPresidentInfo', 'Not provided')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUIREMENTS & AMENITIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Special Requirements:
{body.get('specialRequirements', 'N/A')}

Community Amenities:
{body.get('communityAmenities', 'N/A')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUDGET INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Annual Budget: {body.get('annualBudget', 'N/A')}
Reserve Budget: {body.get('reserveBudget', 'N/A')}
Deadline Date: {body.get('deadlineDate', 'N/A')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Contact Name: {body.get('contactName', 'N/A')}
Contact Email: {body.get('contactEmail', 'N/A')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    return content


def lambda_handler(event, context):
    """
    AWS Lambda handler for proposal form submissions.
    
    Validates form data and sends email notification via ZeptoMail SMTP.
    """
    try:
        # Check environment variables
        if not USERNAME or not PASSWORD:
            print("Error: SMTP credentials not configured")
            return {
                "statusCode": 500,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "message": "Server configuration error. Please contact support.",
                    "error": "SMTP credentials missing"
                })
            }
        
        # Parse incoming request
        if not event.get('body'):
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "message": "Request body is missing",
                    "errors": {}
                })
            }
        
        body = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        
        # Validate all fields
        is_valid, validation_errors = validate_proposal_data(body)
        
        if not is_valid:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "message": "Validation failed. Please check the errors below.",
                    "errors": validation_errors
                })
            }
        
        # Format email content
        email_content = format_email_content(body)
        contact_name = body.get('contactName', 'Unknown')
        community_name = body.get('communityName', 'Unknown Community')
        
        # Compose the email
        msg = EmailMessage()
        msg['Subject'] = f"New Proposal Request: {community_name} - {contact_name}"
        msg['From'] = FROM_EMAIL
        msg['To'] = TO_EMAIL
        msg.set_content(email_content)
        
        # Send email via ZeptoMail SMTP
        ssl_context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_SERVER, PORT) as server:
            server.starttls(context=ssl_context)
            server.login(USERNAME, PASSWORD)
            server.send_message(msg)
        
        print(f"Proposal email sent successfully for: {community_name}")
        
        # Success response
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Proposal request submitted successfully! We will be in touch with you shortly."
            })
        }
    
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {str(e)}")
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Invalid JSON format in request body.",
                "error": str(e)
            })
        }
    
    except smtplib.SMTPException as e:
        print(f"SMTP error: {str(e)}")
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Failed to send email. Please try again later.",
                "error": "SMTP error"
            })
        }
    
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "An unexpected error occurred. Please try again later.",
                "error": "Internal server error"
            })
        }

