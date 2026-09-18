import Image from "next/image";
import manifest from "@/data/media-manifest.json";
import { fr } from "@/locales/fr";
import { ary } from "@/locales/ary";

export function BrandArtwork({ language }: { language: "fr" | "ary" }) {
  const t = language === "fr" ? fr : ary;
  const art = manifest.generated.find(
    (asset) => asset.id === "orange-burger-art-v1",
  );
  if (!art || art.approvalStatus !== "approved") return null;
  return (
    <figure className="brand-artwork">
      <div className="artwork-kicker" aria-hidden="true">
        <span>THE FOOD SPOT</span>
        <span>TANGER, MA</span>
      </div>
      <Image
        data-media-id={art.id}
        src={art.url}
        width={art.width}
        height={art.height}
        alt={t.artworkAlt}
        sizes="(max-width: 850px) 92vw, (max-width: 1920px) 48vw, 880px"
        loading="eager"
        fetchPriority="high"
        unoptimized
      />
      <figcaption>{t.artworkCaption}</figcaption>
      <div className="artwork-stamp" aria-hidden="true">
        <span>THE LATE</span>
        <strong>NIGHT</strong>
        <span>SPOT / 05:00</span>
      </div>
    </figure>
  );
}
