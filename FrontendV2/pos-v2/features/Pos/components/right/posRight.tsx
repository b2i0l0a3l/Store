import { Suspense } from "react";

import dynamic from "next/dynamic";
const PosFilter = dynamic(() => import("./posFilter"), {
  loading: () => <div>Loading...</div>,
});
const ProductInfinit = dynamic(() => import("./ProductInfinit"), {
  loading: () => <div>Loading...</div>,
});


export default function PosRight() {
  return (
    <div className="w-full">
        <PosFilter />
        <ProductInfinit />
    </div>
  );
}
