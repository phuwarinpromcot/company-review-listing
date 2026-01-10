"use client";

import React from "react";
import CompanyCard from "./CompanyCard";

type Company = {
  id: string;
  name: string;
  description: string;
  category: string;
};

type CompanyListProps = {
  companies: Company[];
  isLoading?: boolean;
};

const CompanyList: React.FC<CompanyListProps> = ({ companies, isLoading = false }) => {
  const Skeleton = () => (
    <div className="p-4 border rounded animate-pulse shadow">
      <div className="h-4 bg-zinc-300 w-3/4 mb-2 rounded"></div>
      <div className="h-3 bg-zinc-200 w-full mb-1 rounded"></div>
      <div className="h-3 bg-zinc-200 w-1/2 rounded"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (!companies.length) return <p>No companies found.</p>;

  return (
    <div className="flex flex-col gap-4">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompanyList;
