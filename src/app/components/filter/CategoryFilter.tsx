"use client";

import React, { useState, useEffect } from "react";
import companiesData from "../../../data/companies.json";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Company = {
    id: string;
    name: string;
    category: string;
};

type CategoryFilterProps = {
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategories, onCategoryChange }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

    useEffect(() => {
        if (inputValue.trim() === "") {
            setFilteredCategories([]);
            return;
        }

        const allCategories: string[] = companiesData
            .map((c: Company) => c.category)
            .filter((cat: string) => !!cat);

        const categoriesFromCompanies = Array.from(
            new Set(
                allCategories.filter((cat) =>
                    cat.toLowerCase().includes(inputValue.toLowerCase())
                )
            )
        ).filter((cat) => !selectedCategories.includes(cat));

        setFilteredCategories(categoriesFromCompanies);
    }, [inputValue, selectedCategories]);

    const handleAddCategory = (cat: string) => {
        onCategoryChange([...selectedCategories, cat]);
        setInputValue("");
    };

    const handleRemoveCategory = (cat: string) => {
        onCategoryChange(selectedCategories.filter((c) => c !== cat));
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-2">
                {selectedCategories.map((cat) => (
                    <span
                        key={cat}
                        className="flex items-center gap-1 bg-[var(--primary-100)] text-[var(--primary-700)] px-3 py-1 rounded-full text-sm"
                    >
                        {cat}
                        <button
                            onClick={() => handleRemoveCategory(cat)}
                            className="flex items-center justify-center cursor-pointer"
                        >
                            <XMarkIcon className="w-3 h-3 text-[var(--primary-700)]" />
                        </button>
                    </span>
                ))}
            </div>

            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type to search categories..."
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-[var(--text-primary-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
            />

            {filteredCategories.length > 0 && (
                <div className="border border-zinc-300 mt-1 rounded-md bg-white max-h-40 overflow-y-auto">
                    {filteredCategories.map((cat) => (
                        <div
                            key={cat}
                            className="px-3 py-2 cursor-pointer text-sm text-[var(--text-primary-color)] hover:bg-[var(--primary-100)]"
                            onClick={() => handleAddCategory(cat)}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryFilter;
