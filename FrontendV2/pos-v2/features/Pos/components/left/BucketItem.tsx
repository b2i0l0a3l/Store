"use client";
import React from "react";
import { usePosStore } from "../../Store/PosCartStore";
import EmptyCart from "./Empty-cart";
import BucketItemCart from "./bucket-item-cart";


export default function BucketItem() {
  const cart = usePosStore((s) => s.cart);


  return (
    <>
      {cart.length === 0 ? (
       <EmptyCart />
      ) : ( 
        cart.map((item) => {
          return (
            <React.Fragment key={item.id}>
             <BucketItemCart item={item} />
            </React.Fragment>
          );
        })
      )}
    </>
  );
}
