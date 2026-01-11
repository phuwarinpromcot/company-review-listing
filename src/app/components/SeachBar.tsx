"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { scrollToSection } from "./layout/Header";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);


  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleButtonClick = () => {
    onSearchChange(inputValue);
    scrollToSection("company-review");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick();
      scrollToSection("company-review");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)] placeholder:text-zinc-400"
          placeholder={t("landing-page.btn-to-seach")}
        />
        <button
          onClick={handleButtonClick}
          className="bg-[var(--text-theme-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-600)] transition duration-300"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
