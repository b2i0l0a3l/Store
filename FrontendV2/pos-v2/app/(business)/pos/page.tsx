import { getProducts } from "@/features/Pos/actions/getProducts";

export default async function PosPage() {
  const products = await getProducts();
    return (
      <>
        <h1>All Products :</h1>  
        <ul>
          {products.value.map((product: any) => (
            <li key={product.id}>
              <h1>{product.name}</h1>
              <p>{product.price}</p>
            </li>
          ))}
        </ul>
      </>
    );
} 