import { Link, useParams } from 'react-router-dom';
import { BLOG_BY_SLUG, BLOG_POSTS } from '../../data/blog';
import { MarketingLayout } from '../MarketingLayout';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  usePageMeta,
} from '../../lib/seo';
import { usePricing } from '../../lib/usePricing';

// Minimal markdown renderer: ## for h2, blank line for paragraph breaks
function renderBody(body: string) {
  const blocks = body.split(/\n\s*\n/);
  return blocks.map((b, i) => {
    const trimmed = b.trim();
    if (trimmed.startsWith('## ')) {
      return <h2 key={i}>{trimmed.replace(/^##\s*/, '')}</h2>;
    }
    if (trimmed.startsWith('### ')) {
      return <h3 key={i}>{trimmed.replace(/^###\s*/, '')}</h3>;
    }
    // Simple list detection
    if (trimmed.split('\n').every((line) => line.trim().startsWith('- '))) {
      return (
        <ul key={i}>
          {trimmed.split('\n').map((line, j) => (
            <li key={j}>{line.replace(/^\-\s*/, '')}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{trimmed}</p>;
  });
}

export default function BlogPost() {
  const pricing = usePricing();
  const { slug = '' } = useParams();
  const post = BLOG_BY_SLUG[slug];

  // Hooks must be called unconditionally — always call usePageMeta, but
  // emit a noindex 404-ish meta when the slug doesn't resolve to a post.
  usePageMeta(
    post
      ? {
          title: `${post.title} — Exit Armor`,
          description: post.summary,
          path: `/blog/${post.slug}`,
          ogType: 'article',
          article: {
            publishedTime: post.date,
            author: post.author,
            section: post.category,
          },
          jsonLd: [
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
            articleJsonLd({
              slug: post.slug,
              title: post.title,
              description: post.summary,
              datePublished: post.date,
              author: post.author,
              section: post.category,
              wordCount: post.body.split(/\s+/).length,
            }),
          ],
        }
      : {
          title: 'Post not found — Exit Armor',
          description: 'That blog post could not be found.',
          path: `/blog/${slug}`,
          noindex: true,
        }
  );

  if (!post) {
    return (
      <MarketingLayout>
        <article className="mk-doc">
          <h1>Post not found</h1>
          <p className="mk-doc__lede">
            We couldn't find that blog post. It may have been moved or renamed.{' '}
            <Link to="/blog">Back to the blog</Link>.
          </p>
        </article>
      </MarketingLayout>
    );
  }

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);

  const dateFmt = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <MarketingLayout>
      <article className="mk-doc">
        <Link
          to="/blog"
          style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}
        >
          &larr; All posts
        </Link>
        <p className="mk-doc__eyebrow" style={{ marginTop: '1.5rem' }}>
          <span className="mk-doc__category">{post.category}</span>
        </p>
        <h1>{post.title}</h1>
        <p className="mk-doc__lede">{post.summary}</p>

        <div className="mk-doc__meta">
          <div className="mk-doc__author">
            <div className="mk-doc__avatar">{post.author.split(' ').map((n) => n[0]).slice(0, 2).join('')}</div>
            <div>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem', display: 'block' }}>
                {post.author}
              </strong>
              <span style={{ fontSize: '0.8rem' }}>{dateFmt} &middot; {post.readMinutes} min read</span>
            </div>
          </div>
        </div>

        <div className="mk-doc__body">{renderBody(post.body)}</div>

        <div className="mk-doc__cta">
          <h3>Turn this into action.</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Exit Armor walks you through every step in this post with personalized
            checklists, state-specific guidance, and copy-paste email templates.
          </p>
          <Link to="/checkout" className="btn btn-primary">Get the kit &mdash; {pricing.label}</Link>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h2>More on {post.category}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  style={{
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    padding: '1rem 1.2rem',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    display: 'block',
                  }}
                >
                  <strong style={{ fontFamily: 'var(--font-heading)' }}>{r.title}</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                    {r.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </MarketingLayout>
  );
}
