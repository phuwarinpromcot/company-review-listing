"use client";

import React, { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import LanguageChange from '../LanguageChange'
import Image from 'next/image'
import logo from "../../../../public/logo/logo1.png"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white  border-b border-b-neutral-200 shadow-none">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Lookup |Financial Company</span>
            <Image
              src={logo}
              alt="Lookup |Financial Company Logo"
              className="h-10 w-auto sm:h-10 md:h-12 lg:h-14 xl:h-16"
              priority
            />
          </a>
        </div>

        <div className="hidden gap-15 lg:flex">
          <a href="#" className="text-lg font-semibold text-gray-900">Home</a>
          <a href="#" className="text-lg  font-semibold text-gray-900">Company Review</a>
          <a href="#" className="text-lg  font-semibold text-gray-900">About</a>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <LanguageChange />
        </div>
      </nav>
    </header>
  )
}

export default Header
