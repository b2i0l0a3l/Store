import { useCallback, useMemo, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import { category } from "@/app/Features/Categories/types";
import { product } from "@/app/Features/Products/types";
import CustomComboBox from "@/app/components/Ui/inputs/CustomComboBox";
import { toast } from "@/app/store/useToastStore";

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
    codebar: data?.barCode || "",
  });
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedFile(e.target.files[0]);
      }
    },
    [],
  );

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

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const submitData = new FormData();
      submitData.append("Name", formData.name);
      submitData.append("CategoryId", formData.categoryId.toString());
      submitData.append("Price", formData.price.toString());
      submitData.append("Cost", formData.cost.toString());
      submitData.append("Quantity", formData.quantity.toString());
      if (formData.id) {
        submitData.append("Id", formData.id.toString());
      }
      if (formData.codebar) {
        submitData.append("CodeBar", formData.codebar);
      }
      if (selectedFile) {
        submitData.append("ProductImage", selectedFile);
      }
      
      const newProduct: product = {
        id: formData.id,
        name: formData.name,
        categoryName: selectedCategory?.label || "",
        price: formData.price,
        cost: formData.cost,
        quantity: formData.quantity,
        createdAt: new Date(),
        barCode: formData.codebar,
        imagePath: ""
      };
      
      await onClick(submitData, newProduct);
      toast.success("Product added successfully");
    } catch {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  }, [onClick, formData, selectedFile, data?.barCode]);

  return (
    <CustomModal title={title} icon={icon} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Product Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Product Name"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Category
          </label>
          <CustomComboBox
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Select Category"
            name="categoryName"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Price
          </label>
          <input
            name="price"
            onChange={handleChange}
            value={formData.price || ""}
            type="number"
            placeholder="Price"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Cost
          </label>
          <input
            name="cost"
            onChange={handleChange}
            value={formData.cost || ""}
            type="number"
            placeholder="Cost"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Quantity
          </label>
          <input
            name="quantity"
            onChange={handleChange}
            value={formData.quantity || ""}
            type="number"
            placeholder="Quantity"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
         <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Codebar
          </label>
          <input
            name="codebar"
            onChange={handleChange}
            value={formData.codebar}
            type="text"
            placeholder="Codebar"
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          type="button"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </CustomModal>
  );
}
