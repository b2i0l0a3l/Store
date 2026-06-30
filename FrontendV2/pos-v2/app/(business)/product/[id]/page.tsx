import { notFound } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getProductById, getAllCategories } from "@/features/Product/actions";
import ProductDetailClient from "@/features/Product/Components/productDetailClient";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const result = await getProductById(productId);
  if (!result.isSuccess) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailClient id={productId} />
    </HydrationBoundary>
  );
}
