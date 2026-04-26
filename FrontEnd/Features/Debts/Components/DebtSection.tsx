"use client";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

import CardSection from "@/components/Ui/Card/Card";
import CustomSearch from "@/components/Ui/Search/CustomSearch";
import { useCallback, useMemo, useState } from "react";
import DebtTable from "./Table/DebtTable";
import { Debt } from "../types";

function DebtSection({ data }: { data: Debt[] }) {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((debt) =>
      debt.clientName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  return (
    <>
      <CardSection title="Debts" icon={CurrencyDollarIcon}>
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
          <CustomSearch onSearch={handleSearch} />
        </div>
        <DebtTable data={filteredData} />
      </CardSection>
    </>
  );
}

export default DebtSection;
