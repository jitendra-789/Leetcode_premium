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
                    <motion.div
                        key={company.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <Link href={`/company/${encodeURIComponent(company.name)}`}>
                            <div className="bg-card rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center group hover:bg-card/80 dark:hover:bg-card/50 transition-all duration-300 relative overflow-hidden border border-border">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="w-16 h-16 mb-4 rounded-xl bg-white dark:bg-white/10 p-2 shadow-md flex items-center justify-center relative z-10 overflow-hidden">
                                    <img
                                        src={`https://logo.clearbit.com/${company.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')}.com`}
                                        alt={`${company.name} logo`}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    <div className="hidden w-full h-full flex items-center justify-center bg-primary/20 text-primary font-bold text-2xl rounded-lg">
                                        {company.name.charAt(0)}
                                    </div>
                                </div>

                                <h2 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors relative z-10">
                                    {company.name}
                                </h2>
                                <p className="relative mt-2 text-xs font-medium text-muted-foreground uppercase tracking-wider group-hover:text-primary/80 transition-colors">
                                    View Questions
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {
                filtered.length === 0 && (
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
                )
            }
        </div >
    );
}
