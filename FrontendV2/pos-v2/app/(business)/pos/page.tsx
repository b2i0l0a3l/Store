import { getProducts } from "@/features/Pos/actions/getProducts";
import PosClient from "@/features/Pos/components/PosClient";

interface PosPageProps {
  searchParams:Promise<{category?:string,barcode?:string,productName?:string}>
}
export default async function PosPage({searchParams}:PosPageProps) {
  const {category,barcode,productName} = await searchParams;
  console.log(category,barcode,productName);
  const products = await getProducts(1,10,category,barcode,productName);
    return (
      <>
        <PosClient Products={products.value || []} />
      </>
    );
} 