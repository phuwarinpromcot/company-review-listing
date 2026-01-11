"use client";

import Image from "next/image";
import React from "react";
import ErrorImg from "../../../../public/images/error.png";
import { useTranslation } from "react-i18next";

type ErrorPageProps = {
    onRetry: () => void;
    message?: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ onRetry }) => {

    const {t} = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
            <div className="w-25 h-25 relative">
                <Image
                    src={ErrorImg}
                    alt="Error state"
                    fill
                    style={{ objectFit: "contain" }}
                />
            </div>
            <h2 className="text-lg text-gray-500">{t("error-page.title")}</h2>
            <button
                onClick={onRetry}
                className="text-sm rounded-lg mt-4 cursor-pointer text-white bg-[var(--primary)] hover:bg-[var(--primary-300)]  px-2 py-1 rounded transition"
            >
                {t("error-page.btn-retry")}
            </button>
        </div>
    );
};

export default ErrorPage;
