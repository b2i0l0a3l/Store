import CategorySection from "@/app/Features/Categories/Components/CategorySection";
import { getCategories } from "@/app/Features/Categories/api/categoryApi";

export const dynamic = "force-dynamic";

export default async function Categories() {
  const data = await getCategories();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <CategorySection data={data ?? []} />
    </div>
  );
}
