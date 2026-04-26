"use client";

import React, { memo } from "react";

type Props = {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  hoverColor?: string;
  hoverTextColor?: string;
  color?: string;
};

const CustomButton = memo(function CustomButton({
  text,
  icon: IconComponent,
  onClick,
  disabled = false,
  className = "",
  hoverColor = "hover:bg-red-500",
  hoverTextColor = "hover:text-white",
  color = "bg-slate-700/80",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center cursor-pointer justify-center gap-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm active:scale-[0.98]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-slate-700 disabled:shadow-none
      ${color} text-slate-200 ${hoverColor} ${hoverTextColor} border border-transparent ${className}`}
    >
      <IconComponent className="w-5 h-5" />
      {text}
    </button>
  );
});

export default CustomButton;
