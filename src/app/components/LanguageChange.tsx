"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment } from "react";

function ThailandFlagIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="256" cy="256" r="256" fill="#F0F0F0" />
      <path
        d="M496.077 166.957H15.923C5.632 194.69 0 224.686 0 256s5.632 61.31 15.923 89.043h480.155C506.368 317.31 512 287.314 512 256s-5.632-61.31-15.923-89.043z"
        fill="#0052B4"
      />
      <path
        d="M256 0C178.409 0 108.886 34.524 61.939 89.043H450.06C403.114 34.524 333.591 0 256 0z"
        fill="#D80027"
      />
      <path
        d="M450.061 422.957H61.939C108.886 477.476 178.409 512 256 512s147.114-34.524 194.061-89.043z"
        fill="#D80027"
      />
    </svg>
  );
}

function UKFlagIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="256" cy="256" r="256" fill="#F0F0F0" />
      <g>
        <path fill="#0052B4" d="M52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178L52.92 100.142z" />
        <path fill="#0052B4" d="M503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.176z" />
        <path fill="#0052B4" d="M8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075H8.819z" />
        <path fill="#0052B4" d="M411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177l89.076-89.075z" />
        <path fill="#0052B4" d="M100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102V370.005l-89.076 89.074z" />
        <path fill="#0052B4" d="M189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075V8.819z" />
        <path fill="#0052B4" d="M322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.176z" />
        <path fill="#0052B4" d="M370.005 322.784l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076H370.005z" />
      </g>
      <g>
        <path
          fill="#D80027"
          d="M509.833 222.609h-220.44V2.167C278.461.744 267.317 0 256 0c-11.319 0-22.461.744-33.391 2.167v220.44H2.167C.744 233.539 0 244.683 0 256c0 11.319.744 22.461 2.167 33.391h220.44v220.442C233.539 511.256 244.681 512 256 512c11.317 0 22.461-.743 33.391-2.167V289.391h220.442C511.256 278.461 512 267.319 512 256c0-11.317-.744-22.461-2.167-33.391z"
        />
        <path fill="#D80027" d="M322.783 322.784 437.019 437.02c5.254-5.252 10.266-10.743 15.048-16.435l-97.802-97.802h-31.482z" />
        <path fill="#D80027" d="M189.217 322.784 74.98 437.019c5.252 5.254 10.743 10.266 16.435 15.048l97.802-97.804z" />
        <path fill="#D80027" d="M189.217 189.219 74.981 74.98c-5.254 5.252-10.266 10.743-15.048 16.435l97.803 97.803z" />
        <path fill="#D80027" d="M322.783 189.219 437.02 74.981c-5.252-5.254-10.743-10.266-16.435-15.047l-97.802 97.803z" />
      </g>
    </svg>
  );
}

const languages: Record<string, { code: string; flag: React.FC<React.SVGProps<SVGSVGElement>> }> = {
  th: { code: "th", flag: ThailandFlagIcon },
  en: { code: "en", flag: UKFlagIcon },
};

const useCurrentLang = () => {
  const { i18n } = useTranslation();
  const savedLang = typeof window !== "undefined" ? localStorage.getItem("i18nextLng") : null;
  const raw = savedLang || i18n.language || "th";
  const lang = raw.startsWith("th") ? "th" : "en";

  return { currentLang: languages[lang] };
};

const LanguageChange = () => {
  const { t, i18n } = useTranslation();
  const { currentLang } = useCurrentLang();
    const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const changeLang = (lng: "th" | "en") => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  const Flag = currentLang.flag;

  return (


    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center gap-2 rounded-full px-2 py-2 hover:bg-gray-100">
        <Flag className="w-7 h-7" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition-all ease-out duration-400 transform-gpu"
        enterFrom="opacity-0 -translate-y-2 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition-all ease-in duration-300 transform-gpu"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 -translate-y-2 scale-95"
      >
        <MenuItems unmount={false}  className="absolute left-1/2 -translate-x-1/2 mt-2 w-36 top-14 origin-top rounded-lg bg-white shadow-lg p-2 z-50">
          <MenuItem>
            {({ active }: { active: boolean }) => (
              <button
                onClick={() => changeLang("th")}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-2 ${active ? "bg-gray-100" : ""
                  }`}
              >
                <ThailandFlagIcon className="w-6 h-6" />
                <p className="ml-2 text-gray-600">
                  ไทย
                </p>
              </button>
            )}
          </MenuItem>

          <MenuItem>
            {({ active }: { active: boolean }) => (
              <button
                onClick={() => changeLang("en")}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-2 ${active ? "bg-gray-100" : ""
                  }`}
              >
                <UKFlagIcon className="w-6 h-6" />
                <p className="ml-2 text-gray-600">
                  English
                </p>
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};


export default LanguageChange;