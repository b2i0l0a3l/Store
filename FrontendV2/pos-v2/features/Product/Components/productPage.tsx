import Container from "@/components/layout/container";
import ProductListClient from "./productListClient";

type ProductPageProps = {
  searchParams: { ProductName?: string };
}

export default function ProductPage({ searchParams }: ProductPageProps) {
  return (
    <Container>
      <ProductListClient searchParams={searchParams} />
    </Container>
  );
}
