import CategorySection from "@/Features/Categories/Components/CategorySection";
import { getCategories } from "@/Features/Categories/api/categoryApi";
import Loading from "@/components/Ui/Loading/Loading";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Categories() {
  const data = await getCategories();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <Suspense fallback={<Loading />}>
        <CategorySection data={data ?? []} />
      </Suspense>
    </div>
  );
}
