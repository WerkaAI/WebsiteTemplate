import { getAllPosts } from '@/lib/posts';
import { getAllTutorials } from '@/lib/tutorials';

export async function GET() {
    const posts = await getAllPosts();
    const tutorials = await getAllTutorials();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://autozaba.pl';

    const allContent = [
        ...posts.map(post => ({ ...post, type: 'blog', url: `${baseUrl}/blog/${post.slug}` })),
        ...tutorials.map(tutorial => ({ ...tutorial, type: 'tutorial', url: `${baseUrl}/tutoriale/${tutorial.slug}` }))
    ].sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AutoŻaba - Blog i Tutoriale</title>
    <link>${baseUrl}</link>
    <description>Automatyzacja grafików i zarządzanie sklepem Żabka</description>
    <language>pl</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${allContent.map(item => `
    <item>
      <title><![CDATA[${item.meta.title}]]></title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${new Date(item.meta.date).toUTCString()}</pubDate>
      <description><![CDATA[${item.meta.description || ''}]]></description>
    </item>
    `).join('')}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}
