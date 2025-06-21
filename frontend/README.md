# String Art Studio - Frontend

The frontend code for the website of String Art Studio.

## Data Directory Structure (`src/data`)

The `src/data` directory is used to manage all structured data for the frontend app. Data is authored in YAML files and compiled into a single `app.json` for the frontend to consume.

```
frontend/
  src/
    data/
      app.json           # Generated: Combined data for the frontend (products, gallery, etc.)
      products.yml       # List of product IDs/keys (order and selection)
      gallery.yml        # All gallery image data (YAML format)
      products/          # Directory containing individual product YAML files
        starter-kit.yaml
        advanced-kit.yaml
        rings-kit.yaml
```

- **Edit YAML files** (`products.yml`, `gallery.yml`, `products/*.yaml`) as your source of truth.
- **Run `make`** in `frontend/` to generate `src/data/app.json`.
- **Frontend loads only `app.json`** for all product and gallery data.

## Shopping Cart Functionality

The app includes a complete shopping cart system with checkout and payment integration:

### Features
- Add/remove items from cart
- Update quantities
- Persistent cart storage (localStorage)
- Checkout form with customer details
- Payment confirmation with UPI QR code
- Order tracking via email confirmation

### API Integration
- Checkout API endpoint: `/api/checkout` (configurable)
- Dummy implementation included for testing
- Environment-based configuration

### Environment Configuration
Copy `env.example` to `.env` and configure:
```
VITE_API_BASE_URL=/api
```

For production builds, set the environment variable at build time:
```bash
VITE_API_BASE_URL=https://api.yoursite.com npm run build
```

## Payment Instructions Page

The payment instructions page is available at `/payment-instructions` and displays:

- QR code for UPI payment
- UPI ID with copy functionality
- Payment amount and reference from query parameters
- Step-by-step payment instructions

### Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=/api

# Payment Configuration
VITE_UPI_ID=your-upi-id@bank
VITE_PAYEE_NAME=StringArt
```

### Usage

The payment instructions page accepts query parameters:

- `amount`: The payment amount (e.g., `amount=500.00`)
- `comment`: Payment reference/comment (e.g., `comment=Order 007`)

Example URL:
```
/payment-instructions?amount=500.00&comment=Order%20007
```

### Features

- **QR Code Generation**: Automatically generates QR code for UPI payment
- **UPI Link**: Clickable UPI link that opens payment apps
- **Copy UPI ID**: One-click copy functionality for the UPI ID
- **Responsive Design**: Works on mobile and desktop
- **Payment Instructions**: Clear step-by-step guide

### Dependencies

The page uses the following packages:
- `qrcode.react`: For QR code generation
- `react-router-dom`: For routing and query parameter handling
- `lucide-react`: For icons

## Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

