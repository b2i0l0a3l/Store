import Container from "@/components/layout/container";
import ProductCard from "./productCard";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    barCode: string;
    
}
export default function ProductPage({product}:{product: Product[]}) {
  return (
    <Container>   
        <div className="grid grid-cols-4 gap-3">
        {product.map((item) => ( 
            <ProductCard key={item.id} product={item}/>
        ))} 
        </div>
      
    </Container>
  );
}