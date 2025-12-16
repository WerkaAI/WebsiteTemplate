import type { Metadata } from 'next';
import { OnboardingPageContent } from './content';

export const metadata: Metadata = {
    title: 'Onboarding - Twoja Przygoda z AutoŻaba | Nauka Systemu',
    description:
        'Rozpocznij swoją przygodę z AutoŻaba! Interaktywny przewodnik, który przeprowadzi Cię przez wszystkie funkcje systemu. Szybka ściąga zawsze pod ręką.',
    openGraph: {
        title: 'Onboarding - Twoja Przygoda z AutoŻaba',
        description:
            'Interaktywny przewodnik po systemie AutoŻaba. Naucz się zarządzać sklepem, zespołem i harmonogramem.',
        type: 'website',
    },
};

export default function OnboardingPage() {
    return <OnboardingPageContent />;
}
