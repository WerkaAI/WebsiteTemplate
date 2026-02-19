'use client';

import { useState, useMemo, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Book, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchQuests, CHEAT_SHEET_CATEGORIES, ADVENTURES } from '@/lib/onboarding/onboarding-content';
import type { Quest } from '@/lib/onboarding/onboarding-content';

interface CheatSheetPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

// Static category keywords mapping - moved to module scope for performance
const CATEGORY_KEYWORDS: Record<string, string[]> = {
    ogolne: ['logowanie', 'język', 'konto', 'powiadomienia'],
    personel: ['pracownik', 'umowa', 'zatrudnienie'],
    sklep: ['sklep', 'adres'],
    rozliczenia: ['rozliczenie', 'godziny', 'PIP', 'eksport'],
    dostepnosc: ['dostępność', 'kalendarz', 'notatka'],
    harmonogram: ['harmonogram', 'grafik', 'zmiana', 'drag'],
    automatyzacja: ['AI', 'automatyczny', 'algorytm'],
};

export function CheatSheetPanel({ isOpen, onClose }: CheatSheetPanelProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [expandedQuest, setExpandedQuest] = useState<string | null>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Debounce search query
    useEffect(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 200);
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQuery]);

    // Get all quests for browsing
    const allQuests = useMemo(() => {
        return ADVENTURES.flatMap((adventure) => adventure.quests);
    }, []);

    // Search results (using debounced query)
    const searchResults = useMemo(() => {
        if (debouncedQuery.trim()) {
            return searchQuests(debouncedQuery);
        }
        return [];
    }, [debouncedQuery]);

    // Filter by category (simple keyword match for demo)
    const filteredByCategory = useMemo(() => {
        if (!selectedCategory) return allQuests;
        const keywords = CATEGORY_KEYWORDS[selectedCategory] || [];
        return allQuests.filter((q) =>
            keywords.some((kw) =>
                q.title.toLowerCase().includes(kw.toLowerCase()) ||
                q.keywords.some((qkw) => qkw.toLowerCase().includes(kw.toLowerCase()))
            )
        );
    }, [selectedCategory, allQuests]);

    // Display list
    const displayQuests = searchQuery.trim() ? searchResults : filteredByCategory;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    />

                    {/* Panel - Full screen on mobile */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col"
                        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Book className="w-5 h-5 text-brand-green" />
                                    <h2 className="text-lg font-bold">Ściąga</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-3 -mr-1 rounded-full hover:bg-muted transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                                    aria-label="Zamknij"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Search - larger on mobile */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Szukaj... np. 'hasło', 'PIP', 'grafik'"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-brand-green text-base"
                                />
                            </div>
                        </div>

                        {/* Categories - horizontal scroll on mobile */}
                        {!searchQuery.trim() && (
                            <div className="px-4 py-3 border-b border-border">
                                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={cn(
                                            'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[40px]',
                                            !selectedCategory
                                                ? 'bg-brand-green text-white'
                                                : 'bg-muted hover:bg-muted/80'
                                        )}
                                    >
                                        Wszystko
                                    </button>
                                    {CHEAT_SHEET_CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={cn(
                                                'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap min-h-[40px]',
                                                selectedCategory === cat.id
                                                    ? 'bg-brand-green text-white'
                                                    : 'bg-muted hover:bg-muted/80'
                                            )}
                                        >
                                            {cat.icon} {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quest list */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {displayQuests.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>Brak wyników dla &ldquo;{searchQuery}&rdquo;</p>
                                    <p className="text-sm mt-1">Spróbuj innego słowa kluczowego</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {displayQuests.map((quest) => (
                                        <CheatSheetItem
                                            key={quest.id}
                                            quest={quest}
                                            isExpanded={expandedQuest === quest.id}
                                            onToggle={() =>
                                                setExpandedQuest(expandedQuest === quest.id ? null : quest.id)
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Individual cheat sheet item - memoized to prevent re-renders when siblings change
const CheatSheetItem = memo(function CheatSheetItem({
    quest,
    isExpanded,
    onToggle,
}: {
    quest: Quest;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            layout
            className="rounded-xl border border-border bg-card overflow-hidden"
        >
            <button
                onClick={onToggle}
                className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors min-h-[56px]"
            >
                <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.div>
                <span className="font-medium text-sm sm:text-base">{quest.title}</span>
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-1">
                            <p className="text-sm text-muted-foreground mb-2">
                                {quest.description}
                            </p>
                            <div className="p-3 rounded-lg bg-brand-green/5 border border-brand-green/20">
                                <p className="text-sm font-medium text-brand-green dark:text-brand-green-secondary">
                                    💡 {quest.quickAnswer}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});
