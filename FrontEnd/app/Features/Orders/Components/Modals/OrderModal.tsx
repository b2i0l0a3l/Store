import { useCallback, useState } from "react";
import CustomModal from "@/app/components/Ui/Modal/Modal";
import { order } from "@/app/Features/Orders/types";
import CustomInput from "@/app/components/Ui/inputs/CustomInput";
import CustomComboBox from "@/app/components/Ui/inputs/CustomComboBox";

export default function OrderModal({
  title,
  icon,
  disabled,
  data,
  onClose,
  onClick,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  data?: order;
  onClose: () => void;
  onClick: (name: string, phone: string) => void;
}) {
  const [order, setOrder] = useState({
    name: data?.name || "",
    total: data?.total || 0,
    remaining: data?.remaining || 0,
    orderType: data?.orderType || "",
    orderStatus: data?.orderStatus || "",
    createdAt: data?.createdAt || "",
    updatedAt: data?.updatedAt || "",
  });

  return (
    <CustomModal title={title} icon={icon} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-slate-300">
            Client Name
          </label>
          <CustomInput
            disabled={disabled}
            onChange={(e) => setOrder({ ...order, name: e.target.value })}
            value={order.name}
            type="text"
            placeholder="Client Name"
            name="name"
          />
        </div>

        {/* Total */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="total" className="text-sm font-medium text-slate-300">
            Total
          </label>
          <CustomInput
            disabled={disabled}
            onChange={(e) =>
              setOrder({ ...order, total: Number(e.target.value) })
            }
            value={order.total}
            type="text"
            placeholder="Total"
            name="total"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="remaining"
            className="text-sm font-medium text-slate-300"
          >
            Remaining
          </label>
          <CustomInput
            disabled={disabled}
            onChange={(e) =>
              setOrder({ ...order, remaining: Number(e.target.value) })
            }
            value={order.remaining}
            type="text"
            placeholder="Remaining"
            name="remaining"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="orderType"
            className="text-sm font-medium text-slate-300"
          >
            Order Type
          </label>
          <CustomComboBox
            disabled={disabled}
            options={[
              { value: "sell", label: "Sell" },
              { value: "debt", label: "Debt" },
            ]}
            value={
              order.orderType
                ? {
                    value: order.orderType,
                    label: order.orderType === "Sell" ? "Sell" : "Debt",
                  }
                : null
            }
            onChange={(option) =>
              setOrder({ ...order, orderType: option.value as string })
            }
            placeholder="Order Type"
            name="orderType"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="orderStatus"
            className="text-sm font-medium text-slate-300"
          >
            Order Status
          </label>
          <CustomComboBox
            disabled={disabled}
            options={[
              { value: "unpaid", label: "Unpaid" },
              { value: "paid", label: "Paid" },
              { value: "partiallyPaid", label: "Partially Paid" },
            ]}
            value={
              order.orderStatus
                ? {
                    value: order.orderStatus,
                    label:
                      order.orderStatus.charAt(0).toUpperCase() +
                      order.orderStatus.slice(1),
                  }
                : null
            }
            onChange={(option) =>
              setOrder({ ...order, orderStatus: option.value as string })
            }
            placeholder="Order Status"
            name="orderStatus"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="createdAt"
            className="text-sm font-medium text-slate-300"
          >
            Created At
          </label>
          <CustomInput
            onChange={(e) => setOrder({ ...order, createdAt: e.target.value })}
            value={order.createdAt}
            type="date"
            placeholder="Created At"
            name="createdAt"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="updatedAt"
            className="text-sm font-medium text-slate-300"
          >
            Updated At
          </label>
          <CustomInput
            onChange={(e) => setOrder({ ...order, updatedAt: e.target.value })}
            value={order.updatedAt}
            type="date"
            placeholder="Updated At"
            name="updatedAt"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={() => {}}
          type="button"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors"
        >
          Save
        </button>
      </div>
    </CustomModal>
  );
}
