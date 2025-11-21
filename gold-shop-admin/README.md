# Gold Shop Admin Interface

This is a standalone admin interface for managing the Gold Shop e-commerce website. It's built as a separate Next.js application to keep the admin functionality separate from the main customer-facing website.

## Features

- **Dashboard**: Overview of key metrics and recent activity
- **Inventory Management**: Product catalog with stock tracking
- **Billing System**: Invoice creation with weight-based pricing
- **Customer Management**: Customer database with purchase history
- **Reports & Analytics**: Sales charts and performance metrics
- **Settings**: Shop configuration and preferences
- **Authentication**: Login system to protect admin access

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, or pnpm

### Installation

1. Navigate to the admin directory:
   ```bash
   cd gold-shop-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and go to `http://localhost:3000`

### Login Credentials

Use the following credentials to access the admin interface:
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
src/
├── app/
│   ├── login/              # Login page
│   ├── dashboard/          # Admin dashboard
│   ├── inventory/          # Inventory management
│   ├── billing/            # Billing and invoicing
│   ├── customers/          # Customer management
│   ├── reports/            # Analytics and reports
│   ├── settings/           # System settings
│   ├── layout.tsx          # Root layout
│   ├── layout-admin.tsx    # Admin layout with sidebar
│   └── page.tsx            # Home page (redirects to login)
├── middleware.ts           # Authentication middleware
└── globals.css             # Global styles
```

## Development

To modify the admin interface:

1. Edit files in the `src/app/` directory
2. The development server will automatically reload changes
3. Create new pages by adding folders under `src/app/`

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Security Note

This is a frontend demonstration. In a production environment, you would need to implement:
- Server-side authentication
- Database integration
- Role-based access control
- Secure password storage
- Input validation and sanitization