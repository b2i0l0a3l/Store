"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

export default function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const imageSrc = imageUrl || "/placeholder.svg";

  return (
    <Link href={`/product/${id}`}>
      <Card className="max-w-[200px] cursor-pointer hover:shadow-md transition-shadow h-full">
        <CardHeader>
          <div className="aspect-square w-full flex justify-center items-center bg-muted rounded-lg overflow-hidden">
            <Image
              src={imageSrc}
              alt={name}
              width={120}
              height={120}
              className="object-cover w-full h-full"
            />
          </div>
          <CardTitle className="truncate">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{price.toFixed(2)} $</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
