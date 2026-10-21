import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/analysis";
import { INCIDENTS, kindMeta } from "@/lib/incidents";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.dek,
    alternates: { canonical: `/analysis/${a.slug}` },
    openGraph: {
      type: "article",
      publishedTime: a.isoDate,
      title: a.title,
      description: a.dek,
      ...(a.image ? { images: [{ url: a.image, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const related = INCIDENTS.filter((i) => a.relatedIncidents.includes(i.id));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.dek,
    datePublished: a.isoDate,
    publisher: { "@type": "Organization", name: "AIFailSafe" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="eyebrow">
        Analysis · {a.date} · {a.readingTime}
      </p>
      <h1>{a.title}</h1>
      <p className="lead">{a.dek}</p>
      {a.image && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="article-hero" src={a.image} alt="" width={1200} height={630} />
      )}

      <article className="prose">
        {a.body.map((b, n) => {
          if (b.t === "h2") return <h2 key={n}>{b.text}</h2>;
          if (b.t === "pull") return <p key={n} className="pull">{b.text}</p>;
          if (b.t === "list")
            return (
              <ul key={n} className="plain">
                {b.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            );
          return <p key={n}>{b.text}</p>;
        })}
      </article>

      <section className="cta">
        <div className="two">
          <div>
            <h2 className="h-big">Tell your representatives</h2>
            <p>Pick what to say and how blunt to be. About a minute, and your ZIP never leaves your browser.</p>
          </div>
          <Link className="call" href="/act">
            Find my reps
          </Link>
        </div>
      </section>

      <section>
        <h2 className="h-big">Sources</h2>
        <ul className="plain">
          {a.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="h-big">Incidents referenced</h2>
          <div className="list">
            {related.map((i) => (
              <Link key={i.id} href={`/incidents#${i.id}`} className="row">
                <span className="row-date">{i.date}</span>
                <span className="row-title">{i.title}</span>
                <span className={`tag tag-${i.kind}`}>{kindMeta(i.kind).label}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
