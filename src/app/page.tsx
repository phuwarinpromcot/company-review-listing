import Image from "next/image";
import dataCompanies from "../data/companies.json";
import Header from "./components/layout/Header";

type Company = {
  id: string;
  name: string;
  description: string;
};


export default function Home() {
  const companies = dataCompanies as Company[];

  return (
     <div className="min-h-screen bg-zinc-50">
      <Header />

      <main className="max-w-3xl mx-auto py-10 px-6">
        {companies.map((company) => (
          <div key={company.id} className="mb-6">
            {/* <button className="btn-primary">
              Name Company: {company.name}
            </button>

            <p className="mt-2 text-sm text-gray-600">
              About: {company.description}
            </p> */}
          </div>
        ))}

      </main>
    </div>
  );
}
