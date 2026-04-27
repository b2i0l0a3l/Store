"use client";
import { TagIcon } from "@heroicons/react/24/solid";
import CardSection from "@/components/Ui/Card/Card";
import CustomSearch from "@/components/Ui/Search/CustomSearch";
import ProductTable from "./Table/ProductTable";
import { category } from "@/Features/Categories/types";
import { product } from "@/Features/Products/types";
import { useCallback, useMemo, useState } from "react";
import AddProductButton from "./Buttons/AddProductButton";
import { useProductStore } from "@/Features/Products/store/product";
import CustomFilter from "@/components/Ui/Filter/CustomFilter";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/util/db";
import { useSyncToLocalDb } from "@/app/hooks/useSyncToLocalDb";

export default function ProductSection({
  data,
  categories,
}: {
  data: product[];
  categories: category[];
}) {
  const [search, setSearch] = useState("");
  
  useSyncToLocalDb(data, db.products);
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string | number;
    label: string;
  } | null>({ value: "", label: "All Categories" });

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const updatedProducts = useProductStore((state) => state.updatedProducts);
  const deletedProductIds = useProductStore((state) => state.deletedProductIds);
  const addedProducts = useProductStore((state) => state.addedProducts);

  const localProducts = useLiveQuery(() => db.products.toArray()) || [];
  const actualData = localProducts.length > 0 ? localProducts : data;

  const filteredData = useMemo(() => {
    let currentData = [...actualData, ...addedProducts];
    if (deletedProductIds.size > 0) {
      currentData = currentData.filter((c) => !deletedProductIds.has(c.id));
    }
    const searchLower = search.toLowerCase();
    return currentData
      .filter((c) => {
        const actualProduct = updatedProducts[c.id] || c;
        const categoryFilter =
          selectedCategory?.label === "All Categories"
            ? true
            : actualProduct.categoryName === selectedCategory?.label;
        const searchFilter =
          actualProduct.name?.toLowerCase().includes(searchLower) ||
          actualProduct.barCode?.toLowerCase().includes(searchLower) ||
          actualProduct.categoryName?.toLowerCase().includes(searchLower);
        return searchFilter && categoryFilter;
      })
      .map((c) => updatedProducts[c.id] || c);
  }, [
    data,
    search,
    updatedProducts,
    deletedProductIds,
    addedProducts,
    selectedCategory,
  ]);

  const categoryOptions = useMemo(() => {
    const defaultOption = { value: "", label: "All Categories" };
    const apiOptions = categories.map((c) => ({ value: c.id, label: c.name }));
    return [defaultOption, ...apiOptions];
  }, [categories]);

  return (
    <>
      <CardSection title="Products" icon={TagIcon}>
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-auto">
              <CustomSearch onSearch={handleSearch} />
            </div>
            <div className="w-full sm:w-48 z-20">
              <CustomFilter
                categoryOptions={categoryOptions}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                placeholder="All Categories"
              />
            </div>
          </div>
          <AddProductButton categories={categories} />
        </div>
        <ProductTable data={filteredData} categories={categories} />
      </CardSection>
    </>
  );
}
