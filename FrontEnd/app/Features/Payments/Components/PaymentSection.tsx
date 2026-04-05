"use client";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import CardSection from "@/app/components/Ui/Card/Card";
import CustomSearch from "@/app/components/Ui/Search/CustomSearch";
import PaymentTable from "./Table/PaymentTable";
import { Payment } from "@/app/Features/Payments/types";
import { usePaymentStore } from "@/app/Features/Payments/store/paymentStore";
import { useCallback, useMemo, useState } from "react";

export default function PaymentSection({ data }: { data: Payment[] }) {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const addedPayments = usePaymentStore((state) => state.addedPayments);
  const updatedPayments = usePaymentStore((state) => state.updatedPayments);
  const deletedPaymentIds = usePaymentStore((state) => state.deletedPaymentIds);

  const filteredData = useMemo(() => {
    const addedList = Object.values(addedPayments);
    let currentData = [...data, ...addedList];

    if (deletedPaymentIds.size > 0) {
      currentData = currentData.filter((p) => !deletedPaymentIds.has(p.id));
    }

    const searchLower = search.toLowerCase();
    return currentData
      .filter((p) => {
        const actualPayment = updatedPayments[p.id] || p;
        return (
          actualPayment.debtId.toString().includes(searchLower) ||
          actualPayment.amount.toString().includes(searchLower)
        );
      })
      .map((p) => updatedPayments[p.id] || p);
  }, [data, search, addedPayments, updatedPayments, deletedPaymentIds]);

  return (
    <>
      <CardSection title="Payments" icon={CurrencyDollarIcon}>
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
          <CustomSearch onSearch={handleSearch} />
        </div>
        <PaymentTable data={filteredData} />
      </CardSection>
    </>
  );
}
