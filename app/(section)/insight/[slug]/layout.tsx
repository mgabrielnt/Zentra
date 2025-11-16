import type { Metadata } from "next";
import { articlesData } from "@/components/insight/articlesData";
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articlesData[params.slug];

  if (!article) {
    return {
      title: "Artikel tidak ditemukan | Zentra Insights",
      robots: { index: false, follow: false },
    };
  }

  const description = article.excerpt;
  const url = absoluteUrl(`/insight/${article.slug}`);
  const title = `${article.title} | Zentra Insights`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: article.date,
      authors: [article.author],
      images: [absoluteUrl(article.image)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(article.image)],
    },
  };
}

export default function InsightArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const article = articlesData[params.slug];

  return (
    <>
      {article ? (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: article.title,
              description: article.excerpt,
              image: [absoluteUrl(article.image)],
              author: {
                "@type": "Person",
                name: article.author,
              },
              datePublished: article.date,
              dateModified: article.date,
              mainEntityOfPage: absoluteUrl(`/insight/${article.slug}`),
              publisher: {
                "@type": "Organization",
                name: siteConfig.name,
                logo: {
                  "@type": "ImageObject",
                  url: absoluteUrl(siteConfig.logoPath),
                },
              },
            }),
          }}
        />
      ) : null}
      {children}
    </>
  );
}
