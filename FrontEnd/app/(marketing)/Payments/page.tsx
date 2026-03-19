import { GetPayments } from "@/app/Features/Payments/api/paymentApi";
import PaymentSection from "@/app/Features/Payments/Components/PaymentSection";
import Loading from "@/app/components/Ui/Loading/Loading";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const payments = await GetPayments();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <Suspense fallback={<Loading />}>
        <PaymentSection data={payments} />
      </Suspense>
    </div>
  );
}
