"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import CategoryFilter from "./filter/CategoryFilter";

type FilterProps = {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
};

const Filter: React.FC<FilterProps> = ({ selectedCategories, onCategoryChange }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <p className="font-semibold mb-2">Filter Companies</p>
      <p className="mb-1">Category</p>

      <CategoryFilter
        selectedCategories={selectedCategories}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
};

export default Filter;
