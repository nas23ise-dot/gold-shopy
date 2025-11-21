This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## New Features Implemented

### Digital Gold Platform
- Digital gold savings with real-time gold rates
- Buy and sell digital gold instantly
- Transaction history tracking
- Secure storage with BIS hallmarked gold

### Gold Scheme Interface
- Monthly installment plans for gold savings
- Multiple scheme options with different durations
- Customer enrollment and payment tracking
- Progress monitoring and gold accumulation tracking

### Transaction Tracking System
- Credit and debit transaction monitoring
- Detailed transaction history with filters
- Payment method tracking
- Real-time balance calculations

## Project Structure

This project consists of three main components:

1. **Consumer Website** - Main storefront for customers (in `consumer-website/`)
2. **Admin Panel** - Management interface for shop owners (in `gold-shop-admin/`)
3. **Backend API** - Server-side API for data management (in `consumer-website/backend/`)

## Deployment

### Deploying to Netlify

This project is configured for deployment to Netlify. See the detailed deployment guide:

- [Netlify Deployment Guide](DEPLOYMENT_NETLIFY.md) - Complete instructions for deploying all components
- [Consumer Website Deployment](consumer-website/README_NETLIFY.md) - Specific instructions for the consumer website
- [Admin Panel Deployment](gold-shop-admin/README_NETLIFY.md) - Specific instructions for the admin panel

### Backend API Deployment

The backend API needs to be deployed to a Node.js hosting service like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

See [DEPLOYMENT_NETLIFY.md](DEPLOYMENT_NETLIFY.md) for detailed instructions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.