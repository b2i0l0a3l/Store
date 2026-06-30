import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getToken } from "@/lib/cookie";
import { isTokenValid } from "@/lib/utils";
import { getProductsPagination } from "@/features/Product/actions";
import ProductPage from "@/features/Product/Components/productPage";

type ProductDetailsPageProps = {
  searchParams: Promise<{ ProductName?: string }>;
}

export default async function ProductDetailsPage({ searchParams }: ProductDetailsPageProps) {
  const token = await getToken();
  const isAuth = await isTokenValid({ token });

  if (!isAuth) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Please login to view your products</p>
      </div>
    );
  }

  const params = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", { ProductName: params.ProductName, PageNumber: 1, PageSize: 12 }],
    queryFn: () => getProductsPagination({
      ProductName: params.ProductName,
      PageNumber: 1,
      PageSize: 12,
    }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPage searchParams={params} />
    </HydrationBoundary>
  );
}
