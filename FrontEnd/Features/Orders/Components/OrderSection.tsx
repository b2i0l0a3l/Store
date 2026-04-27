"use client";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import CardSection from "@/components/Ui/Card/Card";
import CustomSearch from "@/components/Ui/Search/CustomSearch";
import { useCallback, useMemo, useState } from "react";
import { order } from "@/Features/Orders/types";
import OrderTable from "./Table/OrderTable";
import { useOrderStore } from "@/Features/Orders/store/order";
import CustomFilter from "@/components/Ui/Filter/CustomFilter";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/util/db";
import { useSyncToLocalDb } from "@/app/hooks/useSyncToLocalDb";

function OrderSection({ data }: { data: order[] }) {
  useSyncToLocalDb(data, db.orders);
  const [search, setSearch] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<{
    value: string | number;
    label: string;
  } | null>({ value: "All", label: "All" });
  const [selectedOrderType, setSelectedOrderType] = useState<{
    value: string | number;
    label: string;
  } | null>({ value: "All", label: "All" });

  const updatedOrders = useOrderStore((state) => state.updatedOrders);
  const deletedOrderIds = useOrderStore((state) => state.deletedOrderIds);

  const localOrders = useLiveQuery(() => db.orders.toArray()) || [];
  const actualData = localOrders.length > 0 ? localOrders : data;

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const displayData = useMemo(() => {
    return actualData
      .filter((item) => !deletedOrderIds.has(item.id))
      .map((item) => updatedOrders[item.id] || item);
  }, [actualData, updatedOrders, deletedOrderIds]);

  const filteredData = useMemo(() => {
    return displayData.filter((order) => {
      const c =
        selectedOrderStatus?.value === "All"
          ? true
          : order.orderStatus === selectedOrderStatus?.value;
      const d =
        selectedOrderType?.value === "All"
          ? true
          : order.orderType === selectedOrderType?.value;
      return (
        c && d && order.clientName?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [displayData, search, selectedOrderStatus, selectedOrderType]);

  return (
    <>
      <CardSection title="Orders" icon={ShoppingCartIcon}>
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
          <CustomSearch onSearch={handleSearch} />
          <CustomFilter
            categoryOptions={[
              { value: "All", label: "All Order Status" },
              { value: "Paid", label: "Paid" },
              { value: "Not Paid", label: "Not Paid" },
              { value: "Partial", label: "Partial" },
            ]}
            selectedCategory={selectedOrderStatus}
            setSelectedCategory={setSelectedOrderStatus}
            placeholder="Filter by status"
          />
          <CustomFilter
            categoryOptions={[
              { value: "All", label: "All Order Type" },
              { value: "Debt", label: "Debt" },
              { value: "Sell", label: "Sell" },
            ]}
            selectedCategory={selectedOrderType}
            setSelectedCategory={setSelectedOrderType}
            placeholder="Filter by status"
          />
        </div>
        <OrderTable data={filteredData} />
      </CardSection>
    </>
  );
}

export default OrderSection;
