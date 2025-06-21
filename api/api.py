from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime
import logging
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
import json
from pathlib import Path
import qrcode
import io
import base64
from jinja2 import Environment, FileSystemLoader
from urllib.parse import urlencode

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="String Art Kit Checkout API",
    description="API for processing string art kit orders with UPI payment integration",
    version="1.0.0"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models for Request/Response
class CustomerInfo(BaseModel):
    name: str
    email: EmailStr
    phone: str
    addressLine1: str
    addressLine2: Optional[str] = None
    city: str
    state: str
    pinCode: str
    
    @validator('phone')
    def validate_phone(cls, v):
        if not v or len(v) < 10:
            raise ValueError('Phone number must be at least 10 digits')
        return v
    
    @validator('pinCode')
    def validate_pin_code(cls, v):
        if not v or len(v) < 6:
            raise ValueError('PIN code must be at least 6 digits')
        return v

class CartItem(BaseModel):
    id: str
    title: str
    price: float
    quantity: int
    
    @validator('price')
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError('Price must be greater than 0')
        return v
    
    @validator('quantity')
    def validate_quantity(cls, v):
        if v <= 0:
            raise ValueError('Quantity must be greater than 0')
        return v

class CheckoutRequest(BaseModel):
    customer: CustomerInfo
    items: List[CartItem]
    totalPrice: float
    
    @validator('items')
    def validate_items(cls, v):
        if not v:
            raise ValueError('Cart cannot be empty')
        return v
    
    @validator('totalPrice')
    def validate_total_price(cls, v, values):
        if v <= 0:
            raise ValueError('Total price must be greater than 0')
        
        # Validate total matches items
        if 'items' in values:
            calculated_total = sum(item.price * item.quantity for item in values['items'])
            if abs(v - calculated_total) > 0.01:  # Allow small floating point differences
                raise ValueError('Total price does not match sum of items')
        return v

class CheckoutResponse(BaseModel):
    success: bool
    orderNumber: str
    qrCodeUrl: Optional[str] = None
    paymentLink: Optional[str] = None
    error: Optional[str] = None

# Configuration
UPI_ID = os.getenv("UPI_ID", "stringart@upi")
PAYEE_NAME = os.getenv("PAYEE_NAME", "StringArt")
GMAIL_FROM_ADDRESS = os.getenv("GMAIL_FROM_ADDRESS", "orders@stringart.in")
PAYMENT_INSTRUCTIONS_LINK = os.getenv("PAYMENT_INSTRUCTIONS_LINK", "https://stringart.in/payment-instructions")

# Create orders directory if it doesn't exist
ORDERS_DIR = Path("orders")
ORDERS_DIR.mkdir(exist_ok=True)

# Setup Jinja2 template environment
TEMPLATE_DIR = Path("templates")
template_env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

# In-memory storage for orders (replace with database in production)
orders_db = {}

def get_next_order_sequence() -> int:
    """Get the next order sequence number by checking existing files"""
    try:
        existing_files = list(ORDERS_DIR.glob("*.json"))
        if not existing_files:
            return 1
        
        # Extract sequence numbers from filenames and find the max
        sequence_numbers = []
        for file_path in existing_files:
            try:
                sequence = int(file_path.stem)
                sequence_numbers.append(sequence)
            except ValueError:
                continue
        
        return max(sequence_numbers) + 1 if sequence_numbers else 1
    except Exception as e:
        logger.error(f"Error getting next order sequence: {e}")
        return 1

