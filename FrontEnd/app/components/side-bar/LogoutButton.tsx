"use client";

import CustomButton from "../Ui/buttons/CustomButton";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
export default function LogoutBtn() {
  const router = useRouter();
  return (
    <CustomButton
      onClick={() => router.replace("/login")}
      icon={ArrowLeftEndOnRectangleIcon}
      text="Logout"
      className="w-full px-4 py-3 bg-linear-to-r
         from-red-600 to-rose-600 text-white 
         font-medium rounded-lg hover:shadow-lg
          hover:shadow-red-500/30 transition-all 
          duration-300 ease-in-out active:scale-95"
    />
  );
}
