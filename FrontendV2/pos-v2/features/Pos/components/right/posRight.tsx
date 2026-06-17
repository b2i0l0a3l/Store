import PosFilter from "./posFilter";
import ProductInfinit from "./ProductInfinit";
import { Suspense } from "react";

export default function PosRight() {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <PosFilter />
      </Suspense> 
      <Suspense fallback={<div>Loading...</div>}>
        <ProductInfinit />
      </Suspense>
    </div>
  );
}
