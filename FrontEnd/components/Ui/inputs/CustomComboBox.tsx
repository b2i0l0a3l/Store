"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/solid";
import CustomInput from "./CustomInput";

interface Option {
  value: string | number;
  label: string;
}

interface CustomComboBoxProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option) => void;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
}

export default function CustomComboBox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  name,
  disabled,
}: CustomComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase()),
        );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {name && <input type="hidden" name={name} value={value?.value || ""} />}

      <div
        className={`relative flex items-center w-full ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"}`}
        onClick={() => {
          if (!disabled) setIsOpen(true);
        }}
      >
        <div className="w-full">
          <CustomInput
          
            disabled={disabled}
            value={isOpen ? query : value ? value.label : ""}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (!disabled) setIsOpen(true);
            }}
            placeholder={value && !isOpen ? value.label : placeholder}
            name={name}
            type={"text"}
          />
        </div>
        <button
          type="button"
          disabled={disabled}
          className="absolute right-3 focus:outline-none text-slate-400 hover:text-slate-300 transition-colors"
          onClick={(e) => {
            if (disabled) return;
            e.stopPropagation();
            setIsOpen(!isOpen);
            if (isOpen) setQuery("");
          }}
        >
          <ChevronUpDownIcon className="w-5 h-5" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl shadow-black/50 overflow-hidden animate-[dropdownFadeIn_150ms_ease-out_forwards] origin-top">
          <ul className="max-h-60 overflow-y-auto custom-scrollbar p-1.5">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-sm text-slate-400 text-center">
                No results found.
              </li>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value?.value === option.value;
                return (
                  <li
                    key={option.value}
                    className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-md cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-600/20 text-blue-400 font-medium"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    }`}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <CheckIcon className="w-4 h-4 text-blue-500" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {/*  */}
    </div>
  );
}
