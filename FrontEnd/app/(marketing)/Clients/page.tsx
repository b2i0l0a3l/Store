import ClientSection from "@/Features/clients/Components/ClientSection";
import { getClients } from "@/Features/clients/api/clientApi";
import Loading from "@/components/Ui/Loading/Loading";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Clients() {
  const data = await getClients();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6">
      <Suspense fallback={<Loading />}>
        <ClientSection data={data ?? []} />
      </Suspense>
    </div>
  );
}
