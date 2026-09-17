import manifest from "./media-manifest.json";
export type MediaSlot = "logo" | "hero" | "menu" | "gallery" | "social";
export type MediaAsset = {
  id: string;
  url: string;
  sourceUrl: string;
  postUrl: string | null;
  platform: string;
  approvalStatus: string;
  permissionNote: string;
  businessAssociation: string;
  attributionRequired: boolean;
  attributionText: string;
  width: number;
  height: number;
  mayCrop: boolean;
  mayEdit: boolean;
  intendedComponents: string[];
  alt: { fr: string; ary: string };
};
// Only the importer writes publishable assets. prebuild validates originals and approvals.
const assets: MediaAsset[] = manifest.assets;
export const approvedMedia = assets.filter(
  (asset) =>
    asset.approvalStatus === "approved" &&
    asset.permissionNote &&
    asset.businessAssociation &&
    asset.url.startsWith("/images/approved/"),
);
export const mediaFor = (slot: MediaSlot) =>
  approvedMedia.filter((asset) => asset.intendedComponents.includes(slot));
export const mediaById = (id: string | null, slot: MediaSlot) =>
  mediaFor(slot).find((asset) => asset.id === id);
