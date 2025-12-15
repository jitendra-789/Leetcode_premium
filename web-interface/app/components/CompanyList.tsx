'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Company } from '../types';
import { motion } from 'framer-motion';

export default function CompanyList({ companies }: { companies: Company[] }) {
    const [search, setSearch] = useState('');

    const filtered = companies.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div>
            <div className="relative mb-12 max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Search className="w-5 h-5 text-muted-foreground" />
                </div>
                <input
                    type="text"
                    className="block w-full p-4 pl-12 text-base bg-card/80 border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder:text-muted-foreground backdrop-blur-sm shadow-sm transition-all hover:shadow-md"
                    placeholder="Search for a company (e.g. Google, Amazon)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {filtered.map((company) => (
                    <motion.div key={company.name} variants={item}>
                        <Link
                            href={`/company/${encodeURIComponent(company.name)}`}
                            className="group relative block p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent-gradient-end/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="relative flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors truncate">
                                    {company.name}
                                </h3>
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <span className="text-muted-foreground group-hover:text-primary transition-colors text-lg leading-none">&rarr;</span>
                                </div>
                            </div>

                            <p className="relative mt-4 text-xs font-medium text-muted-foreground uppercase tracking-wider group-hover:text-primary/80 transition-colors">
                                View Questions
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {filtered.length === 0 && (
                <div className="text-center py-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex flex-col items-center"
                    >
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-muted-foreground/50" />
                        </div>
                        <p className="text-muted-foreground text-lg">No companies found matching "{search}"</p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