def save_order_to_file(order_data: dict) -> str:
    """Save order data to a JSON file with sequential numbering"""
    try:
        sequence = get_next_order_sequence()
        filename = f"{sequence:03d}.json"  # 001.json, 002.json, etc.
        file_path = ORDERS_DIR / filename
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(order_data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Order saved to file: {file_path}")
        return filename
    except Exception as e:
        logger.error(f"Error saving order to file: {e}")
        raise

def generate_order_number() -> str:
    """Generate order number based on next sequence number"""
    sequence = get_next_order_sequence()
    return f"{sequence:03d}"  # 001, 002, etc.

def create_upi_payment_link(order_number: str, amount: float) -> str:
    """Create UPI payment link with proper parameters"""
    return f"upi://pay?pa={UPI_ID}&pn={PAYEE_NAME}&am={amount}&tn={order_number}"

async def send_confirmation_email(customer: CustomerInfo, order_number: str, items: List[CartItem], total_price: float):
    """Send confirmation email to customer using Google SMTP with Jinja2 template"""
    try:
        # Get email credentials from environment
        gmail_user = os.getenv("GMAIL_USER")
        gmail_password = os.getenv("GMAIL_APP_PASSWORD")
        
        if not gmail_user or not gmail_password:
            logger.error("GMAIL_USER or GMAIL_APP_PASSWORD not set in environment variables")
            return
        
        # Create UPI payment link
        payment_link = create_upi_payment_link(order_number, total_price)
        
        # Build payment instructions URL with query params
        payment_instructions_url = f"{PAYMENT_INSTRUCTIONS_LINK}?" + urlencode({
            'amount': total_price,
            'comment': f"Order {order_number}"
        })
        
        # Load and render template
        template = template_env.get_template("email_order_confirmation.html")
        html_content = template.render(
            customer=customer,
            order_number=order_number,
            items=items,
            total_price=total_price,
            payment_instructions_url=payment_instructions_url,
            upi_id=UPI_ID
        )
        
        # Save HTML content to file for debugging
        try:
            with open("email.html", "w", encoding="utf-8") as f:
                f.write(html_content)
            logger.info(f"Email HTML saved to email.html for order {order_number}")
        except Exception as e:
            logger.error(f"Failed to save email HTML: {e}")
        
        # Create plain text content
        text_content = f"""
        Order Confirmation - {order_number}
        
        Dear {customer.name},
        
        Thank you for your order! Here are your order details:
        
        Order Number: {order_number}
        Total Amount: ₹{total_price}
        
        Items:
        {chr(10).join([f'- {item.title} x{item.quantity} = ₹{item.price * item.quantity}' for item in items])}
        
        Shipping Address:
        {customer.addressLine1}
        {customer.addressLine2 or ''}
        {customer.city}, {customer.state} {customer.pinCode}
        
        Payment Instructions:
        1. Scan the QR code in the HTML version or click the payment link
        2. Complete the UPI payment
        3. Reply to this email to confirm payment
        
        Payment Link: {payment_link}
        
        Best regards,
        String Art Studio
        """
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"Order Confirmation - {order_number}"
        msg['From'] = formataddr(("String Art Studio", GMAIL_FROM_ADDRESS))
        msg['To'] = customer.email
        
        # Attach both HTML and plain text versions
        msg.attach(MIMEText(text_content, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        # Send email using Google SMTP
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(gmail_user, gmail_password)
            server.send_message(msg)
        
        logger.info(f"Confirmation email sent successfully to {customer.email} for order {order_number}")
        
    except smtplib.SMTPAuthenticationError:
        logger.error(f"SMTP authentication failed for {gmail_user}. Check GMAIL_APP_PASSWORD.")
    except smtplib.SMTPRecipientsRefused as e:
        logger.error(f"Email recipient refused: {customer.email}. Error: {e}")
    except smtplib.SMTPServerDisconnected:
        logger.error("SMTP server disconnected unexpectedly")
    except smtplib.SMTPException as e:
        logger.error(f"SMTP error occurred: {e}")
    except Exception as e:
        logger.error(f"Unexpected error sending email to {customer.email}: {e}")

def generate_qr_code_base64(data: str, size: int = 200) -> str:
    """Generate QR code and return as base64 string"""
    try:
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(data)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Convert to base64
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        return f"data:image/png;base64,{img_str}"
    except Exception as e:
        logger.error(f"Error generating QR code: {e}")
        return ""

@app.post("/api/checkout", response_model=CheckoutResponse)
async def checkout(request: CheckoutRequest, background_tasks: BackgroundTasks):
    """
    Process checkout and create order with UPI payment information
    """
    try:
        logger.info(f"Processing checkout for customer: {request.customer.email}")
        
        # Generate order number (sequential)
        order_number = generate_order_number()
        
        # Create UPI payment link
        payment_link = create_upi_payment_link(order_number, request.totalPrice)
        
        # Store order in database (replace with actual database)
        order_data = {
            "orderNumber": order_number,
            "customer": request.customer.dict(),
            "items": [item.dict() for item in request.items],
            "totalPrice": request.totalPrice,
            "status": "pending",
            "createdAt": datetime.now().isoformat(),
            "paymentLink": payment_link
        }
        
        # Save order to file
        filename = save_order_to_file(order_data)
        order_data["filename"] = filename
        
        # Also keep in memory for quick access
        orders_db[order_number] = order_data
        
        # Send confirmation email in background
        background_tasks.add_task(
            send_confirmation_email,
            request.customer,
            order_number,
            request.items,
            request.totalPrice
        )
        
        logger.info(f"Order {order_number} created successfully and saved to {filename}")
        
        return CheckoutResponse(
            success=True,
            orderNumber=order_number,
            paymentLink=payment_link,
            qrCodeUrl=payment_link  # QR code will be generated from this URL
        )
        
    except Exception as e:
        logger.error(f"Checkout error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Unable to complete checkout. Please try again after sometime."
        )

@app.get("/api/orders/{order_number}")
async def get_order(order_number: str):
    """
    Get order details by order number
    """
    if order_number not in orders_db:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return orders_db[order_number]

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 