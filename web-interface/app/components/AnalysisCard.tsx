'use client';

import { useProgress } from '@/app/context/ProgressContext';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle, Zap, Flame, User as UserIcon, LogIn } from 'lucide-react';
import { Problem } from '@/app/types';

interface AnalysisProps {
    totalProblems: number;
    problems: Problem[];
}

export function AnalysisCard({ totalProblems, problems }: AnalysisProps) {
    const { streak, completedProblems } = useProgress();

    // Filter problems relevant to the current view (Company/Duration)
    const currentViewProblemIds = problems.map(p => p.Title);
    const solvedInView = currentViewProblemIds.filter(id => completedProblems.includes(id)).length;

    // Calculate counts for E/M/H within the CURRENT VIEW
    const easyTotal = problems.filter(p => p.Difficulty.toUpperCase() === 'EASY').length;
    const mediumTotal = problems.filter(p => p.Difficulty.toUpperCase() === 'MEDIUM').length;
    const hardTotal = problems.filter(p => p.Difficulty.toUpperCase() === 'HARD').length;

    const easySolved = problems.filter(p => p.Difficulty.toUpperCase() === 'EASY' && completedProblems.includes(p.Title)).length;
    const mediumSolved = problems.filter(p => p.Difficulty.toUpperCase() === 'MEDIUM' && completedProblems.includes(p.Title)).length;
    const hardSolved = problems.filter(p => p.Difficulty.toUpperCase() === 'HARD' && completedProblems.includes(p.Title)).length;

    const progressPercentage = totalProblems > 0 ? (solvedInView / totalProblems) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
        >
            {/* Main Progress Card */}
            <div className="w-full bg-card/70 backdrop-blur-md border border-border rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy className="w-32 h-32 text-primary rotate-12" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground flex items-center gap-3">
                            Progress Overview
                            {progressPercentage === 100 && <Trophy className="w-6 h-6 text-yellow-500 animate-bounce" />}
                        </h3>
                        <p className="text-muted-foreground">
                            You've solved <span className="text-foreground font-bold">{solvedInView}</span> out of <span className="text-foreground font-bold">{totalProblems}</span> questions in this list.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-muted/50 p-3 rounded-2xl border border-border/50">
                        <div className="flex items-center gap-2 px-3">
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Streak</span>
                                <span className="text-lg font-bold text-foreground">{streak} Days</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 space-y-2">
                    <div className="flex justify-between text-sm font-medium mb-1">
                        <span>Completion</span>
                        <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="h-4 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-primary to-accent-gradient-end rounded-full relative"
                        >
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" style={{ transform: 'skewX(-20deg)' }}></div>
                        </motion.div>
                    </div>
                </div>

                {/* Difficulty Breakdown */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground font-semibold uppercase">
                            <span className="text-emerald-500">Easy</span>
                            <span>{easySolved}/{easyTotal}</span>
                        </div>
                        <div className="h-2 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-emerald-500 rounded-full"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground font-semibold uppercase">
                            <span className="text-amber-500">Medium</span>
                            <span>{mediumSolved}/{mediumTotal}</span>
                        </div>
                        <div className="h-2 w-full bg-amber-500/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${mediumTotal > 0 ? (mediumSolved / mediumTotal) * 100 : 0}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-amber-500 rounded-full"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground font-semibold uppercase">
                            <span className="text-rose-500">Hard</span>
                            <span>{hardSolved}/{hardTotal}</span>
                        </div>
                        <div className="h-2 w-full bg-rose-500/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-rose-500 rounded-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
