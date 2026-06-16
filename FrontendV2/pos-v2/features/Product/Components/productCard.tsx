import { Card,CardTitle,CardAction,CardContent,CardDescription,CardHeader,CardFooter } from "@/components/ui/card";
import Image from "next/image";


type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    barCode: string;
    
}
export default function ProductCard({product}:{product: Product}) {
    return <>
    <Card className="max-w-[200px]">
        <CardHeader>
            <div className="aspect-square w-full flex justify-center items-center">
            <Image
                src={product.image} 
                alt="Next.js" 
                width={100}
                height={100}
                className="object-cover"
            />  
            </div>
            <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
            <CardDescription>{product.price}$</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
            <CardAction className="text-blue-500">Edit</CardAction>
            <CardAction className="text-red-500">Delete</CardAction>
        </CardFooter> 
    </Card>
    
    
    
    </>
    ;
}   