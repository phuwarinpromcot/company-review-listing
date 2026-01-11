"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterComponent from "./FilterComponent";
import companiesData from "../../../data/companies.json";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Portal
} from "@headlessui/react";

type FilterProps = {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;

  selectedSubCategories: string[];
  onSubCategoryChange: (categories: string[]) => void;

  selectedIndustry: string[];
  onIndustryChange: (categories: string[]) => void;

  selectedServices: string[];
  onServicesChange: (services: string[]) => void;

  selectScoreOperator: "gt" | "lt" | "eq";
  onScoreOperatorChange: (op: "gt" | "lt" | "eq") => void;

  selectScoreValue: number;
  onScoreValueChange: (value: number) => void;
};

const scoreOptions = [
  { value: "gt", label: ">="},
  { value: "lt" , label: "<="},
  { value: "eq", label: "="},
];

const Filter: React.FC<FilterProps> = ({
  selectedCategories,
  onCategoryChange,
  selectedSubCategories,
  onSubCategoryChange,
  selectedIndustry,
  onIndustryChange,
  selectedServices,
  onServicesChange,
  selectScoreOperator,
  onScoreOperatorChange,
  selectScoreValue,
  onScoreValueChange,
}) => {
  const { t } = useTranslation();

  const [scoreDropdownOpen, setScoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail !== "score") setScoreDropdownOpen(false);
    };
    window.addEventListener("filter-dropdown-open", handler);
    return () => window.removeEventListener("filter-dropdown-open", handler);
  }, []);

  const categories = Array.from(
    new Set(companiesData.map(c => c.category).filter(Boolean))
  );

  const subCategories = Array.from(
    new Set(companiesData.map(c => c.subCategory).filter(Boolean))
  );

  const industry = Array.from(
    new Set(companiesData.map(c => c.industry).filter(Boolean))
  );

  const services = Array.from(
    new Set(
      companiesData.flatMap(c => c.services ?? []).filter(Boolean)
    )
  );

  return (
    <div className="w-full">
      <p className="font-semibold mb-2">{t("company-page.title")}</p>
        
      <FilterComponent
        type="category"
        selected={selectedCategories}
        onChange={onCategoryChange}
        options={categories}
        placeholder="Search category..."
      />
      <div className="mt-4" />
      <FilterComponent
        type="subCategory"
        selected={selectedSubCategories}
        onChange={onSubCategoryChange}
        options={subCategories}
        placeholder="Search sub category..."
      />
      <div className="mt-4" />
      <FilterComponent
        type="industry"
        selected={selectedIndustry}
        onChange={onIndustryChange}
        options={industry}
        placeholder="Search industry..."
      />
      <div className="mt-4" />
      <FilterComponent
        type="services"
        selected={selectedServices}
        onChange={onServicesChange}
        options={services}
        placeholder="Search services..."
      />

      <div className="mt-4">
        <p className="mb-2 block text-[var(--text-primary-color)]">
          {t("company-page.filter.average-score")}
        </p>

        <div className="flex gap-3 items-center w-full">

          <Listbox value={selectScoreOperator} onChange={onScoreOperatorChange}>
            {() => (
              <div className="relative w-16 flex justify-center items-center">
                <ListboxButton
                  onClick={() => {
                    setScoreDropdownOpen(!scoreDropdownOpen);
                    window.dispatchEvent(new CustomEvent("filter-dropdown-open", { detail: "score" }));
                  }}
                  className="flex  items-center w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-[var(--text-primary-color)] bg-white text-left focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
                >
                  {scoreOptions.find(o => o.value === selectScoreOperator)?.label}
                </ListboxButton>


                <Portal>
                  <ListboxOptions
                    modal={false}
                    anchor="bottom start"
                    className="absolute mt-1 w-36 bg-white border rounded-md shadow-md max-h-40 overflow-y-auto z-50"
                  >
                    {scoreOptions.map(op => (
                      <ListboxOption
                        key={op.value}
                        value={op.value}
                        className={({ selected }) => `
                          px-3 py-2 text-sm cursor-pointer
                          ${selected ? "bg-[var(--primary-100)] text-[var(--primary)]" : "text-[var(--text-primary-color)]"}
                        `}
                      >
                        {op.label} ({t(`company-page.filter.${op.value}`)})
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Portal>
              </div>
            )}
          </Listbox>


          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={selectScoreValue}
            onChange={(e) => onScoreValueChange(Number(e.target.value))}
            className="w-full accent-[var(--primary)] cursor-pointer "
          />

          <span className="w-12 text-center text-[var(--primary-700)]
            bg-[var(--primary-100)] px-3 py-1 rounded-full text-sm">
            {Number(selectScoreValue ?? 0).toFixed(1)}
          </span>
        </div>
      </div>

      <button
          onClick={() => {
            onCategoryChange([]);
            onSubCategoryChange([]);
            onIndustryChange([]);
            onServicesChange([]);
            onScoreOperatorChange("gt");
            onScoreValueChange(1);
          }}
          className="text-sm mt-4 cursor-pointer text-white bg-[var(--primary)] flex justify-self-end rounded-lg hover:bg-[var(--primary-300)]  px-2 py-1 rounded transition"
        >
          {t("company-page.filter.reset-filters")}
        </button>
    </div>
  );
};

export default Filter;
