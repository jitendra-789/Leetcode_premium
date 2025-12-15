import { getCompanies, getCompanyData } from '@/app/lib/data';
import CompanyDetail from './CompanyDetail';
import { Duration, Problem } from '@/app/types';

export const dynamic = 'force-static';

// This is required for static export to know all routes
export async function generateStaticParams() {
    const companies = await getCompanies();
    return companies.map((company) => ({
        name: company.name,
    }));
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
    // params is a Promise in recent Next.js versions
    const { name } = await params;
    const decodedName = decodeURIComponent(name);

    const durations: Duration[] = [
        "Thirty Days",
        "Three Months",
        "Six Months",
        "More Than Six Months",
        "All"
    ];

    const data: Record<string, Problem[]> = {};

    await Promise.all(durations.map(async (d) => {
        data[d] = await getCompanyData(decodedName, d);
    }));

    return <CompanyDetail name={decodedName} data={data} />;
}
