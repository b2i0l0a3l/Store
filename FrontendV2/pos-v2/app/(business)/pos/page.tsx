import { getProducts } from "@/features/Pos/actions/getProducts.actions";
import PosClient from "@/features/Pos/components/PosClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface PosPageProps {
  searchParams: Promise<{
    category?: string;
    barcode?: string;
    productName?: string;
  }>;
}
export default async function PosPage({ searchParams }: PosPageProps) {
 
  const { category, barcode, productName } = await searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["infinite-virtual-products", category, barcode, productName],
    queryFn: () => getProducts(1, 10, category, barcode, productName),
    initialPageParam: 1,
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PosClient />
      </HydrationBoundary>
    </>
  );
}
