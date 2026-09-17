import Image from "next/image";
import type { MediaAsset } from "@/data/media";
export function ApprovedImage({
  asset,
  language = "fr",
  priority = false,
  className = "",
}: {
  asset: MediaAsset;
  language?: "fr" | "ary";
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      data-media-id={asset.id}
      src={asset.url}
      alt={asset.alt[language]}
      width={asset.width}
      height={asset.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      unoptimized={!asset.mayEdit}
      className={`approved-image ${className}`}
      sizes="(max-width:600px) 100vw, 50vw"
      style={{ objectFit: "contain" }}
    />
  );
}
export function MediaCredit({
  asset,
  label,
}: {
  asset: MediaAsset;
  label: string;
}) {
  const link = asset.postUrl ?? asset.sourceUrl;
  return (
    <span className="media-credit">
      {asset.attributionRequired && <span>{asset.attributionText}</span>}
      {link.startsWith("https://") && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {label} ↗
        </a>
      )}
    </span>
  );
}
