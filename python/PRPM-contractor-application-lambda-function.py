import json
import smtplib
import ssl
from email.message import EmailMessage
import os
import re
from datetime import datetime
from typing import Dict, Any, Tuple
from urllib.parse import urlparse

# SMTP setup (use Lambda environment variables for security)
SMTP_SERVER = "smtp.zeptomail.com"
PORT = 587
USERNAME = os.environ.get('ZEPTO_USER', '')
PASSWORD = os.environ.get('ZEPTO_PASS', '')
FROM_EMAIL = "noreply@paxriverpm.com"
TO_EMAIL = "info@paxriverpm.com"

# Validation constants
MAX_STRING_LENGTH = 500
MAX_TEXTAREA_LENGTH = 2000


def validate_email(email: str) -> bool:
    """Validate email format using regex."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_zip_code(zip_code: str) -> bool:
    """Validate US zip code format (5 digits or 5+4 format)."""
    pattern = r'^\d{5}(-\d{4})?$'
    return bool(re.match(pattern, zip_code))


def validate_phone(phone: str) -> bool:
    """Validate phone number format (XXX-XXX-XXXX)."""
    # Remove any whitespace
    phone = phone.strip()
    # Pattern for XXX-XXX-XXXX format
    pattern = r'^\d{3}-\d{3}-\d{4}$'
    return bool(re.match(pattern, phone))


def validate_website(website: str) -> bool:
    """Validate website URL format."""
    if not website or not website.strip():
        return True  # Optional field, empty is valid
    
    website = website.strip()
    # Add http:// if no scheme is present
    if not website.startswith(('http://', 'https://')):
        website = 'https://' + website
    
    try:
        result = urlparse(website)
        # Check if it has a valid netloc (domain)
        return all([result.scheme in ['http', 'https'], result.netloc])
    except Exception:
        return False


def validate_string(value: str, field_name: str, required: bool = True, max_length: int = MAX_STRING_LENGTH) -> Tuple[bool, str]:
    """Validate string fields."""
    if required and (not value or not value.strip()):
        return False, f"{field_name} is required"
    
    if value and len(value) > max_length:
        return False, f"{field_name} must not exceed {max_length} characters"
    
    return True, ""


def validate_contractor_data(body: Dict[str, Any]) -> Tuple[bool, Dict[str, str]]:
    """Comprehensive validation of contractor application form data."""
    errors = {}
    
    # Required string fields - Company Information
    required_company_fields = {
        'companyName': 'Company name',
        'typeOfService': 'Type of service',
        'streetAddress': 'Street address',
        'city': 'City',
        'state': 'State',
        'zipCode': 'Zip code'
    }
    
    for field, field_name in required_company_fields.items():
        value = body.get(field, '').strip()
        is_valid, error_msg = validate_string(value, field_name, required=True)
        if not is_valid:
            errors[field] = error_msg
    
    # Zip code validation (specific)
    zip_code = body.get('zipCode', '').strip()
    if zip_code:
        if not validate_zip_code(zip_code):
            errors['zipCode'] = 'Please enter a valid zip code (format: 12345 or 12345-6789)'
    
    # Website validation (optional)
    website = body.get('website', '').strip()
    if website:
        if not validate_website(website):
            errors['website'] = 'Please enter a valid website URL'
    
    # Required string fields - Primary Contact
    required_contact_fields = {
        'firstName': 'First name',
        'lastName': 'Last name',
        'title': 'Title',
        'email': 'Email',
        'officeNumber': 'Office number'
    }
    
    for field, field_name in required_contact_fields.items():
        value = body.get(field, '').strip()
        is_valid, error_msg = validate_string(value, field_name, required=True)
        if not is_valid:
            errors[field] = error_msg
    
    # Email validation (specific)
    email = body.get('email', '').strip()
    if email:
        if not validate_email(email):
            errors['email'] = 'Please enter a valid email address'
    
    # Phone number validations
    phone_fields = {
        'officeNumber': 'Office number',
        'mobilePhone': 'Mobile phone'
    }
    
    for field, field_name in phone_fields.items():
        value = body.get(field, '').strip()
        if field == 'officeNumber' or value:  # Office number is required, mobile is optional
            if not value:
                if field == 'officeNumber':
                    errors[field] = f"{field_name} is required"
            elif not validate_phone(value):
                errors[field] = f"{field_name} must be in format XXX-XXX-XXXX"
    
    # Optional license fields
    optional_license_fields = {
        'licenseName': ('License name', MAX_STRING_LENGTH),
        'licenseNumber': ('License number', MAX_STRING_LENGTH),
        'licenseType': ('License type', MAX_STRING_LENGTH)
    }
    
    for field, (field_name, max_length) in optional_license_fields.items():
        value = body.get(field, '').strip()
        if value:
            is_valid, error_msg = validate_string(value, field_name, required=False, max_length=max_length)
            if not is_valid:
                errors[field] = error_msg
    
    # Required Reference 1 fields
    required_ref1_fields = {
        'reference1Name': 'Reference 1 name',
        'reference1Title': 'Reference 1 title',
        'reference1Phone': 'Reference 1 phone',
        'reference1BusinessType': 'Reference 1 type of business'
    }
    
    for field, field_name in required_ref1_fields.items():
        value = body.get(field, '').strip()
        if field == 'reference1Phone':
            if not value:
                errors[field] = f"{field_name} is required"
            elif not validate_phone(value):
                errors[field] = f"{field_name} must be in format XXX-XXX-XXXX"
        else:
            is_valid, error_msg = validate_string(value, field_name, required=True)
            if not is_valid:
                errors[field] = error_msg
    
    # Required Reference 2 fields
    required_ref2_fields = {
        'reference2Name': 'Reference 2 name',
        'reference2Title': 'Reference 2 title',
        'reference2Phone': 'Reference 2 phone',
        'reference2BusinessType': 'Reference 2 type of business'
    }
    
    for field, field_name in required_ref2_fields.items():
        value = body.get(field, '').strip()
        if field == 'reference2Phone':
            if not value:
                errors[field] = f"{field_name} is required"
            elif not validate_phone(value):
                errors[field] = f"{field_name} must be in format XXX-XXX-XXXX"
        else:
            is_valid, error_msg = validate_string(value, field_name, required=True)
            if not is_valid:
                errors[field] = error_msg
    
    return len(errors) == 0, errors


def format_email_content(body: Dict[str, Any]) -> str:
    """Format the contractor application data into a readable email."""
    content = f"""
