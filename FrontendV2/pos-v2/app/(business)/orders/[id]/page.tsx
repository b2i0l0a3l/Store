import { notFound } from "next/navigation";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getOrderById, getOrderItemsByOrderId } from "@/features/Orders/actions";
import OrderDetailClient from "@/features/Orders/components/detail/OrderDetailClient";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const orderId = Number(id);

  if (Number.isNaN(orderId)) {
    notFound();
  }

  const queryClient = new QueryClient();

  const orderResult = await getOrderById(orderId);

  if (!orderResult.isSuccess) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["orders", orderId],
    queryFn: () => Promise.resolve(orderResult),
  });

  await queryClient.prefetchQuery({
    queryKey: ["orders", orderId, "items"],
    queryFn: () => getOrderItemsByOrderId(orderId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4">
        <OrderDetailClient orderId={orderId} />
      </div>
    </HydrationBoundary>
  );
}
