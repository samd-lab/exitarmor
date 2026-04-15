// Per-page SEO + social meta injector.
//
// Vite ships a single index.html, so without this hook every route on the
// site would inherit the same <title>, meta description, OG tags, and
// canonical URL. That's a soft-duplicate-content problem for search and
// a terrible share-card experience.
//
// `usePageMeta` rewrites the relevant <head> tags on route mount and
// installs optional JSON-LD for schema.org structured data.
//
// Callers pass a stable-ish object; we serialise it once as a dep key so
// React only re-runs the effect when meta actually changes.

import { useEffect } from 'react';

export const SITE_URL = 'https://exitarmor.com'; // update if your canonical host differs
export const SITE_NAME = 'Exit Armor';
export const DEFAULT_OG_IMAGE = '/og-image.svg';

export interface ArticleMeta {
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  section?: string;
  tags?: string[];
}

export interface PageMeta {
  title: string;
  description: string;
  path: string; // app-relative path, e.g. '/about' or `/blog/${slug}`
  ogType?: 'website' | 'article';
  ogImage?: string; // absolute url or site-relative path
  noindex?: boolean;
  article?: ArticleMeta;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

function upsertMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function removeMeta(attr: 'name' | 'property', key: string) {
  const el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id: string, data: unknown) {
  let el = document.head.querySelector(`script[data-jsonld="${id}"]`) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('data-jsonld', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function clearJsonLd(id: string) {
  const el = document.head.querySelector(`script[data-jsonld="${id}"]`);
  if (el) el.remove();
}

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

export function usePageMeta(meta: PageMeta) {
  const key = JSON.stringify(meta);

  useEffect(() => {
    const canonical = absoluteUrl(meta.path);
    const ogImage = absoluteUrl(meta.ogImage || DEFAULT_OG_IMAGE);
    const ogType = meta.ogType || 'website';

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:site_name', SITE_NAME);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertMeta(
      'name',
      'robots',
      meta.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1'
    );

    if (meta.article) {
      upsertMeta('property', 'article:published_time', meta.article.publishedTime);
      if (meta.article.modifiedTime) {
        upsertMeta('property', 'article:modified_time', meta.article.modifiedTime);
      } else {
        removeMeta('property', 'article:modified_time');
      }
      upsertMeta('property', 'article:author', meta.article.author);
      if (meta.article.section) {
        upsertMeta('property', 'article:section', meta.article.section);
      } else {
        removeMeta('property', 'article:section');
      }
    } else {
      removeMeta('property', 'article:published_time');
      removeMeta('property', 'article:modified_time');
      removeMeta('property', 'article:author');
      removeMeta('property', 'article:section');
    }

    if (meta.jsonLd) {
      setJsonLd('page', meta.jsonLd);
    } else {
      clearJsonLd('page');
    }
    // key is a memoised serialisation of meta — re-run when content changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}

// ---------------------------------------------------------------------------
// Prebuilt JSON-LD helpers — use these to keep schema.org payloads consistent.
// ---------------------------------------------------------------------------

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-mark.svg`,
    sameAs: [] as string[],
    description:
      'Exit Armor is a 90-day layoff survival kit: severance math, HR call roleplay, COBRA vs ACA comparison, 50-state unemployment rules, and budget runway tools.',
  };
}

export function productJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Exit Armor — 90-Day Layoff Survival Kit',
    description:
      'A one-time $69 severance and layoff survival kit with 10 tools, 50-state unemployment rules, 11 negotiation asks, HR call roleplay, and a printable action plan.',
    brand: { '@type': 'Brand', name: SITE_NAME },
    image: `${SITE_URL}/og-image.svg`,
    offers: {
      '@type': 'Offer',
      price: '69.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/app`,
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

interface ArticleLdInput {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  section?: string;
  wordCount?: number;
  image?: string;
}

export function articleJsonLd(a: ArticleLdInput) {
  const url = absoluteUrl(`/blog/${a.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    author: { '@type': 'Organization', name: a.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo-mark.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: absoluteUrl(a.image || DEFAULT_OG_IMAGE),
    articleSection: a.section,
    wordCount: a.wordCount,
  };
}

interface FaqItem { q: string; a: string }

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
