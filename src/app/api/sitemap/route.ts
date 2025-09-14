import { getNavigation } from 'features/navigation/model/api/navigation.api';
import { SITE_URL } from 'shared/consts/site.constants';

type SitemapUrl = {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod: string;
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSitemapUrls(items: any[]): SitemapUrl[] {
  const now = new Date().toISOString();
  const urls: SitemapUrl[] = [];

  for (const item of items) {
    if (item.blockType === 'navitem' && item.url) {
      urls.push({
        loc: escapeXml(`${SITE_URL}${item.url}`),
        priority: (item.priority ?? 0.7).toFixed(1),
        changefreq: item.changefreq ?? 'weekly',
        lastmod: item.lastmod ?? now,
      });
    }
    if (item.blockType === 'navdropdown' && item.children?.length) {
      urls.push(...buildSitemapUrls(item.children));
    }
  }

  return urls;
}

// -------------------- КЕШ --------------------
let cachedXml: string | null = null;
let cachedAt: number | null = null;

// TTL = 24 часа
const CACHE_TTL = 1000 * 60 * 60 * 24;

async function generateSitemap(): Promise<string> {
  const navigation = await getNavigation();
  const urls = buildSitemapUrls(navigation.items);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;
}

export async function GET() {
  const now = Date.now();

  if (cachedXml && cachedAt && now - cachedAt < CACHE_TTL) {
    return new Response(cachedXml, {
      headers: { 'Content-Type': 'application/xml; charset=UTF-8' },
    });
  }

  const xml = await generateSitemap();
  cachedXml = xml;
  cachedAt = now;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=UTF-8' },
  });
}
