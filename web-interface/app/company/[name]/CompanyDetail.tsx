'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, ArrowUpDown, ArrowUp, ArrowDown, Check, Circle } from 'lucide-react';
import { Problem, Duration } from '@/app/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/app/components/ThemeToggle';
import { useProgress } from '@/app/context/ProgressContext';
import { AnalysisCard } from '@/app/components/AnalysisCard';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type SortOrder = 'asc' | 'desc' | 'none';

export default function CompanyDetail({ name, data }: { name: string, data: Record<string, Problem[]> }) {
    const [activeTab, setActiveTab] = useState<Duration>("Six Months");
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');
    const { toggleProblem, isCompleted } = useProgress();

    const problems = data[activeTab] || [];

    const sortedProblems = useMemo(() => {
        if (sortOrder === 'none') return problems;

        const difficultyValue = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3 };

        return [...problems].sort((a, b) => {
            const diffA = difficultyValue[a.Difficulty?.toUpperCase() as keyof typeof difficultyValue] || 0;
            const diffB = difficultyValue[b.Difficulty?.toUpperCase() as keyof typeof difficultyValue] || 0;

            return sortOrder === 'asc' ? diffA - diffB : diffB - diffA;
        });
    }, [problems, sortOrder]);

    const toggleSort = () => {
        if (sortOrder === 'none') setSortOrder('asc');
        else if (sortOrder === 'asc') setSortOrder('desc');
        else setSortOrder('none');
    };

    const getDifficultyColor = (diff: string) => {
        if (!diff) return 'text-muted-foreground bg-muted border-border';
        switch (diff.toUpperCase()) {
            case 'EASY': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'MEDIUM': return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20';
            case 'HARD': return 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20';
            default: return 'text-muted-foreground bg-muted border-border';
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-12 pb-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-start mb-10">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Companies
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                            {name}
                        </h1>
                    </div>
                    <ThemeToggle />
                </div>

                <AnalysisCard totalProblems={problems.length} problems={problems} />

                {/* Tabs */}
                <div className="mb-8 overflow-x-auto pb-2 scrollbar-none flex justify-center">
                    <div className="flex gap-2 p-1.5 bg-card/50 backdrop-blur-md rounded-2xl border border-border w-fit shadow-sm">
                        {(["Thirty Days", "Three Months", "Six Months", "More Than Six Months", "All"] as Duration[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                                    activeTab === tab
                                        ? "bg-primary text-primary-foreground shadow-md ring-1 ring-white/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-card/70 border border-border rounded-3xl overflow-hidden shadow-xl backdrop-blur-sm"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-medium">
                                        <th className="p-6 w-16 text-center">Status</th>
                                        <th className="p-6 font-semibold">Title & Topics</th>
                                        <th className="p-6 w-40 text-center cursor-pointer hover:text-foreground transition-colors group" onClick={toggleSort}>
                                            <div className="flex items-center justify-center gap-2 font-semibold">
                                                Difficulty
                                                {sortOrder === 'none' && <ArrowUpDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />}
                                                {sortOrder === 'asc' && <ArrowUp className="w-3.5 h-3.5 text-primary" />}
                                                {sortOrder === 'desc' && <ArrowDown className="w-3.5 h-3.5 text-primary" />}
                                            </div>
                                        </th>
                                        <th className="p-6 w-32 text-center font-semibold">Acceptance</th>
                                        <th className="p-6 w-32 text-center font-semibold">Frequency</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {sortedProblems.map((prob, idx) => {
                                        const completed = isCompleted(prob.Title);
                                        return (
                                            <tr key={idx} className={cn("transition-colors group", completed ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30")}>
                                                <td className="p-6 text-center align-top pt-8">
                                                    <button
                                                        onClick={() => toggleProblem(prob.Title)}
                                                        className={cn(
                                                            "w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300",
                                                            completed
                                                                ? "bg-primary border-primary text-primary-foreground scale-110"
                                                                : "border-muted-foreground/30 hover:border-primary/50 text-transparent"
                                                        )}
                                                    >
                                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                    </button>
                                                </td>
                                                <td className="p-6 align-top">
                                                    <div className="flex flex-col gap-3">
                                                        <a href={prob.Link} target="_blank" rel="noopener noreferrer" className={cn("font-semibold text-lg transition-colors flex items-center w-fit", completed ? "text-muted-foreground line-through decoration-primary/50" : "text-foreground group-hover:text-primary")}>
                                                            {prob.Title}
                                                            <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 text-muted-foreground group-hover:text-primary" />
                                                        </a>
                                                        {prob.Topics && (
                                                            <div className={cn("flex flex-wrap gap-2", completed && "opacity-50")}>
                                                                {String(prob.Topics).split(',').map((t, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary/50 text-secondary-foreground border border-border/50 hover:bg-secondary hover:border-border transition-colors cursor-default"
                                                                    >
                                                                        {t.trim()}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-6 text-center align-top pt-8">
                                                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold border inline-block min-w-[80px]", getDifficultyColor(prob.Difficulty), completed && "opacity-70")}>
                                                        {prob.Difficulty}
                                                    </span>
                                                </td>
                                                <td className="p-6 text-center align-top pt-8 text-muted-foreground font-mono text-sm">
                                                    {prob["Acceptance Rate"] != null ? (prob["Acceptance Rate"] * 100).toFixed(1) + '%' : '-'}
                                                </td>
                                                <td className="p-6 text-center align-top pt-8">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden ring-1 ring-border/50 max-w-[100px]">
                                                            <div
                                                                className="bg-gradient-to-r from-primary to-accent-gradient-end h-full rounded-full"
                                                                style={{ width: `${Math.min(prob.Frequency, 100)}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs text-muted-foreground font-mono">{prob.Frequency?.toFixed(1)}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    {sortedProblems.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-16 text-center text-muted-foreground">
                                                <div className="flex flex-col items-center">
                                                    <Calendar className="w-12 h-12 text-muted-foreground/50 mb-4" />
                                                    <p className="text-lg font-medium">No questions found</p>
                                                    <p className="text-sm">Try selecting a different time period.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
