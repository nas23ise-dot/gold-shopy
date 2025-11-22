import ProtectedRoute from '@/components/ProtectedRoute';
import OrderDetailsClient from './OrderDetailsClient';

export async function generateStaticParams() {
  return [
    { id: 'ORD-789456123' },
    { id: 'ORD-456789123' },
    { id: 'ORD-123456789' },
    { id: '2' },
  ];
}

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  return (
    <ProtectedRoute>
      <OrderDetailsClient params={params} />
    </ProtectedRoute>
  );
}