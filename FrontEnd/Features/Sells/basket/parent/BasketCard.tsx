import BasketBody from "../body/BasketBody";
import BasketInfo from "../body/BasketInfo";

export default function BasketCard() {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
        <BasketBody />
      </div>

      <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
        <BasketInfo />
      </div>
    </>
  );
}
