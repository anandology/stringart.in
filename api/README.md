# String Art Kit Checkout API

A FastAPI-based checkout API for processing string art kit orders with UPI payment integration.

## Features

- ✅ Complete checkout processing with validation
- ✅ UPI payment link generation
- ✅ Email confirmation (background task)
- ✅ Comprehensive input validation
- ✅ CORS support for frontend integration
- ✅ Auto-generated API documentation
- ✅ Health check endpoint
- ✅ Order retrieval endpoint

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```bash
# UPI Configuration
UPI_ID=your-upi-id@bank
PAYEE_NAME=StringArt

# Email Configuration (for production)
EMAIL_SERVICE=sendgrid  # or smtp, ses, resend
EMAIL_API_KEY=your-email-api-key

# Database Configuration (for production)
DATABASE_URL=postgresql://user:password@localhost/dbname
```

### 3. Run the API

#### Development
```bash
python main.py
```

#### Production
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Endpoints

### POST /api/checkout
Process checkout and create order with UPI payment information.

**Request Body:**
```json
{
    "customer": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+91-9876543210",
        "addressLine1": "123 Main Street",
        "addressLine2": "Apartment 4B",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pinCode": "400001"
    },
    "items": [
        {
            "id": "string-art-kit-1",
            "title": "String Art Kit - Geometric Patterns",
            "price": 1499.0,
            "image": "/images/geometric-patterns.jpg",
            "quantity": 2
        }
    ],
    "totalPrice": 2998.0
}
```

**Response:**
```json
{
    "success": true,
    "orderNumber": "ORD20231215123456789",
    "paymentLink": "upi://pay?pa=stringart@upi&pn=StringArt&am=2998&tn=ORD20231215123456789",
    "qrCodeUrl": "upi://pay?pa=stringart@upi&pn=StringArt&am=2998&tn=ORD20231215123456789"
}
```

### GET /api/orders/{order_number}
Retrieve order details by order number.

### GET /health
Health check endpoint.

## Validation Rules

### Customer Information
- **name**: Required, non-empty string
- **email**: Valid email format
- **phone**: Minimum 10 digits
- **addressLine1**: Required, non-empty string
- **addressLine2**: Optional
- **city**: Required, non-empty string
- **state**: Required, non-empty string
- **pinCode**: Minimum 6 digits

### Cart Items
- **id**: Required, non-empty string
- **title**: Required, non-empty string
- **price**: Must be greater than 0
- **image**: Required, non-empty string
- **quantity**: Must be greater than 0

### Order Validation
- Cart cannot be empty
- Total price must match sum of all items
- Total price must be greater than 0

## Production Considerations

### 1. Database Integration
Replace the in-memory storage with a proper database:

```python
# Example with SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
```

### 2. Email Service Integration
Implement the `send_confirmation_email` function:

```python
# Example with SendGrid
import sendgrid
from sendgrid.helpers.mail import Mail

async def send_confirmation_email(customer, order_number, items, total_price):
    sg = sendgrid.SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))
    
    message = Mail(
        from_email='orders@stringart.in',
        to_emails=customer.email,
        subject=f'Order Confirmation - {order_number}',
        html_content=generate_email_html(customer, order_number, items, total_price)
    )
    
    response = sg.send(message)
    return response
```

### 3. Environment Variables
Set up proper environment variables for production:

```bash
# Production environment
export UPI_ID="your-production-upi-id@bank"
export PAYEE_NAME="StringArt"
export DATABASE_URL="postgresql://user:password@host/dbname"
export EMAIL_API_KEY="your-email-service-api-key"
```

### 4. Security
- Use HTTPS in production
- Implement rate limiting
- Add authentication if needed
- Validate and sanitize all inputs
- Log security events

### 5. Monitoring
- Add structured logging
- Implement metrics collection
- Set up error tracking (Sentry)
- Monitor API performance

## Testing

### Manual Testing
Use the Swagger UI at http://localhost:8000/docs to test endpoints.

### Automated Testing
Create test files:

```python
# test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_checkout_success():
    response = client.post("/api/checkout", json={
        "customer": {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "1234567890",
            "addressLine1": "123 Test St",
            "city": "Test City",
            "state": "Test State",
            "pinCode": "123456"
        },
        "items": [{
            "id": "test-item",
            "title": "Test Item",
            "price": 100.0,
            "image": "/test.jpg",
            "quantity": 1
        }],
        "totalPrice": 100.0
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["success"] == True
    assert "orderNumber" in data
```

## Deployment

### Docker
Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose
Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - UPI_ID=stringart@upi
      - PAYEE_NAME=StringArt
    volumes:
      - .:/app
```

## Frontend Integration

Update your frontend API service to point to the FastAPI backend:

```typescript
// frontend/src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const checkoutApi = async (data: CheckoutRequest): Promise<CheckoutResponse> => {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
};
``` 