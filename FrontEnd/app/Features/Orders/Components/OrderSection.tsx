"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import CardSection from "@/app/components/Ui/Card/Card";
import CustomSearch from "@/app/components/Ui/Search/CustomSearch";
import { useCallback, useMemo, useState } from "react";
import { order } from "@/app/Features/Orders/types";
import OrderTable from "./Table/OrderTable";
import { useOrderStore } from "@/app/Features/Orders/store/order";

function OrderSection({ data }: { data: order[] }) {
  const [search, setSearch] = useState("");
  const updatedOrders = useOrderStore((state) => state.updatedOrders);
  const deletedOrderIds = useOrderStore((state) => state.deletedOrderIds);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const displayData = useMemo(() => {
    return data
      .filter((item) => !deletedOrderIds.has(item.id))
      .map((item) => updatedOrders[item.id] || item);
  }, [data, updatedOrders, deletedOrderIds]);

  const filteredData = useMemo(() => {
    return displayData.filter((order) =>
      order.clientName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [displayData, search]);

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
