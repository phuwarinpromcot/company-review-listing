"use client";

import React, { useState, useEffect } from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CompanyModal from "./CompanyModal";
import { useTranslation } from "react-i18next";

export type Company = {
  id: string;
  name: string;
  logo: string;
  category: string;
  subCategory?: string;
  industry?: string;
  averageScore?: number;
  reviewCount?: number;
  companySize?: string;
  description: string;
  website?: string;
  services?: string[];
};

type CompanyCardProps = {
  company: Company;
};

const CompanyLogo = ({ logo, name }: { logo: string; name: string }) => {
  return (
    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
      <img
        src={logo}
        alt={name}
        className="absolute inset-0 w-full h-full object-contain"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
        }}
      />
      <PhotoIcon className="w-8 h-8 text-gray-400 z-10" />
    </div>
  );
};
const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {

  const {t} = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      console.log("Fetching company id:", company.id);
      const res = await fetch(`/api/companies/${company.id}`);
      if (!res.ok) throw new Error("Failed to fetch details");
      const data = await res.json();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDetails(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
    fetchDetails();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4">

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <CompanyLogo logo={company.logo} name={company.name} />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-lg text-gray-800">{company.name}</h2>
          <p className="text-sm text-gray-500">
            {company.category} {company.subCategory && `• ${company.subCategory}`}
          </p>

          <p className="text-sm text-gray-600 mt-1 hidden sm:block ">{company.description}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-2 sm:hidden">{company.description}</p>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        {company.averageScore && (
          <span className="bg-[var(--yellow-theme-100)] text-yellow-800 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            ⭐ {company.averageScore} ({company.reviewCount || 0})
          </span>
        )}
        {company.companySize && (
          <span className="bg-[var(--blue-theme-100)] text-[var(--blue-theme-600)] text-xs font-medium px-2 py-1 rounded-full">
            👤 {company.companySize}
          </span>
        )}
        {company.industry && (
          <span className="bg-[var(--orenge-theme-100)] text-[var(--orenge-theme-600)] text-xs font-medium px-2 py-1 rounded-full">
            {company.industry}
          </span>
        )}
      </div>

      {company.services && company.services.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {company.services.map((service, idx) => (
            <span
              key={idx}
              className="bg-[var(--green-theme-100)] text-[var(--green-theme-600)] text-xs px-2 py-1 rounded-full"
            >
              {service}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center mt-3  gap-2">
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className=" text-sm w-fit text-blue-600 hover:underline flex items-center gap-1"
          >
            <GlobeAltIcon className="w-4 h-4" />
            {t("company-page.company-list.visit-website")}
          </a>
        )}

        <button
          onClick={openModal}
          className="px-2 py-1 text-sm text-blue-600 rounded transition flex items-center gap-1 cursor-pointer"
        >
          <EllipsisHorizontalCircleIcon className="w-4 h-4" />
          {t("company-page.company-list.more")}
        </button>
      </div>


      <CompanyModal
        show={showModal}
        onClose={() => setShowModal(false)}
        loading={loading}
        details={details}
      />
    </div>
  );
};

export default CompanyCard;
