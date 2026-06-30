"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddProduct, useUpdateProduct } from "../hooks/useProducts";
import type { Category } from "../types";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

type ProductFormData = {
  id: number;
  name: string;
  price: number;
  cost: number;
  categoryId: number;
  quantity: number;
  barcode: string;
  description: string;
}

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  initialData?: ProductFormData;
}

export default function ProductFormDialog({
  open,
  onOpenChange,
  categories,
  initialData,
}: ProductFormDialogProps) {
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [price, setPrice] = useState(String(initialData?.price ?? ""));
  const [cost, setCost] = useState(String(initialData?.cost ?? ""));
  const [categoryId, setCategoryId] = useState(String(initialData?.categoryId ?? ""));
  const [quantity, setQuantity] = useState(String(initialData?.quantity ?? ""));
  const [barcode, setBarcode] = useState(initialData?.barcode ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!price || Number(price) <= 0) newErrors.price = "Price must be greater than 0";
    if (cost === "" || Number(cost) < 0) newErrors.cost = "Cost must be 0 or greater";
    if (!categoryId) newErrors.categoryId = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("price", String(Number(price)));
    formData.append("cost", String(Number(cost)));
    formData.append("categoryId", categoryId);
    formData.append("quantity", quantity ? String(Number(quantity)) : "0");

    if (barcode) formData.append("codeBar", barcode);
    if (description) formData.append("description", description);

    if (fileInputRef.current?.files?.[0]) {
      formData.append("productImage", fileInputRef.current.files[0]);
    }

    if (isEditing && initialData) {
      formData.append("id", String(initialData.id));
    }

    const mutation = isEditing ? updateProduct : addProduct;
    const result = await mutation.mutateAsync(formData);

    if (result.isSuccess) {
      toast.success(isEditing ? "Product updated" : "Product added");
      onOpenChange(false);
    } else {
      toast.error(result.message || "Failed to save product");
    }
  }

  const isPending = addProduct.isPending || updateProduct.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            Fill in the details to {isEditing ? "update the" : "add a new"} product
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name *</label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <label htmlFor="price" className="text-sm font-medium">Price *</label>
              <Input id="price" type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
              {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
            </div>
            <div className="grid gap-2">
              <label htmlFor="cost" className="text-sm font-medium">Cost *</label>
              <Input id="cost" type="number" step="0.01" min="0" value={cost} onChange={(e) => setCost(e.target.value)} />
              {errors.cost && <p className="text-xs text-destructive">{errors.cost}</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="category" className="text-sm font-medium">Category *</label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
              <Input id="quantity" type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="barcode" className="text-sm font-medium">Barcode</label>
              <Input id="barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <label htmlFor="image" className="text-sm font-medium">Product Image</label>
            <Input id="image" type="file" ref={fileInputRef} accept="image/*" />
          </div>

          <DialogFooter showCloseButton={false}>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2Icon className="size-4 animate-spin" />}
              {isEditing ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
