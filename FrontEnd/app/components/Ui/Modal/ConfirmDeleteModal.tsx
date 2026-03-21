"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import CustomModal from "./Modal";

export default function ConfirmDeleteModal({
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete? This action cannot be undone.",
  isDeleting = false,
}: {
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isDeleting?: boolean;
}) {
  return (
    <CustomModal
      title={title}
      icon={ExclamationTriangleIcon}
      onClose={onClose}
      className="max-w-md"
    >
      <div className="flex flex-col gap-6">
        <p className="text-slate-300 text-base leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-2.5 rounded-xl font-medium bg-slate-700/80 hover:bg-slate-600 text-slate-200 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-6 py-2.5 rounded-xl font-medium bg-red-500 hover:bg-red-600 text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] disabled:opacity-50 flex items-center justify-center min-w-[100px]"
          >
            {isDeleting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
