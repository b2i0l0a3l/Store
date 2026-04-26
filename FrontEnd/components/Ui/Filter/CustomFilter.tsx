"use client";

import { memo } from "react";
import CustomComboBox from "../inputs/CustomComboBox";

 function CustomFilter({categoryOptions,selectedCategory,setSelectedCategory,placeholder}:{
    categoryOptions: { value: string | number; label: string }[];
    selectedCategory: { value: string | number; label: string } | null;
    setSelectedCategory: (value: { value: string | number; label: string } | null) => void;
    placeholder: string;
 }) {
    return (
        <CustomComboBox
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder={placeholder}
        />
    );
}

export default memo(CustomFilter);
