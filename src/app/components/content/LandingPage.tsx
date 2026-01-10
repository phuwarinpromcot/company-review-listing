"use client";

import React, { useState } from "react";
import Image from "next/image";
import womanLook from "../../../../public/images/woman-looker.svg";
import { useTranslation } from "react-i18next";
import SearchBar from "../SeachBar";

type LandingPageProps = {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ searchTerm, setSearchTerm }) => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[var(--primary-100)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-8 py-10 gap-8">
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary-color)] mb-6">
            {t("landing-page.title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-[var(--text-primary-color)] mb-8">
            {t("landing-page.subtitle")}
          </p>
          <div className="flex justify-center lg:justify-start">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <Image
            src={womanLook}
            alt="Woman looking"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
