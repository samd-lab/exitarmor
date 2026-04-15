import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/blog';
import { MarketingLayout } from '../MarketingLayout';

export default function BlogIndex() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <MarketingLayout>
      <section className="mk-blog-hero">
        <p className="mk-doc__eyebrow">The Exit Armor Blog</p>
        <h1>Calm, specific guidance for the hardest week of your career.</h1>
        <p>
          Deep dives on severance, unemployment, COBRA, ACA, non-competes, and the job
          search after a layoff. Written to be read at 2am with a glass of wine, and
          to actually help.
        </p>
      </section>

      <div className="mk-blog-grid">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="mk-blog-card">
            <div className="mk-blog-card__accent" style={{ background: p.accent }} />
            <div className="mk-blog-card__category">{p.category}</div>
            <h2>{p.title}</h2>
            <p>{p.summary}</p>
            <div className="mk-blog-card__meta">
              <span>{p.author}</span>
              <span>{p.readMinutes} min read</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mk-cta-band" style={{ marginTop: '5rem' }}>
        <h2>Ready to do more than read?</h2>
        <p>
          Exit Armor's interactive checklist walks you through every item in these
          posts &mdash; personalized to your state, your tenure, and your situation.
        </p>
        <Link to="/app" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
          Launch Exit Armor &mdash; $69
        </Link>
      </div>
    </MarketingLayout>
  );
}
