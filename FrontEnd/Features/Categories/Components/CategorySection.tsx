"use client";
import { TagIcon } from "@heroicons/react/24/solid";
import CardSection from "@/components/Ui/Card/Card";
import CustomSearch from "@/components/Ui/Search/CustomSearch";
import CategoryTable from "./Table/CategoryTable";
import { category } from "@/Features/Categories/types";
import { useCallback, useMemo, useState } from "react";
import AddCategoryButton from "./Buttons/AddCategoryButton";
import { useCategoryStore } from "@/Features/Categories/store/category";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/util/db";
import { useSyncToLocalDb } from "@/app/hooks/useSyncToLocalDb";

export default function CategorySection({ data }: { data: category[] }) {
  const [search, setSearch] = useState("");
  
  useSyncToLocalDb(data, db.categories);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const addedCategories = useCategoryStore((state) => state.addedCategories);
  const updatedCategories = useCategoryStore(
    (state) => state.updatedCategories,
  );
  const deletedCategoryIds = useCategoryStore(
    (state) => state.deletedCategoryIds,
  );

  const localCategories = useLiveQuery(() => db.categories.toArray()) || [];
  const actualData = localCategories.length > 0 ? localCategories : data;

  const filteredData = useMemo(() => {
    let currentData = [...actualData, ...addedCategories];
    if (deletedCategoryIds.size > 0) {
      currentData = currentData.filter((c) => !deletedCategoryIds.has(c.id));
    }

    const searchLower = search.toLowerCase();
    return currentData
      .filter((c) => {
        const actualCategory = updatedCategories[c.id] || c;
        return actualCategory.name.toLowerCase().includes(searchLower);
      })
      .map((c) => updatedCategories[c.id] || c);
  }, [data, search, updatedCategories, deletedCategoryIds, addedCategories]);

  return (
    <>
      <CardSection title="Categories" icon={TagIcon}>
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4">
          <CustomSearch onSearch={handleSearch} />
          <AddCategoryButton />
        </div>

        <CategoryTable data={filteredData} />
      </CardSection>
    </>
  );
}
