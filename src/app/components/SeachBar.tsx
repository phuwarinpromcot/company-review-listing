"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)] placeholder:text-zinc-400"
          placeholder={t("landing-page.btn-to-seach")}
        />
        <button className="bg-[var(--text-theme-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-600)] transition duration-300">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
