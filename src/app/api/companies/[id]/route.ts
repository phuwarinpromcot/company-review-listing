import { NextRequest, NextResponse } from "next/server";
import dataCompanies from "../../../../data/companies.json";
import { Company } from "../../../components/CompanyCard";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const companyId = resolvedParams.id;

    const company = (dataCompanies as Company[]).find(c => String(c.id) === companyId);

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(company);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
