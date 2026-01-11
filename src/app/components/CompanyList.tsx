"use client";

import React from "react";
import CompanyCard, { Company } from "./CompanyCard";
import EmptyData from "./content/EmptyData";

type CompanyListProps = {
  companies: Company[];
  isLoading?: boolean;
  onClearFilter: () => void;
};

const CompanyCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl shadow animate-pulse p-4">
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>

      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-full hidden sm:block"></div>
      </div>
    </div>

    <div className="h-3 bg-gray-200 rounded w-full mt-2 sm:hidden"></div>

    <div className="flex flex-wrap gap-2 mt-3">
      <div className="h-4 bg-gray-300 rounded-full w-12"></div>
      <div className="h-4 bg-gray-300 rounded-full w-16"></div>
      <div className="h-4 bg-gray-300 rounded-full w-10"></div>
    </div>

    <div className="flex flex-wrap gap-2 mt-2">
      <div className="h-4 bg-gray-300 rounded-full w-16"></div>
      <div className="h-4 bg-gray-300 rounded-full w-20"></div>
    </div>

    <div className="h-3 bg-gray-200 rounded w-24 mt-3"></div>
  </div>
);

const CompanyList: React.FC<CompanyListProps> = ({ companies, isLoading = false, onClearFilter }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <CompanyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!companies.length) {
    return <EmptyData onClearFilter={onClearFilter} />;
  }
  return (
    <div className="flex flex-col gap-4">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompanyList;
