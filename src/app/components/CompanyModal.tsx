"use client";

import React, { useState, useEffect } from "react";
import { GlobeAltIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

type CompanyDetailsModalProps = {
    show: boolean;
    onClose: () => void;
    loading: boolean;
    details: any;
};

const CompanyModal: React.FC<CompanyDetailsModalProps> = ({ show, onClose, loading, details }) => {

    const {t} = useTranslation();

    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        if (show) setIsVisible(true);
    }, [show]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => onClose(), 200);
    };

    if (!show && !isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                    }`}
                onClick={handleClose}
            />

            <div
                className={`relative bg-white/90 backdrop-blur-lg min-h-[460px] rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl border border-white/20
          transform transition-all duration-300
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors text-lg"
                    aria-label="Close modal"
                >
                    <XMarkIcon className="w-7 h-7 cursor-pointer" />
                </button>

                {loading ? (
                    <div className="flex flex-col justify-between h-full animate-pulse">
                        <div className="space-y-4">
                            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div> 
                        </div>

                        <div className="space-y-2 mt-4">
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                        </div>

                        <div className="h-8 w-32 bg-gray-300 rounded mt-4 self-start"></div>
                    </div>
                ) : details ? (
                    <div className="space-y-4">
                        <h2 className="font-extrabold text-3xl sm:text-4xl text-gray-900">{details.name}</h2>
                        <p className="text-gray-600 text-base sm:text-lg">{details.description}</p>

                        <div className="text-gray-700 space-y-2 text-sm sm:text-base">
                            <p>
                                <span className="font-semibold">
                                    {t("company-page.company-modal.category")}
                                </span> 
                                {" "}
                                {details.category}
                                {" "}
                                {details.subCategory && `• ${details.subCategory}`}
                            </p>
                            <p>
                                <span className="font-semibold">
                                {t("company-page.company-modal.industry")}
                                </span> 
                                {" "}
                                {details.industry}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    {t("company-page.company-modal.companySize")}
                                </span> {details.companySize}
                            </p>
                            <p>
                                <span className="font-semibold">
                                    {t("company-page.company-modal.averageScore")}
                                </span> {details.averageScore} (
                                {details.reviewCount})
                            </p>
                            {details.services && details.services.length > 0 && (
                                <p>
                                    <span className="font-semibold">
                                        {t("company-page.company-modal.services")}
                                    </span> 
                                    {" "}
                                    {details.services.join(", ")}
                                </p>
                            )}
                            {details.supportedCountries && (
                                <p>
                                    <span className="font-semibold">
                                        {t("company-page.company-modal.supportedCountries")}
                                    </span>{" "}
                                    {details.supportedCountries.join(", ")}
                                </p>
                            )}
                            {details.currencies && (
                                <p>
                                    <span className="font-semibold">
                                        {t("company-page.company-modal.currencies")}
                                    </span> {details.currencies.join(", ")}
                                </p>
                            )}
                        </div>

                        {details.website && (
                            <a
                                href={details.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-4 text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
                            >
                                <GlobeAltIcon className="w-5 h-5" />
                                {t("company-page.company-list.visit-website")}
                            </a>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-12 text-lg font-medium">{t("company-page.company-modal.no-data")}</p>
                )}
            </div>
        </div>
    );
};

export default CompanyModal;
