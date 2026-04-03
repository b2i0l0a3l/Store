import { memo, useState } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import CustomInput from "@/app/components/Ui/inputs/CustomInput";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";

function PaymentModal({handleClose,debtId,handleSubmit}:{
    handleClose: () => void;
    debtId: number;
    handleSubmit: (data: any) => void;}) {

        const [Amount , setAmount] = useState(0);
 

    return (
        <CustomModal
            title="Payment"
            icon={CurrencyDollarIcon}
            onClose={handleClose}        >
            
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="debtId">Debt Id</label>
                    <CustomInput 
                    disabled={true}
                    value={debtId}
                    placeholder="Debt Id"
                    type="text"
                    name="debtId"
                     />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="amount">Amount</label>
                    <CustomInput 
                    value={Amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Amount"
                    type="number"
                    name="amount"
                     />
                </div>
            </div>
            <div className="flex justify-end">
                <CustomButton   
                    text="Pay"
                    className="px-6 py-4 "
                    hoverColor="hover:opacity-80"
                    onClick={() => handleSubmit({debtId:debtId,amount:Amount})} icon={CurrencyDollarIcon}                />
            </div>
            
        </CustomModal>
    );
}

export default memo(PaymentModal);