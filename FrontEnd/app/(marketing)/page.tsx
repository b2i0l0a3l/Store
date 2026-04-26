import Cart from "../../Features/Sells/basket/Cart";
import CardSection from "../../components/Ui/Card/Card";
import SellSection from "../../Features/Sells/SellSection";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { fetchProducts } from "../../Features/Products/api/productActions";
import { getCategories } from "../../Features/Categories/api/categoryApi";
import Loading from "../../components/Ui/Loading/Loading";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [data, categories] = await Promise.all([
    fetchProducts(),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 p-3 sm:p-4 md:p-6 min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <CardSection title="Products" icon={ArchiveBoxIcon}>
            <Suspense fallback={<Loading />}>
              <SellSection data={data} categories={categories} />
            </Suspense>
          </CardSection>
        </div>
        <div className="lg:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
}
