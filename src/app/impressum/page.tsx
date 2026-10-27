import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Impressum — BURGERISTA Redesign-Konzept",
  robots: { index: false, follow: false },
  alternates: { canonical: "/impressum" },
};
export default function Impressum() {
  return (
    <main className="legal">
      <Link href="/">← Zurück zum Konzept</Link>
      <h1>Impressum</h1>
      <p>
        Diese Website ist ein unabhängiges Redesign-Konzept und kein offizieller
        Onlineauftritt von BURGERISTA. Es besteht keine behauptete Beauftragung
        oder Verbindung zum Markeninhaber.
      </p>
      <h2>Angaben zum Betreiber</h2>
      <p>
        Vor einer öffentlichen Veröffentlichung müssen hier der tatsächliche
        Betreiber, die ladungsfähige Anschrift, Kontaktinformationen sowie alle
        nach anwendbarem Recht erforderlichen Angaben ergänzt und rechtlich
        geprüft werden.
      </p>
      <p>
        <strong>
          Redaktioneller Platzhalter — keine freigegebene Rechtstextfassung.
        </strong>
      </p>
      <h2>Marken & Illustrationen</h2>
      <p>
        BURGERISTA und die genannten Produktnamen werden zur Präsentation des
        Designkonzepts verwendet. Die Burgerillustrationen wurden für dieses
        Projekt erstellt und bilden keine tatsächlichen Produkte ab.
        Markenrechte verbleiben bei ihren jeweiligen Inhabern.
      </p>
      <a
        href="https://www.burgerista.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Zur offiziellen BURGERISTA Website ↗
      </a>
    </main>
  );
}
