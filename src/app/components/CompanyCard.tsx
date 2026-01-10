"use client";

import React from "react";

type Company = {
  id: string;
  name: string;
  description: string;
  category: string;
};

type CompanyCardProps = {
  company: Company;
};

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow">
      <p className="font-semibold">{company.name}</p>
      <p className="text-sm text-zinc-600">{company.description}</p>
      <p className="text-xs text-zinc-400 mt-1">{company.category}</p>
    </div>
  );
};

export default CompanyCard;