New Contractor Application Submission:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPANY INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Company Name: {body.get('companyName', 'N/A')}
Type of Service: {body.get('typeOfService', 'N/A')}
Street Address: {body.get('streetAddress', 'N/A')}
City: {body.get('city', 'N/A')}
State: {body.get('state', 'N/A')}
Zip Code: {body.get('zipCode', 'N/A')}
Website: {body.get('website', 'Not provided')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIMARY CONTACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
First Name: {body.get('firstName', 'N/A')}
Last Name: {body.get('lastName', 'N/A')}
Title: {body.get('title', 'N/A')}
Email: {body.get('email', 'N/A')}
Mobile Phone: {body.get('mobilePhone', 'Not provided')}
Office Number: {body.get('officeNumber', 'N/A')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIMARY STATE LICENSE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name (as it appears on license): {body.get('licenseName', 'Not provided')}
License Number: {body.get('licenseNumber', 'Not provided')}
Type of License: {body.get('licenseType', 'Not provided')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REFERENCE #1:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {body.get('reference1Name', 'N/A')}
Title: {body.get('reference1Title', 'N/A')}
Phone Number: {body.get('reference1Phone', 'N/A')}
Type of Business: {body.get('reference1BusinessType', 'N/A')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REFERENCE #2:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {body.get('reference2Name', 'N/A')}
Title: {body.get('reference2Title', 'N/A')}
Phone Number: {body.get('reference2Phone', 'N/A')}
Type of Business: {body.get('reference2BusinessType', 'N/A')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    return content


def lambda_handler(event, context):
    """
    AWS Lambda handler for contractor application form submissions.
    
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
        is_valid, validation_errors = validate_contractor_data(body)
        
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
        company_name = body.get('companyName', 'Unknown Company')
        contact_name = f"{body.get('firstName', '')} {body.get('lastName', '')}".strip() or 'Unknown'
        
        # Compose the email
        msg = EmailMessage()
        msg['Subject'] = f"New Contractor Application: {company_name} - {contact_name}"
        msg['From'] = FROM_EMAIL
        msg['To'] = TO_EMAIL
        msg.set_content(email_content)
        
        # Send email via ZeptoMail SMTP
        ssl_context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_SERVER, PORT) as server:
            server.starttls(context=ssl_context)
            server.login(USERNAME, PASSWORD)
            server.send_message(msg)
        
        print(f"Contractor application email sent successfully for: {company_name}")
        
        # Success response
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Contractor application submitted successfully! We will contact you shortly."
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

