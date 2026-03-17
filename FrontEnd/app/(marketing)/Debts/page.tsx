import { GetDebts } from "@/app/Features/Debts/api/DebtApi";
import DebtSection from "@/app/Features/Debts/Components/DebtSection";
import Loading from "@/app/components/Ui/Loading/Loading";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function DebtsPage() {
  const debts = await GetDebts();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <Suspense fallback={<Loading />}>
        <DebtSection data={debts} />
      </Suspense>
    </div>  
  );
}
