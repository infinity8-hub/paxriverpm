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
MAX_STRING_LENGTH = 200
MAX_MESSAGE_LENGTH = 5000


def validate_email(email: str) -> bool:
    """Validate email format using regex."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_phone(phone: str) -> bool:
    """Validate phone number format (XXX-XXX-XXXX)."""
    # Remove any whitespace
    phone = phone.strip()
    # Pattern for XXX-XXX-XXXX format
    pattern = r'^\d{3}-\d{3}-\d{4}$'
    return bool(re.match(pattern, phone))


def validate_string(value: str, field_name: str, required: bool = True, max_length: int = MAX_STRING_LENGTH) -> Tuple[bool, str]:
    """Validate string fields."""
    if required and (not value or not value.strip()):
        return False, f"{field_name} is required"
    
    if value and len(value) > max_length:
        return False, f"{field_name} must not exceed {max_length} characters"
    
    return True, ""


def validate_general_inquiry_data(body: Dict[str, Any]) -> Tuple[bool, Dict[str, str]]:
    """Comprehensive validation of general inquiry form data."""
    errors = {}
    
    # Required string fields
    required_fields = {
        'firstName': 'First name',
        'lastName': 'Last name',
        'email': 'Email',
        'message': 'Message'
    }
    
    for field, field_name in required_fields.items():
        value = body.get(field, '').strip()
        if field == 'message':
            is_valid, error_msg = validate_string(value, field_name, required=True, max_length=MAX_MESSAGE_LENGTH)
        else:
            is_valid, error_msg = validate_string(value, field_name, required=True)
        
        if not is_valid:
            errors[field] = error_msg
    
    # Email validation (specific)
    email = body.get('email', '').strip()
    if email:
        if not validate_email(email):
            errors['email'] = 'Please enter a valid email address'
    
    # Mobile phone validation (optional but should be valid if provided)
    mobile_phone = body.get('mobilePhone', '').strip()
    if mobile_phone:
        if not validate_phone(mobile_phone):
            errors['mobilePhone'] = 'Mobile phone must be in format XXX-XXX-XXXX'
    
    return len(errors) == 0, errors


def format_email_content(body: Dict[str, Any]) -> str:
    """Format the general inquiry data into a readable email."""
    first_name = body.get('firstName', 'N/A')
    last_name = body.get('lastName', 'N/A')
    full_name = f"{first_name} {last_name}".strip()
    
    content = f"""
New General Inquiry Submission:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {full_name}
First Name: {first_name}
Last Name: {last_name}
Email: {body.get('email', 'N/A')}
Mobile Phone: {body.get('mobilePhone', 'Not provided')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{body.get('message', 'N/A')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    return content


def lambda_handler(event, context):
    """
    AWS Lambda handler for general inquiry form submissions.
    
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
        is_valid, validation_errors = validate_general_inquiry_data(body)
        
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
        first_name = body.get('firstName', 'Unknown')
        last_name = body.get('lastName', 'Unknown')
        full_name = f"{first_name} {last_name}".strip() or 'Unknown'
        
        # Compose the email
        msg = EmailMessage()
        msg['Subject'] = f"New General Inquiry from {full_name}"
        msg['From'] = FROM_EMAIL
        msg['To'] = TO_EMAIL
        msg.set_content(email_content)
        
        # Send email via ZeptoMail SMTP
        ssl_context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_SERVER, PORT) as server:
            server.starttls(context=ssl_context)
            server.login(USERNAME, PASSWORD)
            server.send_message(msg)
        
        print(f"General inquiry email sent successfully from: {full_name}")
        
        # Success response
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "General inquiry submitted successfully! We will contact you shortly."
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

