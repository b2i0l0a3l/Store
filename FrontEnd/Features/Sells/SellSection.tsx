"use client";
import { category } from "@/Features/Categories/types";
import { product } from "@/Features/Products/types";
import CustomSearch from "@/components/Ui/Search/CustomSearch";
import SellTable from "./SellTable";
import { useCallback, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/util/db";
import { useProductStore } from "@/Features/Products/store/product";
import CustomFilter from "@/components/Ui/Filter/CustomFilter";

export default function SellSection({
  data,
  categories,
}: {
  data: product[];
  categories: category[];
}) {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<{
    value: string | number;
    label: string;
  } | null>(null);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const soldQuantities = useProductStore((state) => state.soldQuantities);

  // Read from IndexedDB
  const localProducts = useLiveQuery(() => db.products.toArray()) || [];
  const localCategories = useLiveQuery(() => db.categories.toArray()) || [];

  // Use local data if available, otherwise fallback to server data
  const actualData = localProducts.length > 0 ? localProducts : data;
  const actualCategories = localCategories.length > 0 ? localCategories : categories;

  const searchData = useMemo(() => {
    const searchLower = search.toLowerCase();
    let filtered = actualData;

    if (search) {
      filtered = filtered.filter(
        (x) =>
          x.name.toLowerCase().includes(searchLower) ||
          x.barCode.toLowerCase().includes(searchLower),
      );
    }

    if (selectedCategory && selectedCategory.value !== "") {
      filtered = filtered.filter(
        (x) => x.categoryName === selectedCategory.label,
      );
    }

    return filtered.map((item) => {
      const sold = soldQuantities[item.id];
      if (sold) {
        return { ...item, quantity: item.quantity - sold };
      }
      return item;
    });
  }, [actualData, search, soldQuantities, selectedCategory]);

  const categoryOptions = useMemo(() => {
    const defaultOption = { value: "", label: "All Categories" };
    const apiOptions = actualCategories.map((c) => ({ value: c.id, label: c.name }));
    return [defaultOption, ...apiOptions];
  }, [actualCategories]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full mb-4">
        <div>
          <p className="text-slate-400 text-sm mt-1">
            Search and filter products
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
          <div className="w-full sm:w-48 z-20">
            <CustomFilter
              categoryOptions={categoryOptions}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              placeholder="All Categories"
            />
          </div>
          <div className="w-full sm:w-auto">
            <CustomSearch onSearch={handleSearch} />
          </div>
        </div>
      </div>
      <SellTable data={searchData} />
    </>
  );
}
