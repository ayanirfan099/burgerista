import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Datenschutz — BURGERISTA Redesign-Konzept",
  robots: { index: false, follow: false },
  alternates: { canonical: "/datenschutz" },
};
export default function Datenschutz() {
  return (
    <main className="legal">
      <Link href="/">← Zurück zum Konzept</Link>
      <h1>Datenschutz</h1>
      <p>
        Diese Seite ist ein redaktioneller Platzhalter für ein unabhängiges
        Redesign-Konzept. Sie ersetzt keine rechtlich geprüfte
        Datenschutzerklärung.
      </p>
      <h2>Funktionen dieses Konzepts</h2>
      <p>
        Die Burger-Konfiguration wird nur im Arbeitsspeicher des Browsers
        gehalten. Es werden keine Bestellungen verarbeitet. Das Projekt enthält
        keine Analysewerkzeuge, Werbetracker, eingebetteten Karten oder
        Formulare. Externe Links werden erst durch Anklicken geöffnet.
      </p>
      <h2>Vor der Veröffentlichung</h2>
      <p>
        Der Betreiber muss seine Identität und Kontaktinformationen, die
        tatsächlichen Hosting- und Protokollierungsprozesse, Rechtsgrundlagen,
        Speicherdauer, Betroffenenrechte und gegebenenfalls weitere eingesetzte
        Dienste prüfen und ergänzen. Die Verarbeitung durch die gewählte
        Hostingplattform muss berücksichtigt werden.
      </p>
      <p>
        <strong>
          Veröffentlichung erst nach Ergänzung und rechtlicher Freigabe.
        </strong>
      </p>
    </main>
  );
}
