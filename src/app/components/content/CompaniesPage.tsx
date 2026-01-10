// CompaniesPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Filter from "../Filter";
import CompanyList from "../CompanyList";
import Pagination from "../Pagination";
import dataCompanies from "../../../data/companies.json";

type Company = {
  id: string;
  name: string;
  description: string;
  category: string;
};

type CompaniesPageProps = {
  searchTerm: string;
};

const CompaniesPage: React.FC<CompaniesPageProps> = ({ searchTerm }) => {
  const { t } = useTranslation();
  const companies = dataCompanies as Company[];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(companies);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      const filtered = companies.filter((company) => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.includes(company.category);
        return matchesSearch && matchesCategory;
      });

      setFilteredCompanies(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategories]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setIsLoading(true);

    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 500);
  };

  return (
    <section className="w-full bg-[var(--text-secondary-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <p className="font-bold text-2xl mb-6">Find Companies</p>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

          <div className="lg:col-span-3 bg-white p-4 rounded shadow">
            <Filter
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
            />
          </div>

          <div className="lg:col-span-7 bg-white px-4 rounded">
            <CompanyList companies={paginatedCompanies} isLoading={isLoading} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesPage;
