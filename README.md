# 1Fi SDE1 Assignment - Mutual Fund Backed EMI Store

A production-ready, full-stack web application for **1Fi** that displays smartphones and laptops with dynamic, mutual-fund-backed EMI plans loaded from an SQLite database via Next.js REST API routes.

![1Fi EMI Store Header](https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop)

---

## 🌐 Live Demo & Deliverables

- **Live Deployed Demo**: [https://1fi-emi-store.vercel.app]([https://1fi-emi-store.vercel.app](https://onefi-mutual-fund-emi-store.onrender.com)) 
- **Video Showcase Demo**: *(Link to 2-5 min Google Drive / YouTube video walkthrough)*
- **GitHub Repository**: [https://github.com/your-username/1fi-emi-store](https://github.com/your-username/1fi-emi-store)

---

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 14+ (App Router), React 18, TypeScript
- **Styling & Icons**: Tailwind CSS, Lucide Icons, 1Fi Brand Design System
- **Database & ORM**: SQLite (`dev.db`), Prisma ORM
- **Backend API**: Next.js App Router REST API Routes (`/api/...`)
- **Scripting & Tooling**: `tsx` (TypeScript Executor), `prisma` CLI

---

## ✨ Features Implemented

1. **Dynamic Catalog Page (`/`)**:
   - Hero banner introducing 1Fi Mutual-Fund-Backed EMI offering.
   - Products loaded dynamically from `GET /api/products` SQLite database API.
   - Brand filter buttons (All, Apple, Samsung, Google).
   - Dynamic product cards displaying default variant price, strikethrough MRP, starting EMI calculation, cashback tags, and finish options counter.

2. **Dynamic Product Detail & EMI Selection Page (`/products/[slug]`)**:
   - Unique URLs per product (`/products/iphone-17-pro`, `/products/samsung-s24-ultra`, `/products/macbook-pro-m3`, `/products/google-pixel-9-pro`).
   - Interactive variant selector (Storage, Color, Finish pills / swatch dots) dynamically updating image, price, MRP, and savings.
   - **Mutual-Fund-Backed EMI Card List**: Matches the exact reference design from the assignment PDF.
     - iPhone 17 Pro seeded with exact values from the assignment PDF reference image:
       - `₹44,967 x 3m` (0% interest, ₹7,500 cashback)
       - `₹22,483 x 6m` (0% interest, ₹7,500 cashback)
       - `₹11,242 x 12m` (0% interest, ₹7,500 cashback)
       - `₹5,621 x 24m` (0% interest, ₹7,500 cashback)
       - `₹4,297 x 36m` (10.5% interest, ₹7,500 cashback)
       - `₹3,385 x 48m` (10.5% interest, ₹7,500 cashback)
       - `₹2,842 x 60m` (10.5% interest, ₹7,500 cashback)
     - Other products seeded with realistic demo EMI plans following the exact same structure.
   - Interactive EMI plan selector with active radio toggle state.
   - Action Button: **"Proceed with Selected Plan"**.

3. **Checkout & Order Creation Flow**:
   - Customer checkout drawer collecting Name, Email, Phone, and Shipping Address.
   - Validates inputs and posts to `POST /api/orders`.
   - Generates unique order number (e.g., `1FI-680400-8908`).
   - Order confirmation view with breakdown.

4. **Order History Dashboard (`/orders`)**:
   - View placed orders fetched dynamically from `GET /api/orders`.

5. **Interactive API Documentation (`/api-docs`)**:
   - Dedicated `/api-docs` page with interactive *"Try API Request"* feature executing live HTTP requests against the SQLite database from the browser UI.

---

## 🛠️ Local Setup & Run Instructions

### Prerequisites
- Node.js (v18+ or v22+)
- npm (v9+)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/1fi-emi-store.git
cd 1fi-emi-store
npm install
```

### 2. Database Setup & Seeding
```bash
# Push Prisma schema to SQLite database
npx prisma db push

# Seed SQLite database with sample products, variants, and EMI plans
npx tsx prisma/seed.ts
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Production Build & Start
```bash
npm run build
npm start
```

---

## 🗄️ Database Schema & Files

- **Prisma Schema**: [`prisma/schema.prisma`](file:///c:/Users/melka/Videos/1Fi%20EMI%20Store/prisma/schema.prisma)
- **SQL Schema File**: [`schema.sql`](file:///c:/Users/melka/Videos/1Fi%20EMI%20Store/schema.sql)
- **SQL Seed File**: [`seed.sql`](file:///c:/Users/melka/Videos/1Fi%20EMI%20Store/seed.sql)

### Models

- **Product**: `id`, `slug` (unique), `name`, `brand`, `description`, `badge`, `createdAt`
- **ProductVariant**: `id`, `productId`, `name`, `color`, `colorHex`, `storage`, `finish`, `mrp`, `price`, `imageUrl`, `isDefault`
- **EmiPlan**: `id`, `productId`, `monthlyAmount`, `tenureMonths`, `interestRate`, `cashbackAmount`, `isPopular`
- **Order**: `id`, `orderNumber` (unique), `customerName`, `customerEmail`, `customerPhone`, `shippingAddress`, `variantId`, `emiPlanId`, `totalAmount`, `monthlyEmi`, `tenureMonths`, `status`, `createdAt`

---

## 🔌 API Endpoints & Example Responses

### 1. `GET /api/products`
Retrieves all products with their variants and EMI plans.

**Response**:
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "prod-iphone17",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "badge": "NEW",
      "variants": [
        {
          "id": "var-iph17-256",
          "name": "256GB Silver",
          "color": "Silver",
          "storage": "256GB",
          "mrp": 134900,
          "price": 127400,
          "isDefault": true
        }
      ],
      "emiPlans": [
        {
          "id": "emi-iph-12m",
          "monthlyAmount": 11242,
          "tenureMonths": 12,
          "interestRate": 0,
          "cashbackAmount": 7500,
          "isPopular": true
        }
      ]
    }
  ]
}
```

### 2. `GET /api/products/:slug`
Retrieves single product details by slug (e.g., `iphone-17-pro`, `samsung-s24-ultra`, `macbook-pro-m3`, `google-pixel-9-pro`).

### 3. `POST /api/orders`
Submits a new order.

**Request Payload**:
```json
{
  "customerName": "Rahul Sharma",
  "customerEmail": "rahul.sharma@example.com",
  "customerPhone": "+91 98765 43210",
  "shippingAddress": "402 Sunrise Towers, MG Road, Bengaluru, 560001",
  "variantId": "var-iph17-256",
  "emiPlanId": "emi-iph-12m"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Order placed successfully!",
  "data": {
    "id": "cm...123",
    "orderNumber": "1FI-123456-7890",
    "customerName": "Rahul Sharma",
    "totalAmount": 127400,
    "monthlyEmi": 11242,
    "tenureMonths": 12,
    "status": "CONFIRMED"
  }
}
```

### 4. `GET /api/orders`
Retrieves all placed orders.

### 5. `GET /api/health`
Health check status.

---

Built for **1Fi SDE1 Assignment**.
