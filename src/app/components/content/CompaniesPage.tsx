"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Filter from "../filter/Filter";
import CompanyList from "../CompanyList";
import Pagination from "../Pagination";
import { Company } from "../CompanyCard";
import ErrorPage from "./ErrorComponent";

async function fetchFilteredCompanies(params: {
    searchTerm?: string;
    categories?: string[];
    subCategories?: string[];
    industry?: string[];
    services?: string[];
    scoreOperator?: "gt" | "lt" | "eq";
    scoreValue?: number;
}) {
    const query = new URLSearchParams({
        searchTerm: params.searchTerm || "",
        categories: (params.categories || []).join(","),
        subCategories: (params.subCategories || []).join(","),
        industry: (params.industry || []).join(","),
        services: (params.services || []).join(","),
        scoreOperator: params.scoreOperator || "gt",
        scoreValue: String(params.scoreValue || 0),
    });

    try {
        const res = await fetch(`${window.location.origin}/api/companies?${query.toString()}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if ((data as any).error) throw new Error((data as any).error);
        return data;
    } catch (err: any) {
        return { error: err.message || "Failed to fetch companies" };
    }
}

type CompaniesPageProps = {
    searchTerm: string;
    onClearSearch: () => void;
};

const CompaniesPage: React.FC<CompaniesPageProps> = ({ searchTerm, onClearSearch }) => {
    
    const {t} = useTranslation();

    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [scoreOperator, setScoreOperator] = useState<"gt" | "lt" | "eq">("gt");
    const [scoreValue, setScoreValue] = useState<number>(1);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [retry, setRetry] = useState(0);

    const itemsPerPage = 6;

    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        setErrorMessage("");

        const timer = setTimeout(async () => {
            const filtered = await fetchFilteredCompanies({
                searchTerm,
                categories: selectedCategories,
                subCategories: selectedSubCategories,
                industry: selectedIndustry,
                services: selectedServices,
                scoreOperator,
                scoreValue,
            });

            if ((filtered as any).error) {
                setHasError(true);
                setErrorMessage((filtered as any).error);
                setIsLoading(false);
                return;
            }

            setFilteredCompanies(filtered);
            setCurrentPage(1);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [
        searchTerm,
        selectedCategories.join("|"),
        selectedSubCategories.join("|"),
        selectedIndustry.join("|"),
        selectedServices.join("|"),
        scoreOperator,
        scoreValue,
        retry
    ]);


    const clearFilterAndSeach = async () => {

        setIsLoading(true);
        setSelectedCategories([]);
        setSelectedSubCategories([]);
        setSelectedIndustry([]);
        setSelectedServices([]);
        setScoreOperator("gt");
        setScoreValue(1);
        onClearSearch();

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsLoading(false);
    };


    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
    const paginatedCompanies = filteredCompanies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <section id="company-review" className="w-full bg-[var(--text-secondary-color)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
                <p className="font-bold text-2xl mb-6">{t("company-page.title")}</p>

                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                    <div className="lg:col-span-3 h-fit bg-white border border-gray-200 px-4 pt-4 pb-4 rounded-xl shadow">
                        <Filter
                            selectedCategories={selectedCategories}
                            onCategoryChange={setSelectedCategories}
                            selectedSubCategories={selectedSubCategories}
                            onSubCategoryChange={setSelectedSubCategories}
                            selectedIndustry={selectedIndustry}
                            onIndustryChange={setSelectedIndustry}
                            selectedServices={selectedServices}
                            onServicesChange={setSelectedServices}
                            selectScoreOperator={scoreOperator}
                            onScoreOperatorChange={setScoreOperator}
                            selectScoreValue={scoreValue}
                            onScoreValueChange={setScoreValue}
                        />
                    </div>

                    <div className="lg:col-span-7 bg-white md:px-4 rounded min-h-[720px] flex flex-col">
                        {hasError ? (
                            <ErrorPage
                                onRetry={() => {
                                    setHasError(false);
                                    setIsLoading(true);
                                    setFilteredCompanies([]);
                                    setRetry((prev) => prev + 1);
                                }}
                                message={errorMessage}
                            />
                        ) : (
                            <>
                                <CompanyList
                                    companies={paginatedCompanies}
                                    isLoading={isLoading}
                                    onClearFilter={clearFilterAndSeach}
                                />
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(p) => setCurrentPage(p)}
                                />
                            </>
                        )}
                    </div>


                </div>
            </div>
        </section>
    );
};

export default CompaniesPage;
