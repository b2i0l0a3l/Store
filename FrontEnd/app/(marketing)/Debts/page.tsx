import { GetDebts } from "@/app/Features/Debts/api/DebtApi";
import DebtSection from "@/app/Features/Debts/Components/DebtSection";

export const dynamic = "force-dynamic";

export default async function DebtsPage() {
  const debts = await GetDebts();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <DebtSection data={debts} />
    </div>
  );
}
