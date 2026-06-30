"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProduct, useCategories, useDeleteProduct } from "../hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import ProductFormDialog from "./productFormDialog";
import { PencilIcon, Trash2Icon, ShoppingCartIcon, ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import { isValidImageUrl } from "@/lib/utils";

type ProductDetailClientProps = {
  id: number;
}

export default function ProductDetailClient({ id }: ProductDetailClientProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: productResult, isLoading, isError } = useProduct(id);
  const { data: categoriesData } = useCategories();
  const deleteProduct = useDeleteProduct();

  const product = productResult?.isSuccess ? productResult.value : null;
  const categories = categoriesData?.isSuccess ? categoriesData.value : [];

  const categoryName = product
    ? categories.find((c) => c.id === product.categoryId)?.name ?? String(product.categoryId)
    : "";

  async function handleDelete() {
    const result = await deleteProduct.mutateAsync(id);
    if (result.isSuccess) {
      toast.success("Product deleted");
      window.location.href = "/product";
    } else {
      toast.error(result.message || "Failed to delete product");
    }
    setDeleteOpen(false);
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="aspect-video w-full rounded-xl" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-medium">Product not found</h2>
        <p className="text-muted-foreground mt-1">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/product">Back to products</Link>
        </Button>
      </div>
    );
  }

  const imageSrc = product.imagePath && isValidImageUrl(product.imagePath)
    ? product.imagePath
    : "/placeholder.svg";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/product" className="gap-2">
          <ArrowLeftIcon className="size-4" />
          Back to products
        </Link>
      </Button>

      <Card>
        <div className="aspect-video w-full bg-muted flex items-center justify-center rounded-t-xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.name}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{categoryName}</p>
            </div>
            <Badge variant="default">{product.price.toFixed(2)} $</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block">Price</span>
              <span className="font-medium">{product.price.toFixed(2)} $</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Cost</span>
              <span className="font-medium">{product.cost.toFixed(2)} $</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Category</span>
              <span className="font-medium">{categoryName}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={`/pos?productId=${product.id}`}>
            <ShoppingCartIcon className="size-4" />
            Add to POS
          </Link>
        </Button>
        <Button variant="outline" onClick={() => setEditOpen(true)}>
          <PencilIcon className="size-4" />
          Edit
        </Button>
        <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
          <Trash2Icon className="size-4" />
          Delete
        </Button>
      </div>

      <ProductFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        categories={categories}
        initialData={{
          id: product.id,
          name: product.name,
          price: product.price,
          cost: product.cost,
          categoryId: product.categoryId,
          quantity: 0,
          barcode: "",
          description: "",
        }}
      />

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {product.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton={false}>
            <Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={deleteProduct.isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleteProduct.isPending}>
              {deleteProduct.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
