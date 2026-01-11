"use client";

import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

type FilterComponentProps = {
  type: "category" | "subCategory" | "industry" | "services";
  selected: string[];
  onChange: (values: string[]) => void;
  options: string[];
  placeholder?: string;
};


const FilterComponent: React.FC<FilterComponentProps> = ({
  type,
  selected,
  onChange,
  options,
  placeholder = "Type to search..."
}) => {
  
  const {t} = useTranslation();

  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!inputValue.trim()) {
      setFilteredOptions([]);
      return;
    }
    const filtered = options
      .filter(opt =>
        opt.toLowerCase().includes(inputValue.toLowerCase())
      )
      .filter(opt => !selected.includes(opt));
    setFilteredOptions(filtered);
  }, [inputValue, selected, options]);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent("filter-dropdown-open", { detail: type }));
    }
  }, [isOpen, type]);

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail !== type) setIsOpen(false);
    };
    window.addEventListener("filter-dropdown-open", handler);
    return () => window.removeEventListener("filter-dropdown-open", handler);
  }, [type]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".filter-box")) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleAdd = (value: string) => {
    onChange([...selected, value]);
    setInputValue("");
    setIsOpen(false);
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter(v => v !== value));
  };

  return (
    <div className="w-full filter-box">
      <label className="mb-1 block text-[var(--text-primary-color)]">
        {t(`company-page.filter.${type}`)}
      </label>

      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map(value => (
          <span
            key={value}
            className="flex items-center gap-1 bg-[var(--primary-100)] text-[var(--primary-700)] px-3 py-1 rounded-full text-sm"
          >
            {value}
            <button onClick={() => handleRemove(value)}>
              <XMarkIcon className="w-3 h-3 cursor-pointer" />
            </button>
          </span>
        ))}
      </div>

      <div className="relative w-full">
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
        />

        {isOpen && filteredOptions.length > 0 && (
          <div className="absolute top-full left-0 w-full border border-zinc-300 mt-1 rounded-md bg-white max-h-40 overflow-y-auto shadow-md z-20">
            {filteredOptions.map(value => (
              <div
                key={value}
                onClick={() => handleAdd(value)}
                className="px-3 py-2 cursor-pointer text-sm text-[var(--text-primary-color)] hover:bg-[var(--primary-100)]"
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
