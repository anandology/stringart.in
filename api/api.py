from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional
import uuid
from datetime import datetime
import logging
import os

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
    image: str
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

# In-memory storage for orders (replace with database in production)
orders_db = {}

def generate_order_number() -> str:
    """Generate unique order number with timestamp"""
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    unique_id = str(uuid.uuid4())[:8]
    return f"ORD{timestamp}{unique_id}"

def create_upi_payment_link(order_number: str, amount: float) -> str:
    """Create UPI payment link with proper parameters"""
    return f"upi://pay?pa={UPI_ID}&pn={PAYEE_NAME}&am={amount}&tn={order_number}"

async def send_confirmation_email(customer: CustomerInfo, order_number: str, items: List[CartItem], total_price: float):
    """Send confirmation email to customer (implement with your email service)"""
    # TODO: Implement email sending logic
    # Example: Send email with order details and UPI QR code
    logger.info(f"Sending confirmation email to {customer.email} for order {order_number}")
    
    # Placeholder for email implementation
    # You can use libraries like:
    # - smtplib for basic SMTP
    # - sendgrid for SendGrid service
    # - boto3 for AWS SES
    # - resend for Resend service
    
    email_content = f"""
    Order Confirmation - {order_number}
    
    Dear {customer.name},
    
    Thank you for your order! Here are your order details:
    
    Order Number: {order_number}
    Total Amount: ₹{total_price}
    
    Items:
    {chr(10).join([f"- {item.title} x{item.quantity} = ₹{item.price * item.quantity}" for item in items])}
    
    Shipping Address:
    {customer.addressLine1}
    {customer.addressLine2 or ''}
    {customer.city}, {customer.state} {customer.pinCode}
    
    Payment Instructions:
    1. Scan the QR code below or click the payment link
    2. Complete the UPI payment
    3. Reply to this email to confirm payment
    
    Payment Link: {create_upi_payment_link(order_number, total_price)}
    
    Best regards,
    String Art Team
    """
    
    logger.info(f"Email content prepared for {customer.email}")

@app.post("/api/checkout", response_model=CheckoutResponse)
async def checkout(request: CheckoutRequest, background_tasks: BackgroundTasks):
    """
    Process checkout and create order with UPI payment information
    """
    try:
        logger.info(f"Processing checkout for customer: {request.customer.email}")
        
        # Generate order number
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
        orders_db[order_number] = order_data
        
        # Send confirmation email in background
        background_tasks.add_task(
            send_confirmation_email,
            request.customer,
            order_number,
            request.items,
            request.totalPrice
        )
        
        logger.info(f"Order {order_number} created successfully")
        
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