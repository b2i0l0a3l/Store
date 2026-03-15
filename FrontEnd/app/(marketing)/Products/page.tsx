import ProductSection from "@/app/Features/Products/Components/ProductSection";
import { getProducts } from "@/app/Features/Products/api/productApi";
import { getCategories } from "@/app/Features/Categories/api/categoryApi";

export const dynamic = "force-dynamic";

export default async function Products() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <ProductSection data={products ?? []} categories={categories ?? []} />
    </div>
  );
}
