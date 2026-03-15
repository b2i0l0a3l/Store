
"use client";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";
import { memo, useCallback, useMemo, useState } from "react";
import CreditModal from "../modals/CreditModal";
import { useStore } from "../../store/store";
import { useProductStore } from "@/app/Features/Products/store/product";

function CreditButton() {
    const [open, setOpen] = useState(false);
    const cart = useStore((state) => state.cart);
    

    
    
    
    return (
        <>
            <CustomButton
            disabled={cart.length === 0}
                text="Credit"
                className="bg-linear-to-r from-red-500 to-pink-500"
                icon={CurrencyDollarIcon}
                onClick={() => {setOpen(true)}}
            />
            {open && <CreditModal cart={cart} onClose={() => {setOpen(false)}} />}
        </>
    );
}

export default memo(CreditButton);