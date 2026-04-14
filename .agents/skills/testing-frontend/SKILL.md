# Testing the Desi Cart Frontend

## Prerequisites
- Medusa v2 backend running on port 9000 (see medusa-backend repo)
- PostgreSQL running with seed data loaded
- Node.js 20+

## Starting the Frontend
```bash
cd /home/ubuntu/repos/medusa-frontend
npm install
npm run dev  # Starts on port 8000
```

## Environment Variables
Copy `.env.template` to `.env.local` and fill in:
- `MEDUSA_BACKEND_URL=http://localhost:9000`
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<from backend>`
- `NEXT_PUBLIC_DEFAULT_REGION=in`
- `NEXT_PUBLIC_RAZORPAY_KEY=<from Razorpay dashboard>`

## Known Backend Setup Issue
The backend seed script creates a duplicate "Default Sales Channel". Before products appear on the store page:
1. The publishable API key must have exactly ONE sales channel linked
2. Products must be added to that sales channel
3. Clear the Next.js cache (`rm -rf .next`) and restart the dev server after fixing

To fix via admin API:
```bash
# Get admin token
TOKEN=$(curl -s -X POST http://localhost:9000/auth/user/emailpass \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@test.com","password":"password123"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

# List sales channels
curl -s http://localhost:9000/admin/sales-channels -H "Authorization: Bearer $TOKEN"

# Link sales channel to API key (use first channel ID)
curl -s -X POST http://localhost:9000/admin/api-keys/<API_KEY_ID>/sales-channels \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"add":["<SALES_CHANNEL_ID>"]}'

# Add products to sales channel
curl -s -X POST http://localhost:9000/admin/sales-channels/<SALES_CHANNEL_ID>/products \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"add":["<PRODUCT_ID>"]}'
```

## Key Pages to Test
- Homepage: `http://localhost:8000` - should show "Desi Cart" branding, hero
- Store: `http://localhost:8000/in/store` - product listing (5 seeded products)
- Product Detail: `http://localhost:8000/in/products/<handle>`
- Tracking: `http://localhost:8000/in/tracking` - AWB lookup page
- Cart: `http://localhost:8000/in/cart`
- Checkout: requires items in cart

## Lint & Build
```bash
npm run lint
npm run build
```

## Notes
- Products may show "Out of stock" if backend seed data doesn't configure inventory quantities
- Razorpay checkout requires a valid `NEXT_PUBLIC_RAZORPAY_KEY` and backend Razorpay provider configured
- The `/store/locales` endpoint returns 404 (expected - not configured in backend)
