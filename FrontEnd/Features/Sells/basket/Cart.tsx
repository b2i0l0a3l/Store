import CardSection from "@/components/Ui/Card/Card";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import BasketCard from "./parent/BasketCard";
import ClearButton from "./Buttons/ClearButton";
import BuyButton from "./Buttons/BuyButton";
import CreditButton from "./Buttons/CreditButton";
import InvoicePrinter from "@/util/InvoicePrinter";

export default function Cart() {
  return (
    <CardSection title="Cart" icon={ShoppingCartIcon}>
      <div className="flex flex-col h-full max-h-[80vh] bg-slate-900/40 rounded-xl border border-slate-700/50 overflow-hidden">
        <BasketCard />
        <div className="grid grid-cols-2 grid-rows-2 gap-1.5 p-2 border-t border-slate-700/50">
          <ClearButton />
          <BuyButton />
          <CreditButton />
          <InvoicePrinter />
        </div>
      </div>
    </CardSection>
  );
}
