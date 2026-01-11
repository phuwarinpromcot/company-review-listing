"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import logo from "../../public/logo/logo2.svg";
import Image from "next/image";

const LogoSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-zinc-50">
    <div className="h-24 w-24">
      <Image 
        src={logo} 
        alt="Logo Spinner" 
        width={96} 
        height={96}
        className="animate-spin"
      />
    </div>
  </div>
);

const Header = dynamic(() => import("./components/layout/Header"), { ssr: false });
const Footer = dynamic(() => import("./components/layout/Footer"), { ssr: false });
const LandingPage = dynamic(() => import("./components/content/LandingPage"), { ssr: false });
const CompaniesPage = dynamic(() => import("./components/content/CompaniesPage"), { ssr: false });
const AboutUsPage = dynamic(() => import("./components/content/AboutUsPage"), { ssr: false });

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000)
    return () => clearTimeout(timer);
  }, []);
  

  if (!isReady) {
    return <LogoSpinner />;
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="w-full pt-10">
        <LandingPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CompaniesPage searchTerm={searchTerm} onClearSearch={() => setSearchTerm("")}/>
        <AboutUsPage />
      </main>
      <Footer />
    </div>
  );
}
