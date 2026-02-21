"use client";

import {
    Shield,
    Clock,
    Zap,
    Users,
    FileCheck,
    BrainCircuit,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { BentoGrid } from "@/components/ui/bento-grid";

export default function FeaturesBento() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-24 relative overflow-hidden flex flex-col items-center">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container-spacing relative z-10 w-full">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16 space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" variants={itemVariants}>
                        Wszystko, czego potrzebujesz do <span className="text-emerald-600 dark:text-emerald-400">spokojnego snu</span>
                    </motion.h2>
                    <motion.p className="text-xl text-muted-foreground" variants={itemVariants}>
                        Zastąp chaos w Excelu inteligentnym systemem, który dba o spójne zasady pracy za Ciebie.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">

                    {/* Feature 1: Automation (Large) */}
                    <motion.div
                        className="md:col-span-2 relative group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <GlassCard className="h-full p-8 md:p-10">
                            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                                <BrainCircuit className="w-64 h-64" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 dark:bg-emerald-500/20 dark:text-emerald-300">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3">Automatyczne Grafiki</h3>
                                <p className="text-lg text-muted-foreground mb-8 max-w-md">
                                    Algorytm układa optymalny grafik w 3 minuty, biorąc pod uwagę dostępność, urlopy i budżet. Koniec z ręcznym układaniem puzzli.
                                </p>
                                <div className="mt-auto">
                                    <div className="flex items-center gap-4 text-sm font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                        <Clock className="w-5 h-5" />
                                        <span>Oszczędzasz średnio 12h miesięcznie na planowaniu</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Feature 2: Compliance support (Tall) */}
                    <motion.div
                        className="md:row-span-2 relative group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <GlassCard className="h-full p-8 md:p-10">
                            <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                                <Shield className="w-48 h-48" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 dark:bg-blue-500/20 dark:text-blue-300">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-3">Wsparcie zgodności 24/7</h3>
                                <p className="text-lg text-muted-foreground mb-6">
                                    System na bieżąco monitoruje Kodeks Pracy. Ostrzeże Cię przed:
                                </p>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {[
                                        "Naruszeniem doby pracowniczej",
                                        "Brakiem 11h odpoczynku",
                                        "Przekroczeniem etatu",
                                        "Złym planowaniem urlopów",
                                        "Błędami w ewidencji czasu"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50">
                                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-1">Efekt</p>
                                    <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">Mniej błędów i mniej ręcznych korekt</p>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Feature 3: Team App (Medium) */}
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <GlassCard className="h-full p-8 md:p-10">
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 dark:bg-purple-500/20 dark:text-purple-300">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">Aplikacja dla Zespołu</h3>
                                <p className="text-muted-foreground mb-4">
                                    Pracownicy sami wpisują dyspozycyjność i widzą grafik w telefonie.
                                </p>
                                <Link href="/funkcje" className="text-sm font-semibold text-purple-600 flex items-center gap-1 hover:gap-2 transition-all">
                                    Zobacz więcej <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Feature 4: Documents (Medium) */}
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <GlassCard className="h-full p-6 md:p-10">
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 dark:bg-amber-500/20 dark:text-amber-300">
                                    <FileCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">Ewidencja i Listy</h3>
                                <p className="text-muted-foreground mb-4">
                                    Listy obecności i ewidencja czasu pracy generują się same. Gotowe do druku.
                                </p>
                                <Link href="/funkcje" className="text-sm font-semibold text-amber-600 flex items-center gap-1 hover:gap-2 transition-all">
                                    Zobacz przykłady <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </GlassCard>
                    </motion.div>

                </div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-emerald-500/20" asChild>
                        <Link href="/funkcje">
                            Poznaj wszystkie funkcje
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
