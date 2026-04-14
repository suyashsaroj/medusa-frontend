# Desi Cart — Indian Ecommerce Storefront

A production-ready Next.js storefront built on [Medusa's official starter](https://github.com/medusajs/nextjs-starter-medusa), customized for Indian ecommerce with Razorpay payments and Shiprocket shipping integration.

## Features

- **Full Ecommerce Flow**: Product listing, product details, cart, checkout, user accounts, order history
- **Razorpay Payments**: UPI, Cards, Wallets — India's most popular payment gateway
- **Shiprocket Shipping**: Real-time tracking, shipping rates, pan-India delivery
- **Order Tracking**: Dedicated tracking page with AWB/shipment lookup
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS, TypeScript
- **SSR/ISR**: Server-side rendering and incremental static regeneration
- **SEO Optimized**: Meta tags, Open Graph images, sitemap generation

## Prerequisites

- Node.js 18+ (recommended: 20+)
- A running [Medusa v2 backend](https://github.com/suyashsaroj/medusa-backend) on port 9000
- Razorpay account for payments (optional for development)

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/suyashsaroj/medusa-frontend.git
cd medusa-frontend
npm install
```

### 2. Configure environment

```bash
cp .env.template .env.local
```

Edit `.env.local` with your values:

```env
MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<your-publishable-api-key>
NEXT_PUBLIC_DEFAULT_REGION=in
NEXT_PUBLIC_RAZORPAY_KEY=<your-razorpay-key-id>
```

> Get your publishable API key from the Medusa admin panel at `http://localhost:9000/app` → Settings → API Keys.

### 3. Start development server

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   └── [countryCode]/
│       ├── (checkout)/           # Checkout flow (with Razorpay SDK)
│       └── (main)/
│           ├── tracking/         # Order tracking page
│           ├── cart/             # Shopping cart
│           ├── account/          # User account (login, orders, addresses)
│           ├── products/         # Product detail pages
│           ├── store/            # Product listing page
│           └── order/            # Order confirmation
├── lib/
│   ├── constants.tsx             # Payment provider config (Razorpay, Stripe)
│   └── data/                     # Server actions for API calls
└── modules/
    ├── checkout/components/
    │   ├── payment-button/       # Payment buttons (Razorpay, Stripe, Manual)
    │   └── payment-wrapper/      # Payment provider wrappers
    ├── home/                     # Homepage (hero, featured products)
    └── layout/                   # Nav, footer, side menu
```

## Payment Integration

### Razorpay (Recommended for India)

1. Create an account at [razorpay.com](https://razorpay.com)
2. Get your Key ID from Dashboard → Settings → API Keys
3. Set `NEXT_PUBLIC_RAZORPAY_KEY` in `.env.local`
4. Ensure the Medusa backend has the Razorpay payment provider configured

The checkout flow:
- Customer selects "Razorpay (UPI, Cards, Wallets)" as payment method
- Razorpay checkout modal opens with prefilled customer details
- After successful payment, order is placed automatically
- Webhook on backend verifies payment signature

### Stripe (Optional)

Set `NEXT_PUBLIC_STRIPE_KEY` in `.env.local` if using Stripe alongside Razorpay.

## Shipping & Tracking

- Shipping methods are fetched from the Medusa backend during checkout
- The `/tracking` page allows customers to track orders using AWB numbers
- Tracking data is fetched from the backend's Shiprocket integration

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MEDUSA_BACKEND_URL` | Yes | Medusa backend URL (default: `http://localhost:9000`) |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Yes | Publishable API key from Medusa admin |
| `NEXT_PUBLIC_DEFAULT_REGION` | No | Default region code (default: `in`) |
| `NEXT_PUBLIC_RAZORPAY_KEY` | No | Razorpay Key ID for payments |
| `NEXT_PUBLIC_STRIPE_KEY` | No | Stripe publishable key (optional) |
| `REVALIDATE_SECRET` | No | Next.js on-demand revalidation secret |

## Deployment (Vercel)

1. Push your repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Update `NEXT_PUBLIC_BASE_URL` to your Vercel domain
5. Update Medusa backend CORS to allow your Vercel domain

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **UI**: Tailwind CSS + Medusa UI components
- **Language**: TypeScript
- **Backend**: Medusa v2 (headless commerce)
- **Payments**: Razorpay + Stripe
- **Shipping**: Shiprocket (via Medusa backend)

## License

MIT
