import React from 'react';

import { getCspNonce } from "@/lib/security/csp";

export const JsonLd = ({ nonce }: { nonce?: string }) => {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'AutoŻaba',
        url: 'https://autozaba.pl',
        logo: 'https://autozaba-app-storage.fra1.cdn.digitaloceanspaces.com/prod/landing-page/start-w-autozaba.png',
        sameAs: [
            // Add social profiles here if available
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'kontakt@autozaba.pl',
            contactType: 'customer support',
        },
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AutoŻaba',
        url: 'https://autozaba.pl',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://autozaba.pl/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AutoŻaba',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'PLN',
            description: 'Darmowy okres próbny',
        },
        description: 'Cyfrowy asystent dla sklepów Żabka. Automatyzacja grafików i Tarcza Prawna.',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '120',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                nonce={nonce}
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                suppressHydrationWarning
            />
            <script
                type="application/ld+json"
                nonce={nonce}
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                suppressHydrationWarning
            />
            <script
                type="application/ld+json"
                nonce={nonce}
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
                suppressHydrationWarning
            />
        </>
    );
};
