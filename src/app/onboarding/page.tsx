import type { Metadata } from 'next';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import { OnboardingPageContent } from './content';

export const metadata: Metadata = {
    title: 'Żabouczek - Twoja Przygoda z AutoŻaba | Nauka Systemu',
    description:
        'Rozpocznij swoją przygodę z AutoŻaba! Interaktywny przewodnik, który przeprowadzi Cię przez wszystkie funkcje systemu. Szybka ściąga zawsze pod ręką.',
    openGraph: {
        title: 'Żabouczek - Twoja Przygoda z AutoŻaba',
        description:
            'Interaktywny przewodnik po systemie AutoŻaba. Naucz się zarządzać sklepem, zespołem i harmonogramem.',
        type: 'website',
    },
};

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <OnboardingPageContent />
            <Footer />
        </div>
    );
}
