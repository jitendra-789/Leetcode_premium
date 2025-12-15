'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

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
    login: () => void;
    logout: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
    const [completedProblems, setCompletedProblems] = useState<string[]>([]);
    const [streak, setStreak] = useState(0);
    const [lastVisit, setLastVisit] = useState<string | null>(null);
    const [user, setUser] = useState<{ name: string; email: string; image: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load from local storage
        const saved = localStorage.getItem('leetcode-progress');
        if (saved) {
            const parsed = JSON.parse(saved);
            setCompletedProblems(parsed.completedProblems || []);
            setStreak(parsed.streak || 0);
            setLastVisit(parsed.lastVisit || null);
            setUser(parsed.user || null);
            checkStreak(parsed.streak, parsed.lastVisit);
        } else {
            checkStreak(0, null);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem('leetcode-progress', JSON.stringify({
            completedProblems,
            streak,
            lastVisit,
            user
        }));
    }, [completedProblems, streak, lastVisit, user, mounted]);

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
        setCompletedProblems(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };

    const isCompleted = (id: string) => completedProblems.includes(id);

    // Mock Login for demo purposes (since we don't have backend keys)
    const login = () => {
        setUser({
            name: "Demo User",
            email: "demo@example.com",
            image: "https://github.com/shadcn.png"
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <ProgressContext.Provider value={{ completedProblems, streak, user, toggleProblem, isCompleted, login, logout }}>
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
