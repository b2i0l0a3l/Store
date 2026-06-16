import { Product } from "../../actions/productType";
import PosFilter from "./posFilter";
import ProductInfinit from "./ProductInfinit";
import { Suspense } from "react";

export default function PosRight({Products}:{Products :Product[]}){
    return(
        <div className="w-full">
            <Suspense fallback={<div>Loading...</div>}>
            <PosFilter />
            </Suspense>
            <ProductInfinit initialProducts={Products} />
        </div>
    )
}