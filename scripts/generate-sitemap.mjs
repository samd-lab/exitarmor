// Regenerate public/sitemap.xml from src/data/blog.ts before every build.
// Runs as a `prebuild` script so the static file is always in sync with
// the TypeScript source of truth for blog posts.
//
// Usage: `node scripts/generate-sitemap.mjs`

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const BLOG_SRC = resolve(ROOT, 'src/data/blog.ts');
const OUT = resolve(ROOT, 'public/sitemap.xml');

const SITE_URL = 'https://exitarmor.com';
const today = new Date().toISOString().slice(0, 10);

// Parse slugs + dates out of blog.ts with a simple regex. We avoid importing
// the TS module directly so this script stays dependency-free (no ts-loader).
function parseBlogPosts(source) {
  const posts = [];
  const slugRe = /slug:\s*'([^']+)'/g;
  const dateRe = /date:\s*'([^']+)'/g;
  const slugs = [...source.matchAll(slugRe)].map((m) => m[1]);
  const dates = [...source.matchAll(dateRe)].map((m) => m[1]);
  const n = Math.min(slugs.length, dates.length);
  for (let i = 0; i < n; i++) {
    posts.push({ slug: slugs[i], date: dates[i] });
  }
  return posts;
}

// Canonical set of marketing routes. Matches src/App.tsx excluding the
// purchase-gated /app + /action-plan (disallowed in robots.txt).
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
];

function xmlEscape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildUrl({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function main() {
  const source = readFileSync(BLOG_SRC, 'utf8');
  const posts = parseBlogPosts(source);

  const urls = [];

  for (const r of STATIC_ROUTES) {
    urls.push(
      buildUrl({
        loc: `${SITE_URL}${r.path === '/' ? '/' : r.path}`,
        lastmod: today,
        changefreq: r.changefreq,
        priority: r.priority,
      })
    );
  }

  for (const p of posts) {
    urls.push(
      buildUrl({
        loc: `${SITE_URL}/blog/${p.slug}`,
        lastmod: p.date,
        changefreq: 'monthly',
        priority: '0.8',
      })
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  writeFileSync(OUT, xml, 'utf8');
  console.log(`[sitemap] wrote ${OUT} — ${STATIC_ROUTES.length} routes + ${posts.length} posts`);
}

main();
