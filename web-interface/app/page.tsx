import Image from "next/image";
import { getCompanies } from './lib/data';
import CompanyList from './components/CompanyList';
import { ThemeToggle } from './components/ThemeToggle';

export const dynamic = 'force-static';

export default async function Home() {
  const companies = await getCompanies();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-end mb-8 md:mb-12">
        <ThemeToggle />
      </div>

      <div className="text-center mb-16 space-y-6">
        <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase">
          Premium Access
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground pb-2">
          LeetCode <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-gradient-end">Problems</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Unlock your potential with curated interview questions from {companies.length} top tech giants.
          Practice smarter, not harder.
        </p>
      </div>

      <CompanyList companies={companies} />
    </main>
  );
}
