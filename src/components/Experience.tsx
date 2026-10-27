"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  MapPin,
  RotateCcw,
  Check,
  Pause,
  Play,
} from "lucide-react";
import Burger from "./Burger";
import {
  brand,
  navigation,
  categories,
  filterProducts,
  products,
  stages,
  faqs,
  sourceNote,
  locations,
  builderOptions,
  type Category,
  type Product,
} from "@/lib/content";
function Out({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} />
      <span className="sr-only"> (öffnet neuen Tab)</span>
    </a>
  );
}
export default function Experience() {
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false),
    [active, setActive] = useState(""),
    [category, setCategory] = useState<Category>("Alle"),
    [product, setProduct] = useState<Product | null>(null),
    [stage, setStage] = useState(0),
    [base, setBase] = useState("Sesam-Bun"),
    [patty, setPatty] = useState("Beef-Stil"),
    [cheese, setCheese] = useState(true),
    [toppings, setToppings] = useState<string[]>(["Salat", "Tomate"]),
    [sauce, setSauce] = useState("BBQ-Stil"),
    [city, setCity] = useState("Alle"),
    [region, setRegion] = useState("Alle");
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (e.target.hasAttribute("data-stage"))
              setStage(Number(e.target.getAttribute("data-stage")));
            else setActive(e.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -45% 0px" },
    );
    document
      .querySelectorAll("section[id], [data-stage]")
      .forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (product) dialog.current?.showModal();
    else dialog.current?.close();
  }, [product]);
  useEffect(() => {
    if (!open) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab") {
        const items = Array.from(
          document.querySelectorAll<HTMLElement>(".mobile-nav a, .menu-toggle"),
        );
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", handle);
    };
  }, [open]);
  function reset() {
    setBase("Sesam-Bun");
    setPatty("Beef-Stil");
    setCheese(true);
    setToppings(["Salat", "Tomate"]);
    setSauce("BBQ-Stil");
  }
  return (
    <>
      <a className="skip" href="#main">
        Zum Inhalt
      </a>
      <header className="header">
        <a className="wordmark" href="#home" aria-label="BURGERISTA Startseite">
          BURGERISTA<span>®</span>
        </a>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {navigation.map(([label, id]) => (
            <a
              key={id}
              className={active === id ? "active" : ""}
              href={`#${id}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="order-button" href="#locations">
          Jetzt bestellen <ArrowUpRight size={17} />
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-nav"
          aria-label="Mobile Navigation"
        >
          {[["Home", "home"], ...navigation].map(([label, id], i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => {
                setOpen(false);
                menuButton.current?.focus();
              }}
            >
              <small>0{i + 1}</small>
              {label}
              <ArrowUpRight />
            </a>
          ))}
        </nav>
      )}
      <main id="main">
        <section className="hero" id="home">
          <div className="hero-topline">
            <span>GUTER GESCHMACK. KEINE KOMPROMISSE.</span>
            <span>BURGER LOVE, AUSTRIAN SOUL ↗</span>
          </div>
          <div className="hero-title">
            <h1>
              WIR LEBEN
              <br />
              <span>BURGER.</span>
            </h1>
            <span className="hero-asterisk" aria-hidden="true">
              ✳︎
            </span>
          </div>
          <div className="hero-copy">
            <span className="eyebrow">DAS IST DEIN MOMENT.</span>
            <p>
              Zwei Hände. Ein Burger.
              <br />
              Und alles andere ist kurz egal.
            </p>
            <a href="#menu" className="button dark">
              Speisekarte entdecken <ArrowUpRight size={20} />
            </a>
            <a className="text-link" href="#locations">
              Standorte finden <ArrowRight size={16} />
            </a>
          </div>
          <div
            className="hero-burger"
            onPointerMove={(e) => {
              if (
                window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
                e.pointerType !== "mouse"
              )
                return;
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty(
                "--tilt",
                `${(e.clientX - r.left - r.width / 2) / 50}deg`,
              );
            }}
            onPointerLeave={(e) =>
              e.currentTarget.style.setProperty("--tilt", "0deg")
            }
          >
            <Burger />
            <span className="ingredient-label">
              GROSSER GESCHMACK.
              <br />
              SCHICHT FÜR SCHICHT.{" "}
              <svg viewBox="0 0 100 40">
                <path
                  d="M2 2Q50 45 96 20M82 18L96 20L91 34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </div>
          <a href="#experience" className="round-stamp">
            100%
            <span>
              BURGER
              <br />
              LOVE
            </span>
            <ArrowUpRight size={20} />
          </a>
          <div className="hero-bottom">
            <span>
              <i /> GEMACHT FÜR DEINEN HUNGER.
            </span>
            <a href="#experience">WEITER ENTDECKEN ↓</a>
            <span className="hero-edition">UNOFFIZIELLES REDESIGN — 2026</span>
          </div>
        </section>
        <div
          className="marquee"
          role="region"
          aria-label="BURGERISTA. Wir leben Burger."
        >
          <div
            aria-hidden="true"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {[0, 1, 2, 3].map((n) => (
              <span key={n}>
                WIR LEBEN BURGER <b>✳︎</b> ALL YOU NEED IS BURGER <b>✳︎</b>{" "}
              </span>
            ))}
          </div>
          <button
            className="marquee-pause"
            aria-label={paused ? "Lauftext fortsetzen" : "Lauftext pausieren"}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
        <section className="menu-section section" id="menu">
          <div className="section-head">
            <div>
              <span className="eyebrow">01 / FINDE DEINEN FAVORITEN</span>
              <h2>
                DEIN HUNGER.
                <br />
                <em>DEINE REGELN.</em>
              </h2>
            </div>
            <div className="section-intro">
              <p>
                Von deinem ersten Biss bis zum letzten „Wow“. Entdecke die
                BURGERISTA Auswahl.
              </p>
              <Out href={brand.menu} className="text-link">
                Zur offiziellen Speisekarte
              </Out>
            </div>
          </div>
          <div className="filter-row">
            <div role="group" aria-label="Produktkategorien" className="tabs">
              {categories.map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  className={category === c ? "selected" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                  {c === "Alle" && <small>{products.length}</small>}
                </button>
              ))}
            </div>
            <span className="tiny">GROSSER APPETIT? GUTE WAHL.</span>
          </div>
          <div className="product-grid">
            {filterProducts(category).map((p, i) => (
              <button
                className={`product-card tone-${i % 3}`}
                key={p.id}
                onClick={() => setProduct(p)}
              >
                <div className="product-image">
                  <span className="product-tag">
                    {p.vegetarian
                      ? "VEGGIE-AUSWAHL"
                      : i === 0
                        ? "THE CLASSIC"
                        : "BURGER LOVE"}
                  </span>
                  <Image
                    className="burger-art"
                    src={p.image}
                    width={640}
                    height={540}
                    sizes="(max-width: 600px) 44vw, (max-width: 850px) 43vw, 28vw"
                    alt="Originale Burgerillustration; keine Abbildung der tatsächlichen Rezeptur"
                  />
                  <span className="product-add">
                    <Plus size={20} />
                  </span>
                </div>
                <div className="product-info">
                  <div>
                    <span className="tiny">{p.category.toUpperCase()}</span>
                    <h3>{p.name}</h3>
                  </div>
                  <ArrowUpRight size={22} />
                </div>
                <p>{p.description}</p>
                <span className="price">Preis im Restaurant</span>
              </button>
            ))}
          </div>
          <p className="data-note">
            Illustrative Produktdarstellung · Rezepturen und Verfügbarkeit bitte
            in der offiziellen Speisekarte prüfen. Weitere Kategorien wie Sides,
            Drinks und Desserts findest du dort.
          </p>
        </section>
        <section className="story-section" id="experience">
          <div className="story-heading">
            <span className="eyebrow">02 / MEHR ALS ZWEI BUNS</span>
            <h2>
              SO ENTSTEHT DEIN
              <br />
              <em>BURGERISTA MOMENT.</em>
            </h2>
            <p>
              Eine illustrative Reise vom ersten Gedanken bis zum ersten Biss.
            </p>
          </div>
          <div className="story-layout">
            <div className="story-visual">
              <span className="story-counter">
                0{stage + 1}
                <span> / 07</span>
              </span>
              <Burger spread={Math.max(0, (5 - stage) / 8)} />
              <div
                className="story-progress"
                role="group"
                aria-label={`Schritt ${stage + 1} von 7`}
              >
                {stages.map((s, i) => (
                  <a
                    key={s[0]}
                    className={i <= stage ? "filled" : ""}
                    href={`#stage-${i}`}
                    aria-label={s[2]}
                  />
                ))}
              </div>
              <span className="tiny">{stages[stage][2].toUpperCase()}</span>
            </div>
            <div className="story-steps">
              {stages.map(([title, text, label], i) => (
                <article
                  key={title}
                  id={`stage-${i}`}
                  data-stage={i}
                  className={stage === i ? "current" : ""}
                >
                  <span className="eyebrow">
                    0{i + 1} / {label.toUpperCase()}
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {i === 6 && (
                    <a href="#menu" className="button yellow">
                      Deinen Favoriten finden <ArrowUpRight size={18} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
          <p className="story-disclaimer">
            Künstlerische Illustration, keine Dokumentation des tatsächlichen
            Zubereitungsprozesses.
          </p>
        </section>
        <section className="builder section" id="builder">
          <div className="section-head">
            <div>
              <span className="eyebrow">03 / DEIN BURGER. DEIN KUNSTWERK.</span>
              <h2>
                HOCH HINAUS.
                <br />
                <em>GANZ DEIN DING.</em>
              </h2>
            </div>
            <div className="section-intro">
              <p>
                Bau dir deinen Lieblingsburger. Inspiriert von der
                Skyscraper-Idee — hier als spielerische Design-Demo.
              </p>
              <span className="demo-label">
                INTERAKTIVE DEMO · KEINE BESTELLUNG
              </span>
            </div>
          </div>
          <div className="builder-layout">
            <div className="builder-preview">
              <span className="builder-name">DEIN MEISTERWERK ↘</span>
              <Burger
                spread={0.14}
                cheese={cheese}
                toppings={toppings}
                veggie={patty === "Veggie-Stil"}
                bunStyle={base}
                sauce={sauce}
              />
              <div className="builder-summary" aria-live="polite">
                {base} · {patty} · {cheese ? "Käse" : "Ohne Käse"}
                <br />
                {toppings.join(", ") || "Ohne Toppings"} · {sauce}
              </div>
            </div>
            <div className="builder-controls">
              {[
                ["01", "Deine Basis", builderOptions.base, base, setBase],
                ["02", "Dein Patty", builderOptions.patty, patty, setPatty],
                ["05", "Deine Sauce", builderOptions.sauce, sauce, setSauce],
              ].map(([n, title, options, value, setter]) => (
                <fieldset key={n as string}>
                  <legend>
                    <span>{n as string}</span>
                    {title as string}
                  </legend>
                  <div className="chips">
                    {(options as readonly string[]).map((o) => (
                      <button
                        key={o}
                        aria-pressed={value === o}
                        className={value === o ? "chosen" : ""}
                        onClick={() => (setter as (v: string) => void)(o)}
                      >
                        {o}
                        {value === o && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}
              <fieldset>
                <legend>
                  <span>03</span>Say cheese!
                </legend>
                <div className="chips">
                  {builderOptions.cheese.map((c, i) => (
                    <button
                      key={c}
                      aria-pressed={cheese === (i === 0)}
                      className={cheese === (i === 0) ? "chosen" : ""}
                      onClick={() => setCheese(i === 0)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>
                  <span>04</span>Die Extras
                </legend>
                <div className="chips">
                  {builderOptions.toppings.map((t) => (
                    <button
                      key={t}
                      aria-pressed={toppings.includes(t)}
                      className={toppings.includes(t) ? "chosen" : ""}
                      onClick={() =>
                        setToppings((prev) =>
                          prev.includes(t)
                            ? prev.filter((x) => x !== t)
                            : [...prev, t],
                        )
                      }
                    >
                      {t}
                      {toppings.includes(t) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </fieldset>
              <button className="text-link reset" onClick={reset}>
                <RotateCcw size={15} /> Neu stapeln
              </button>
              <p className="data-note">
                Illustrative Optionen, kein bestätigtes Restaurantangebot. Keine
                Preisberechnung oder Bestellung.
              </p>
            </div>
          </div>
        </section>
        <section className="about" id="about">
          <div className="about-art">
            <span>
              GOOD
              <br />
              FOOD.
              <br />
              <em>
                GOOD
                <br />
                MOOD.
              </em>
            </span>
            <div className="about-seal">
              ✳︎
              <small>
                BURGER LOVE
                <br />
                EVERY DAY
              </small>
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">
              04 / UNSERE LIEBLINGSSPRACHE? BURGER.
            </span>
            <h2>
              NICHT EINFACH
              <br />
              IRGENDEIN
              <br />
              <em>BURGER.</em>
            </h2>
            <p className="large-copy">
              Ein guter Burger ist ein kleines Stück Auszeit.
            </p>
            <p>
              Zusammenkommen. Reinbeißen. Den Moment genießen. Unser Redesign
              erzählt von der Freude am Burger — mit Charakter, Farbe und einer
              ordentlichen Portion Vorfreude.
            </p>
            <Out href={brand.official} className="button dark">
              Die echte BURGERISTA Welt
            </Out>
            <p className="data-note">
              Markengeschichte, Herkunft und Qualitätsversprechen werden nach
              Freigabe durch den Markeninhaber ergänzt.
            </p>
          </div>
        </section>
        <section className="locations section" id="locations">
          <div className="section-head">
            <div>
              <span className="eyebrow">05 / DEIN NÄCHSTER BURGER-MOMENT</span>
              <h2>
                GUTER GESCHMACK.
                <br />
                <em>GANZ IN DEINER NÄHE.</em>
              </h2>
            </div>
            <MapPin className="giant-pin" strokeWidth={1} />
          </div>
          <div className="location-layout">
            <div
              className="location-map"
              role="img"
              aria-label="Dekorative Standortillustration; keine tatsächliche Karte"
            >
              <div className="map-grid" />
              <div className="map-route" />
              <span className="map-label">ÖSTERREICH</span>
              <div className="map-badge">
                <MapPin size={32} />
                <strong>
                  HIER BEGINNT
                  <br />
                  DEIN BURGER-MOMENT.
                </strong>
              </div>
              <span className="tiny map-caption">
                ILLUSTRATION · KEINE LIVE-KARTE
              </span>
            </div>
            <div className="location-details">
              <span className="eyebrow">FINDE DEIN RESTAURANT</span>
              <h3>
                Ein guter Plan?
                <br />
                Burger essen gehen.
              </h3>
              {locations.length > 0 && (
                <>
                  <label htmlFor="region">Region auswählen</label>
                  <select
                    id="region"
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                      setCity("Alle");
                    }}
                  >
                    <option>Alle</option>
                    {Array.from(new Set(locations.map((l) => l.region))).map(
                      (r) => (
                        <option key={r}>{r}</option>
                      ),
                    )}
                  </select>
                </>
              )}
              <label htmlFor="city">Stadt auswählen</label>
              <select
                id="city"
                disabled={!locations.length}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option>Alle</option>
                {Array.from(
                  new Set(
                    locations
                      .filter((l) => region === "Alle" || l.region === region)
                      .map((l) => l.city),
                  ),
                ).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              {locations.length ? (
                locations
                  .filter(
                    (l) =>
                      (city === "Alle" || l.city === city) &&
                      (region === "Alle" || l.region === region),
                  )
                  .map((l) => (
                    <details className="location-card" key={l.id}>
                      <summary>
                        <MapPin size={18} />
                        <strong>{l.city}</strong>
                        <span>{l.address}</span>
                      </summary>
                      <div>
                        <p>
                          {l.address} · {l.region}
                        </p>
                        <p>{l.hours}</p>
                        <Out href={l.directionsUrl}>Route öffnen</Out>
                        {l.orderUrl && (
                          <Out href={l.orderUrl}>Hier bestellen</Out>
                        )}
                      </div>
                    </details>
                  ))
              ) : (
                <p>
                  Adressen, Öffnungszeiten, Anfahrt und Bestellmöglichkeiten
                  findest du in der offiziellen Standortübersicht. Hier werden
                  nur verifizierte Restaurantdaten ergänzt.
                </p>
              )}
              <Out href={brand.locations} className="button dark">
                Standort & Bestellung finden
              </Out>
              <p className="data-note">
                Du verlässt die Konzeptseite. Verfügbare Services variieren je
                Restaurant.
              </p>
            </div>
          </div>
        </section>
        <section className="faq section" id="faq">
          <div>
            <span className="eyebrow">06 / GUT ZU WISSEN</span>
            <h2>
              NOCH
              <br />
              <em>HUNGRIG</em>
              <br />
              AUF ANTWORTEN?
            </h2>
            <span className="faq-star" aria-hidden="true">
              ✳︎
            </span>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <details key={q}>
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  {q}
                  <Plus className="plus" size={20} />
                  <Minus className="minus" size={20} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="final-cta">
          <span className="eyebrow">WENIGER SCROLLEN. MEHR GENIESSEN.</span>
          <h2>
            BEREIT FÜR
            <br />
            DEINEN <em>ERSTEN BISS?</em>
          </h2>
          <a href="#locations" className="button dark">
            Finde deinen BURGERISTA <ArrowUpRight size={20} />
          </a>
          <span className="cta-star" aria-hidden="true">
            ✳︎
          </span>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <a className="wordmark" href="#home">
            BURGERISTA<span>®</span>
          </a>
          <p>WIR LEBEN BURGER.</p>
          <a href="#home" className="back-top" aria-label="Zurück nach oben">
            ↑
          </a>
        </div>
        <div className="footer-links">
          <nav aria-label="Footernavigation">
            {navigation.map(([l, id]) => (
              <a key={id} href={`#${id}`}>
                {l}
              </a>
            ))}
            <Out href={brand.official}>Kontakt & offizielle Website</Out>
          </nav>
          <div>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{sourceNote}</p>
          <span>© 2026 · DESIGN CONCEPT</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        onCancel={() => setProduct(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setProduct(null);
        }}
        aria-labelledby="product-title"
      >
        {product && (
          <div className="product-modal">
            <button
              className="modal-close"
              aria-label="Produktdetails schließen"
              onClick={() => setProduct(null)}
              autoFocus
            >
              <X />
            </button>
            <div className="modal-art">
              <Burger veggie={product.category === "Veggie"} />
            </div>
            <span className="eyebrow">{product.category} / PRODUKTAUSWAHL</span>
            <h2 id="product-title">{product.name}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Preis im Restaurant</strong>
            </p>
            <p>
              Illustration. Zutaten, Allergene und aktuelle Verfügbarkeit sind
              nicht verifiziert. Bitte prüfe die offizielle Speisekarte und
              frage bei Unverträglichkeiten im Restaurant nach.
            </p>
            <Out href={product.orderUrl} className="button dark">
              Offizielle Produktinformationen
            </Out>
          </div>
        )}
      </dialog>
    </>
  );
}
