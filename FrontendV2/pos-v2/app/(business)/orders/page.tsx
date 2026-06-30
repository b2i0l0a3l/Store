import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getOrdersPagination } from "@/features/Orders/actions";
import OrdersListTable from "@/features/Orders/components/OrdersListTable";

interface OrdersPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { page, search } = await searchParams;
  const pageNumber = Number(page) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["orders", "pagination", pageNumber, 10, search],
    queryFn: () => getOrdersPagination(pageNumber, 10, search),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <OrdersListTable page={pageNumber} searchQuery={search} />
      </div>
    </HydrationBoundary>
  );
}
