"use client";
import { TagIcon } from "@heroicons/react/24/solid";
import CardSection from "@/app/components/Ui/Card/Card";
import CustomSearch from "@/app/components/Ui/Search/CustomSearch";
import ProductTable from "./Table/ProductTable";
import { category } from "@/app/Features/Categories/types";
import { product } from "@/app/Features/Products/types";
import { useCallback, useMemo, useState } from "react";
import AddProductButton from "./Buttons/AddProductButton";
import { useProductStore } from "@/app/Features/Products/store/product";

export default function ProductSection({
  data,
  categories,
}: {
  data: product[];
  categories: category[];
}) {
  const [search, setSearch] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const updatedProducts = useProductStore((state) => state.updatedProducts);
  const deletedProductIds = useProductStore((state) => state.deletedProductIds);
  const addedProducts = useProductStore((state) => state.addedProducts);

  const filteredData = useMemo(() => {
    let currentData = [...data, ...addedProducts];
    if (deletedProductIds.size > 0) {
      currentData = currentData.filter((c) => !deletedProductIds.has(c.id));
    }

    const searchLower = search.toLowerCase();
    return currentData
      .filter((c) => {
        const actualProduct = updatedProducts[c.id] || c;
        return (
          actualProduct.name.toLowerCase().includes(searchLower) ||
          actualProduct.categoryName.toLowerCase().includes(searchLower)
        );
      })
      .map((c) => updatedProducts[c.id] || c);
  }, [data, search, updatedProducts, deletedProductIds, addedProducts]);

  return (
    <>
      <CardSection title="Products" icon={TagIcon}>
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
          <CustomSearch onSearch={handleSearch} />
          <AddProductButton categories={categories} />
        </div>

        <ProductTable data={filteredData} categories={categories} />
      </CardSection>
    </>
  );
}
