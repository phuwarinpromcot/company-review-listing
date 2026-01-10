"use client";

import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LanguageChange from "../LanguageChange";
import Image from "next/image";
import logo from "../../../../public/logo/logo1.png";
import { useTranslation } from "react-i18next";

const menuItems = [
  { id: "home", path: "#home" },
  { id: "company-review", path: "#company-review" },
  { id: "about-us", path: "#about-us" },
];

const Logo = () => {
  return (
    <Image
      src={logo}
      alt="Lookup |Financial Company Logo"
      className="h-12 w-auto md:h-12 lg:h-14 xl:h-16"
      priority
      unoptimized
    />
  );
}

const Header = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState(menuItems[0].id);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <header className="bg-white border-b border-b-neutral-200 shadow-none fixed w-full z-50">
      <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;700&display=swap" rel="stylesheet" />
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
        {/* Logo */}
        <div className="flex">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Lookup | Financial Company</span>
            <Logo />
          </a>
        </div>

        <div className="hidden lg:flex flex-1 justify-center gap-20">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              onClick={() => setActive(item.id)}
              className={`
                relative text-lg px-1
                ${active === item.id ? "text-theme" : "text-primary"}
                hover:text-theme
                font-medium
              `}
            >
              {t(`header-menu.${item.id}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="lg:hidden">
            <LanguageChange />
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <LanguageChange />
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center justify-between p-2 border-b border-gray-200">
            <Logo />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col items-center mt-6 gap-4">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={() => {
                  setActive(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`
                  relative text-lg px-1
                  ${active === item.id ? "text-theme" : "text-primary"}
                  hover:text-theme
                  font-medium
                `}
              >
                {t(`header-menu.${item.id}`)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
