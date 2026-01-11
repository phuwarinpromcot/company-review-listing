"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-b border-b-neutral-200 shadow-none text-white py-5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col justify-end items-center">
        <p className="text-sm text-[var(--primary-400)] hover:text-[var(--primary-600)]">
          Dev by Beer Phuwarin.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
