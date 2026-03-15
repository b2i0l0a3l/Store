import { useCallback, useMemo, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import { category } from "@/app/Features/Categories/types";
import { product } from "@/app/Features/Products/types";
import CustomComboBox from "@/app/components/Ui/inputs/CustomComboBox";

export default function ProductModal({
  title,
  icon,
  data,
  categories,
  onClose,
  onClick,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  data?: product;
  categories: category[];
  onClose: () => void;
  onClick: (payload: any, formData: any) => void;
}) {
  const [formData, setFormData] = useState({
    id: data?.id || 0,
    name: data?.name || "",
    categoryName: data?.categoryName || "",
    categoryId: categories.find((c) => c.name === data?.categoryName)?.id || 0,
    price: data?.price || 0,
    cost: data?.cost || 0,
    quantity: data?.quantity || 0,
  });

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ value: c.id, label: c.name })),
    [categories],
  );

  const selectedCategory = useMemo(
    () =>
      categoryOptions.find((o) => o.label === formData.categoryName) || null,
    [categoryOptions, formData.categoryName],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }, []);

  const handleCategoryChange = useCallback(
    (option: { value: string | number; label: string }) => {
      setFormData((prev) => ({
        ...prev,
        categoryName: option.label,
        categoryId: Number(option.value),
      }));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const { categoryName, ...payload } = formData;
    console.log(payload);
    onClick(payload, formData);
  }, [onClick, formData]);

  return (
    <CustomModal title={title} icon={icon} onClose={onClose}>
      <div className="space-y-4">
        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          type="text"
          placeholder="Product Name"
          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        <CustomComboBox
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Select Category"
          name="categoryName"
        />
        <input
          name="price"
          onChange={handleChange}
          value={formData.price || ""}
          type="number"
          placeholder="Price"
          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        <input
          name="cost"
          onChange={handleChange}
          value={formData.cost || ""}
          type="number"
          placeholder="Cost"
          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        <input
          name="quantity"
          onChange={handleChange}
          value={formData.quantity || ""}
          type="number"
          placeholder="Quantity"
          className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          type="button"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </div>
    </CustomModal>
  );
}
