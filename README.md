# AtlasTrip Travel Booking Platform

Full stack travel booking website with:

- React frontend
- Node.js + Express backend
- MongoDB models
- JWT authentication
- Flights, hotels, tours, bookings, payments, uploads, and receipt APIs
- Admin panel and travel-agent client panel

## Structure

- `client` - Vite + React app
- `server` - Express + MongoDB API

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env templates and fill your values:

- `server/.env.example` -> `server/.env`
- `client/.env.example` -> `client/.env`

3. Start MongoDB locally or point `MONGO_URI` to your database.

4. Run the apps:

```bash
npm run dev:server
npm run dev:client
```

## Demo Credentials

- Admin email: `admin@travel.com`
- Admin password: `Admin@123`

## Notes

- Stripe payment intent creation falls back to a demo client secret when `STRIPE_SECRET_KEY` is not configured, so the booking UI can still be tested.
- Cloudinary upload requires valid Cloudinary credentials in `server/.env`.
