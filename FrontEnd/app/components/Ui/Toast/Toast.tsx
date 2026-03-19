import { useEffect, useState } from "react";
import { ToastMessage, useToastStore } from "../../../store/useToastStore";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Toast({ toast }: { toast: ToastMessage }) {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isLeaving, setIsLeaving] = useState(false);

  let Icon = InformationCircleIcon;
  let colors = "bg-slate-800 text-slate-200 border-slate-700";
  let iconColor = "text-blue-400";

  switch (toast.type) {
    case "success":
      Icon = CheckCircleIcon;
      colors = "bg-slate-800 border-emerald-500/50 text-slate-100";
      iconColor = "text-emerald-400";
      break;
    case "error":
      Icon = ExclamationCircleIcon;
      colors = "bg-slate-800 border-red-500/50 text-slate-100";
      iconColor = "text-red-400";
      break;
    case "warning":
      Icon = ExclamationTriangleIcon;
      colors = "bg-slate-800 border-amber-500/50 text-slate-100";
      iconColor = "text-amber-400";
      break;
    case "info":
      Icon = InformationCircleIcon;
      colors = "bg-slate-800 border-blue-500/50 text-slate-100";
      iconColor = "text-blue-400";
      break;
  }

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => removeToast(toast.id), 300); // Wait for exit animation
  };

  return (
    <div
      className={`pointer-events-auto flex w-full max-w-sm overflow-hidden rounded-lg border shadow-lg ring-1 ring-black ring-opacity-5 
        ${colors} transition-all duration-300 ease-in-out
        ${isLeaving ? "opacity-0 translate-x-full" : "animate-[slideIn_300ms_ease-out_forwards]"}`}
    >
      <div className="p-4 w-full">
        <div className="flex items-start">
          <div className="shrink-0">
            <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <div className="ml-4 flex shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-transparent text-slate-400 hover:text-slate-200 focus:outline-none"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
