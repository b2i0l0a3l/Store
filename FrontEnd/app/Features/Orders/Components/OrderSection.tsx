"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import CardSection from "@/app/components/Ui/Card/Card";
import CustomSearch from "@/app/components/Ui/Search/CustomSearch";
import { useCallback, useMemo, useState } from "react";
import { order } from "@/app/Features/Orders/types";
import OrderTable from "./Table/OrderTable";

function OrderSection({ data }: { data: order[] }) {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((order) =>
      order.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  return (
    <>
      <CardSection title="Orders" icon={ShoppingCartIcon}>
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
          <CustomSearch onSearch={handleSearch} />
        </div>
        <OrderTable data={filteredData} />
      </CardSection>
    </>
  );
}

export default OrderSection;
