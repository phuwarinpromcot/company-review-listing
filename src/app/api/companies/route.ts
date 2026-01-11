import { NextRequest, NextResponse } from "next/server";
import dataCompanies from "../../../data/companies.json";
import { Company } from "../../components/CompanyCard";

function parseArrayParam(param: string | null): string[] {
  if (!param) return [];
  return param
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function search(company: any, searchTerm: string) {
  if (!searchTerm) return true;

  const term = searchTerm.toLowerCase();

  const matchName = company.name.toLowerCase().includes(term);
  const matchCategory = company.category.toLowerCase().includes(term);
  const matchSubCategory = company.subCategory?.toLowerCase().includes(term);
  const matchIndustry = company.industry.toLowerCase().includes(term);
  const matchServices =
    company.services?.some((service: string) => service.toLowerCase().includes(term));

  return matchName || matchCategory || matchSubCategory || matchIndustry || matchServices;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const searchTerm = searchParams.get("searchTerm")?.toLowerCase() || "";
    const selectedCategories = parseArrayParam(searchParams.get("categories"));
    const selectedSubCategories = parseArrayParam(searchParams.get("subCategories"));
    const selectedIndustry = parseArrayParam(searchParams.get("industry"));
    const selectedServices = parseArrayParam(searchParams.get("services"));
    const scoreOperator = (searchParams.get("scoreOperator") as "gt" | "lt" | "eq") || "gt";
    const scoreValue = Number(searchParams.get("scoreValue") || 0);

    const filtered: Company[] = (dataCompanies as Company[]).filter((company) => {
      const matchesSearch = search(company, searchTerm);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(company.category);
      const matchesSubCategory =
        selectedSubCategories.length === 0 || selectedSubCategories.includes(company.subCategory || "");
      const matchesIndustry =
        selectedIndustry.length === 0 || selectedIndustry.includes(company.industry || "");
      const matchesServices =
        selectedServices.length === 0 ||
        (company.services ?? []).some((service) =>
          selectedServices.map((s) => s.toLowerCase()).includes(service.toLowerCase())
        );
      const matchesScore = (() => {
        const score = company.averageScore ?? 0;
        if (scoreValue === 0) return true;
        if (scoreOperator === "gt") return score >= scoreValue;
        if (scoreOperator === "lt") return score <= scoreValue;
        if (scoreOperator === "eq") return Number(score.toFixed(1)) === Number(scoreValue.toFixed(1));
        return true;
      })();

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubCategory &&
        matchesIndustry &&
        matchesServices &&
        matchesScore
      );
    });

    // throw new Error("test ยิง api แล้ว error");

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
  }
}

