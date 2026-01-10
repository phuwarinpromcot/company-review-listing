"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Header from "./components/layout/Header";

const LandingPage = dynamic(() => import("./components/content/LandingPage"), { ssr: false });
const CompaniesPage = dynamic(() => import("./components/content/CompaniesPage"), { ssr: false });

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="w-full py-10">
        <LandingPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CompaniesPage searchTerm={searchTerm} />
      </main>
    </div>
  );
}
