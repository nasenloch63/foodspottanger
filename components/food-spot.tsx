"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock3,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Plus,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fr, type Dictionary } from "@/locales/fr";
import { ary } from "@/locales/ary";
import { site } from "@/data/site";
import { categories, menu, type Category } from "@/data/menu";
import { mediaFor, mediaById } from "@/data/media";
import { officialPosts } from "@/data/social";
import { ApprovedImage, MediaCredit } from "./approved-image";
import { Brand, LanguageSwitcher, OrderLink } from "./ui";

const ids = [
  "accueil",
  "concept",
  "menu",
  "galerie",
  "localisation",
  "contact",
];
export default function FoodSpot() {
  const [language, setLanguage] = useState<"fr" | "ary">("fr");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<Category | "all">("all");
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [legal, setLegal] = useState<"legal" | "privacy" | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const t: Dictionary = language === "fr" ? fr : ary;
  const gallery = mediaFor("gallery");
  const hero = mediaFor("hero")[0];
  const logo = mediaFor("logo")[0];
  const social = mediaFor("social")[0];
  const changeLanguage = (next: "fr" | "ary") => {
    setLanguage(next);
    document.documentElement.lang = next === "fr" ? "fr" : "ar-MA";
    document.documentElement.dir = next === "fr" ? "ltr" : "rtl";
  };
  const modalOpen = activeImage !== null || legal !== null;
  useEffect(() => {
    if (modalOpen) {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    } else dialog.current?.close();
  }, [modalOpen]);
  const closeModal = () => {
    setActiveImage(null);
    setLegal(null);
  };
  const shiftImage = (direction: number) =>
    setActiveImage((current) =>
      current === null
        ? null
        : (current + direction + gallery.length) % gallery.length,
    );
  const InstagramLink = (
    <a
      className="text-link"
      href={site.instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Instagram size={18} />
      {t.instagram}
      <ArrowUpRight size={17} />
    </a>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="header">
        <div className="container header-inner">
          <a href="#accueil" aria-label={site.name}>
            <Brand language={language} />
          </a>
          <nav className="desktop-nav" aria-label={t.nav[0]}>
            {ids.map((id, i) => (
              <a key={id} href={`#${id}`}>
                {t.nav[i]}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <LanguageSwitcher
              language={language}
              change={changeLanguage}
              t={t}
            />
            <a
              className="header-order"
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.order}
              <ArrowUpRight size={16} />
            </a>
            <button
              className="mobile-toggle icon-button"
              aria-label={mobileOpen ? t.close : t.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          hidden={!mobileOpen}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileOpen(false);
          }}
        >
          {ids.map((id, i) => (
            <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}>
              {t.nav[i]}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </nav>
      </header>
      <main id="main">
        <section className="hero container" id="accueil">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-dot" />
              {t.eyebrow}
            </span>
            <h1>
              {t.hero1}
              {t.heroBrand && (
                <>
                  <br />
                  <bdi className="hero-brand">{t.heroBrand}</bdi>
                </>
              )}
              <br />
              <em>{t.hero2}</em>
            </h1>
            <p>{t.heroText}</p>
            <div className="badges">
              <span>
                <Check size={14} />
                {t.halal}
              </span>
              <span>{t.open}</span>
              <span>
                <Clock3 size={14} />
                {t.late}
              </span>
            </div>
            <div className="hero-actions">
              <OrderLink>{t.orderNow}</OrderLink>
              {InstagramLink}
            </div>
            <a className="scroll-cue" href="#concept">
              <span>
                <ArrowDown size={17} />
              </span>
              {t.scroll}
            </a>
          </div>
          <div
            className={`hero-media ${hero ? "has-media" : "awaiting-media"}`}
          >
            {hero ? (
              <>
                <ApprovedImage asset={hero} language={language} priority />
                <MediaCredit asset={hero} label={t.mediaSource} />
              </>
            ) : (
              <>
                {logo && (
                  <div className="hero-logo">
                    <ApprovedImage asset={logo} language={language} priority />
                  </div>
                )}
                <span className="eyebrow">THE FOOD SPOT / TANGER</span>
                <h2>{t.realSpot}</h2>
                <p>{t.mediaWaiting}</p>
                <a
                  className="text-link"
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={19} />
                  {t.instagram}
                  <ArrowUpRight size={17} />
                </a>
                <div className="hero-address">
                  <MapPin size={18} />
                  <bdi>{site.address}</bdi>
                </div>
              </>
            )}
          </div>
        </section>
        <div className="info-bar">
          <div className="container info-inner">
            <span>
              <Clock3 />
              {t.open}
              <b dir="ltr">{site.hours}</b>
            </span>
            <span>
              <MapPin />
              <bdi>Rue Caïd Ahmed Riffi 3</bdi>
            </span>
            <a href={site.telephone}>
              <Phone />
              {t.direct}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <section className="section container concept" id="concept">
          <div>
            <span className="eyebrow muted">{t.conceptLabel}</span>
            <h2>{t.conceptTitle}</h2>
          </div>
          <div>
            <p className="section-copy">{t.conceptText}</p>
            <div className="values">
              {t.values.map((value, i) => {
                const Icon = [Sparkles, Check, Heart][i];
                return (
                  <div key={value}>
                    <Icon size={22} />
                    <h3>{value}</h3>
                    <p>{t.valueTexts[i]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="menu-section section" id="menu">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow muted">{t.menuLabel}</span>
                <h2>{t.menuTitle}</h2>
                <p className="section-copy">{t.menuText}</p>
              </div>
              <a
                className="text-link"
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.askMenu}
                <ArrowUpRight size={19} />
              </a>
            </div>
            <div className="filters" role="group" aria-label={t.nav[2]}>
              <button
                aria-pressed={category === "all"}
                onClick={() => setCategory("all")}
              >
                {t.all}
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {t.categories[c]}
                </button>
              ))}
            </div>
            {menu.some((item) => item.placeholder) && (
              <p className="notice">{t.pending}</p>
            )}
            <div className="product-grid">
              {menu
                .filter(
                  (item) => category === "all" || item.category === category,
                )
                .map((item) => (
                  <article className="product-card" key={item.id}>
                    {mediaById(item.mediaId, "menu") && (
                      <div className="product-approved">
                        <ApprovedImage
                          asset={mediaById(item.mediaId, "menu")!}
                          language={language}
                        />
                        <MediaCredit
                          asset={mediaById(item.mediaId, "menu")!}
                          label={t.mediaSource}
                        />
                      </div>
                    )}
                    <div className="product-body">
                      <h3>
                        {item.name?.[language] ?? t.categories[item.category]}
                      </h3>
                      <p>{item.description?.[language] ?? t.productText}</p>
                      <div>
                        <small>{item.price ?? t.price}</small>
                        <a
                          className="round-link"
                          href={site.whatsapp}
                          aria-label={`${t.order} — ${item.name?.[language] ?? t.categories[item.category]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ArrowUpRight size={20} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
        <section className="section container" id="galerie">
          <div className="section-heading">
            <div>
              <span className="eyebrow muted">{t.galleryLabel}</span>
              <h2>{t.galleryTitle}</h2>
              <p className="section-copy">{t.galleryText}</p>
            </div>
            <a
              className="text-link"
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.moreInstagram}
              <ArrowUpRight size={18} />
            </a>
          </div>
          {gallery.length > 0 ? (
            <div className="gallery">
              {gallery.map((item, i) => (
                <figure className="gallery-approved" key={item.id}>
                  <button
                    className="gallery-item"
                    onClick={() => setActiveImage(i)}
                    aria-label={`${t.zoom} : ${item.alt[language]}`}
                  >
                    <ApprovedImage asset={item} language={language} />
                    <span className="gallery-plus">
                      <Plus size={18} />
                    </span>
                    <span className="gallery-caption">
                      {item.alt[language]}
                    </span>
                  </button>
                  <figcaption>
                    <MediaCredit asset={item} label={t.mediaSource} />
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <Instagram size={32} />
              <div>
                <h3>{t.galleryWaiting}</h3>
                <p>{t.mediaWaiting}</p>
              </div>
              <a
                className="button"
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.moreInstagram}
                <ArrowUpRight size={18} />
              </a>
            </div>
          )}
          <div className="official-posts">
            {officialPosts.map((post) => (
              <a
                href={post.url}
                key={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{post.type[language]}</span>
                <strong>{post.label[language]}</strong>
                <ArrowUpRight size={20} />
              </a>
            ))}
          </div>
        </section>
        <section className="story">
          <div className="container">
            <span className="eyebrow">{t.storyLabel}</span>
            <div className="city-story">
              <div>
                <h2>
                  {t.brussels}
                  <span>BE</span>
                </h2>
                <p>{t.origin}</p>
                <a
                  href={site.brusselsInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @thefoodspotbrussels <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="journey" aria-hidden="true">
                <span />✳<span />
              </div>
              <div>
                <h2>
                  {t.tangier}
                  <span>MA</span>
                </h2>
                <p>{t.destination}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section container location" id="localisation">
          <div>
            <span className="eyebrow muted">{t.locationLabel}</span>
            <h2>{t.locationTitle}</h2>
            <div className="contact-detail">
              <MapPin />
              <div>
                <small>{t.address}</small>
                <p>
                  <bdi>{site.address}</bdi>
                </p>
                <p className="muted">{t.landmark}</p>
              </div>
            </div>
            <div className="contact-detail">
              <Clock3 />
              <div>
                <small>{t.hours}</small>
                <p>
                  {t.open} <bdi>· {site.hours}</bdi>
                </p>
              </div>
            </div>
            <div className="location-actions">
              <OrderLink>{t.whatsapp}</OrderLink>
              <a className="text-link" href={site.telephone}>
                <Phone size={17} />
                {t.call}
              </a>
            </div>
            <p className="contact-note">{t.contactNote}</p>
          </div>
          <div className="map-art">
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />
            <div className="map-pin">
              <MapPin size={32} />
              <Brand language={language} />
            </div>
            <div className="map-card">
              <strong>THE FOOD SPOT TANGER</strong>
              <p>
                <bdi>{site.address}</bdi>
              </p>
              <a
                className="button"
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.maps}
                <ArrowUpRight size={18} />
              </a>
              <small>{t.mapNote}</small>
            </div>
          </div>
        </section>
        <section className="social-section" id="contact">
          <div className="container social-inner">
            <div>
              <span className="eyebrow">@THEFOODSPOTTANGER</span>
              <h2>{t.socialTitle}</h2>
              <p>{t.socialText}</p>
              <a
                className="button dark"
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
                {t.follow}
                <ArrowUpRight size={20} />
              </a>
            </div>
            <div className="social-reference">
              {social ? (
                <>
                  <ApprovedImage asset={social} language={language} />
                  <MediaCredit asset={social} label={t.mediaSource} />
                </>
              ) : (
                <>
                  <Instagram size={42} />
                  <strong dir="ltr">@thefoodspottanger</strong>
                  <p>{t.socialReference}</p>
                  <a
                    className="text-link"
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.follow}
                    <ArrowUpRight size={18} />
                  </a>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-top">
          <div>
            <a href="#accueil" aria-label={site.name}>
              <Brand language={language} />
            </a>
            <p>{t.footerText}</p>
          </div>
          <nav aria-label={t.nav[5]}>
            {ids.map((id, i) => (
              <a key={id} href={`#${id}`}>
                {t.nav[i]}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <a href={site.telephone} dir="ltr">
              {site.phone}
            </a>
            <a href={site.maps} target="_blank" rel="noopener noreferrer">
              <bdi>{site.address}</bdi>
            </a>
            <span>
              {t.open} · <bdi>{site.hours}</bdi>
            </span>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} The Food Spot Tanger. {t.rights}
          </span>
          <div>
            <button onClick={() => setLegal("legal")}>{t.legal}</button>
            <button onClick={() => setLegal("privacy")}>{t.privacy}</button>
          </div>
          <LanguageSwitcher language={language} change={changeLanguage} t={t} />
          <a href="#accueil" aria-label={t.top}>
            <ArrowUp size={20} />
          </a>
        </div>
        <div className="demo-label">{t.demo}</div>
      </footer>
      <dialog
        ref={dialog}
        className={activeImage !== null ? "lightbox" : "legal-dialog"}
        aria-label={legal ? t[legal] : t.nav[3]}
        onCancel={closeModal}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            const controls = e.currentTarget.querySelectorAll<HTMLElement>(
              'button:not(:disabled), a[href], [tabindex="0"]',
            );
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
          if (activeImage !== null && e.key === "ArrowRight") shiftImage(1);
          if (activeImage !== null && e.key === "ArrowLeft") shiftImage(-1);
        }}
      >
        <button
          autoFocus
          className="dialog-close icon-button"
          onClick={closeModal}
          aria-label={t.close}
        >
          <X />
        </button>
        {activeImage !== null && (
          <>
            <ApprovedImage asset={gallery[activeImage]} language={language} />
            <MediaCredit asset={gallery[activeImage]} label={t.mediaSource} />
            <div className="lightbox-controls">
              <button
                className="icon-button"
                onClick={() => shiftImage(-1)}
                aria-label={t.previous}
              >
                <ChevronLeft />
              </button>
              <p>
                {gallery[activeImage].alt[language]}
                <small>
                  {activeImage + 1} / {gallery.length}
                </small>
              </p>
              <button
                className="icon-button"
                onClick={() => shiftImage(1)}
                aria-label={t.next}
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
        {legal && (
          <>
            <h2>{t[legal]}</h2>
            <p>{legal === "legal" ? t.legalText : t.privacyText}</p>
          </>
        )}
      </dialog>
    </>
  );
}
