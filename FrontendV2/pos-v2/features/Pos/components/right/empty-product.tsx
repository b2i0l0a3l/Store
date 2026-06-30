import { Package } from "lucide-react";

export default function EmptyProduct() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)] w-full">
      <div className="flex flex-col items-center gap-2">
        <Package size={48} className="text-zinc-500 dark:text-zinc-400" />
        <span className="text-lg font-semibold text-zinc-500 dark:text-zinc-400">
          No products found
        </span>
      </div>
    </div>
  );
}