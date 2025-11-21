# Gold Shop Admin Interface

This is the administrative interface for the Gold Shop e-commerce website. It provides a comprehensive dashboard for managing all aspects of the jewelry business.

## Features

### 1. Dashboard
- Overview of key metrics (sales, orders, customers)
- Recent activity feed
- Quick action buttons

### 2. Inventory Management
- View all products with stock levels
- Add, edit, and remove products
- Track weight, purity, and pricing
- Stock status indicators (In Stock, Low Stock, Out of Stock)

### 3. Billing & Invoicing
- Create invoices for customer purchases
- Add products to bills with automatic calculations
- Support for weight-based pricing and making charges
- GST calculation
- Multiple payment methods (Cash, Card)

### 4. Transaction Tracking
- Monitor all credit and debit transactions
- Filter by type, date, and customer
- Real-time balance calculations
- Detailed transaction history

### 5. Gold Schemes Management
- Create and manage gold saving schemes
- Track customer enrollments
- Monitor scheme performance
- View active customers and gold accumulation

### 6. Customer Management
- Maintain customer database
- Track purchase history
- Membership tiers (Gold, Silver, Bronze)
- Contact information management

### 7. Reports & Analytics
- Sales performance charts
- Product category distribution
- Top-selling products
- Exportable reports

### 8. Settings
- Shop information management
- Account security settings
- Notification preferences
- Payment method configuration

## Access

To access the admin interface:
1. Navigate to `/admin` in your browser
2. Use the following credentials for demo access:
   - Username: `admin`
   - Password: `password123`

## Technology Stack

- Next.js 15 with App Router
- React 19
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Lucide React for icons
- Framer Motion for animations

## Folder Structure

```
src/app/admin/
├── layout.tsx                # Admin layout with sidebar navigation
├── page.tsx                  # Admin dashboard
├── login/page.tsx            # Admin login page
├── inventory/page.tsx        # Inventory management
├── billing/page.tsx          # Billing and invoicing
├── transactions/page.tsx     # Transaction tracking
├── gold-schemes/page.tsx     # Gold schemes management
├── customers/page.tsx        # Customer management
├── reports/page.tsx          # Analytics and reports
└── settings/page.tsx         # System settings
```

## Security

This is a frontend demonstration. In a production environment, you would need to implement:
- Server-side authentication
- Database integration
- Role-based access control
- Secure password storage
- Input validation and sanitization

## Development

To run the admin interface:
1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/admin`
3. Log in with the demo credentials

The admin interface is fully responsive and works on mobile, tablet, and desktop devices.