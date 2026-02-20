import React from 'react';

export const JsonLd = ({ nonce }: { nonce?: string }) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Website Template',
        url: siteUrl,
        logo: `${siteUrl}/illustrations/logo_xcolor64x64.png`,
        sameAs: [
            // Add social profiles here if available
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'kontakt@example.com',
            contactType: 'customer support',
        },
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Website Template',
        url: siteUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    };

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Website Template',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'PLN',
            description: 'Wersja demonstracyjna',
        },
        description: 'Starter marketingowy do budowy stron i landing page dla klientów.',
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
