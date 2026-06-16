import ProductPage from "@/features/Product/Components/productPage";
import { auth } from "@clerk/nextjs/server";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    barCode: string;
    
}
export default async function ProductDetailsPage() {
    const products : Product[] = [
        {
            id: 1,
            name: "Product 1",
            description: "Description 1",
            price: 10,
            image: "/next.svg",
            barCode: "1234567890"
        },
        {
            id: 2,
            name: "Product 2",
            description: "Description 2",
            price: 20,
            image: "/next.svg",
            barCode: "1234567890"
        },
        {
            id: 3,
            name: "Product 3",
            description: "Description 3",
            price: 30,
            image: "/next.svg",
            barCode: "1234567890"
        },
        {
            id: 4,
            name: "Product 4",
            description: "Description 4",
            price: 40,
            image: "/next.svg",
            barCode: "1234567890"
        },
        {
            id: 5,
            name: "Product 5",
            description: "Description 5",
            price: 50,
            image: "/next.svg",
            barCode: "1234567890"
        },
        {
            id: 6,
            name: "Product 6",
            description: "Description 6",
            price: 60,
            image: "/next.svg",
            barCode: "1234567890"
        },
        {
            id: 7,
            name: "Product 7",
            description: "Description 7",
            price: 70,
            image: "/next.svg",
            barCode: "1234567890"
        },
        {
            id: 8,
            name: "Product 8",
            description: "Description 8",
            price: 80,
            image: "/next.svg",
            barCode: "1234567890"
        }
    ]

    const {userId} = await auth();

    if (!userId) {
        return <div>Please login to view your products</div>;
    }
    return <div><ProductPage product={products}/></div>;
}    