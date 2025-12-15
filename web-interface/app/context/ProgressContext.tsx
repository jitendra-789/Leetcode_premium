'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface UserProgress {
    completedProblems: string[]; // List of problem titles or unique IDs
    streak: number;
    lastVisit: string | null;
    user: { name: string; email: string; image: string } | null;
}

interface ProgressContextType {
    completedProblems: string[];
    streak: number;
    user: { name: string; email: string; image: string } | null;
    toggleProblem: (id: string) => void;
    isCompleted: (id: string) => boolean;
    practiceDates: string[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession(); // Added useSession hook
    const [completedProblems, setCompletedProblems] = useState<string[]>([]);
    const [streak, setStreak] = useState(0);
    const [lastVisit, setLastVisit] = useState<string | null>(null);
    const [practiceDates, setPracticeDates] = useState<string[]>([]); // URLs/ISO dates of practice
    // const [user, setUser] = useState<{ name: string; email: string; image: string } | null>(null); // Removed, user state comes from session
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load from local storage, optionally using user ID as key suffix
        const storageKey = session?.user?.email ? `leetcode-progress-${session.user.email}` : 'leetcode-progress';
        const saved = localStorage.getItem(storageKey);

        if (saved) {
            const parsed = JSON.parse(saved);
            setCompletedProblems(parsed.completedProblems || []);
            setStreak(parsed.streak || 0);
            setLastVisit(parsed.lastVisit || null);
            setPracticeDates(parsed.practiceDates || []);
            // setUser(parsed.user || null); // Removed
            checkStreak(parsed.streak, parsed.lastVisit);
        } else {
            checkStreak(0, null);
        }
    }, [session]); // Re-run when session changes

    useEffect(() => {
        if (!mounted) return;
        const storageKey = session?.user?.email ? `leetcode-progress-${session.user.email}` : 'leetcode-progress';
        localStorage.setItem(storageKey, JSON.stringify({
            completedProblems,
            streak,
            lastVisit,
            practiceDates,
            // user // Removed from local storage payload
        }));
    }, [completedProblems, streak, lastVisit, practiceDates, session, mounted]); // Added session to dependencies

    const checkStreak = (currentStreak: number, lastDate: string | null) => {
        const today = new Date().toDateString();

        if (lastDate === today) return; // Already visited today

        if (lastDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (lastDate === yesterday.toDateString()) {
                // Continue streak
                updateStreak(currentStreak + 1, today);
            } else {
                // Broken streak
                updateStreak(1, today);
            }
        } else {
            // First visit
            updateStreak(1, today);
        }
    };

    const updateStreak = (newStreak: number, date: string) => {
        setStreak(newStreak);
        setLastVisit(date);
    };

    const toggleProblem = (id: string) => {
        const today = new Date().toDateString();
        setCompletedProblems(prev => {
            const isCompleted = prev.includes(id);
            if (!isCompleted) {
                // If marking as complete, add today to practiceDates if not already there
                setPracticeDates(dates => {
                    if (!dates.includes(today)) return [...dates, today];
                    return dates;
                });
                return [...prev, id];
            } else {
                return prev.filter(p => p !== id);
            }
        });
    };

    const isCompleted = (id: string) => completedProblems.includes(id);

    // Mock Login for demo purposes (since we don't have backend keys) // Removed login/logout functions
    // const login = () => {
    //     setUser({
    //         name: "Demo User",
    //         email: "demo@example.com",
    //         image: "https://github.com/shadcn.png"
    //     });
    // };

    // const logout = () => {
    //     setUser(null);
    // };

    return (
        <ProgressContext.Provider value={{
            completedProblems,
            streak,
            user: session?.user ? { name: session.user.name || '', email: session.user.email || '', image: session.user.image || '' } : null, // User state from session
            toggleProblem,
            isCompleted,
            practiceDates
            // login, // Removed
            // logout // Removed
        }}>
            {children}
        </ProgressContext.Provider>
    );
}

export function useProgress() {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
}
