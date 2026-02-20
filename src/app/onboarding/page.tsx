import type { Metadata } from 'next';
import Navigation from '@/components/layout/navigation';
import Footer from '@/components/layout/footer';
import { OnboardingPageContent } from './content';

export const metadata: Metadata = {
    title: 'Onboarding — interaktywny przewodnik',
    description:
        'Rozpocznij onboarding. Interaktywny przewodnik przeprowadzi Cię przez kluczowe funkcje systemu.',
    openGraph: {
        title: 'Onboarding — interaktywny przewodnik',
        description:
            'Interaktywny przewodnik po systemie. Naucz się pracy z kluczowymi modułami.',
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
