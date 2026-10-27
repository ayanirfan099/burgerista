import Experience from "@/components/Experience";
export default function Home() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  return (
    <>
      {url && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BURGERISTA — unabhängiges Redesign-Konzept",
              url,
              inLanguage: "de-AT",
              description:
                "Unabhängige interaktive Designpräsentation. Keine offizielle Website oder Bestellplattform.",
            }).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <Experience />
    </>
  );
}
