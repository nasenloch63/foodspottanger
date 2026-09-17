"use client";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import type { Dictionary } from "@/locales/fr";
import { mediaFor } from "@/data/media";
import { ApprovedImage } from "./approved-image";
export function Brand({ language }: { language: "fr" | "ary" }) {
  const logo = mediaFor("logo")[0];
  if (logo)
    return (
      <span className="official-brand">
        <ApprovedImage asset={logo} language={language} />
        {logo.attributionRequired && <small>{logo.attributionText}</small>}
      </span>
    );
  return (
    <span className="brand" dir="ltr">
      <span>THE FOOD</span>
      <span>SPOT</span>
      <small>TANGER</small>
    </span>
  );
}
export function OrderLink({
  children,
  secondary = false,
}: {
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      className={`button ${secondary ? "secondary" : ""}`}
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} />
      {children}
      <ArrowUpRight size={18} className="arrow" />
    </a>
  );
}
export function LanguageSwitcher({
  language,
  change,
  t,
}: {
  language: "fr" | "ary";
  change: (language: "fr" | "ary") => void;
  t: Dictionary;
}) {
  return (
    <div className="language" aria-label={t.language} role="group" dir="ltr">
      <button aria-pressed={language === "fr"} onClick={() => change("fr")}>
        FR
      </button>
      <button
        aria-pressed={language === "ary"}
        onClick={() => change("ary")}
        lang="ar-MA"
      >
        العربية <span>/ Darija</span>
      </button>
    </div>
  );
}
