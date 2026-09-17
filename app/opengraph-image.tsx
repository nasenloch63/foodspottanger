import { ImageResponse } from "next/og";
export const alt = "The Food Spot Tanger — Le goût qui rassemble.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#151614",
        color: "#f6f3e9",
        width: "100%",
        height: "100%",
        padding: "70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 26, letterSpacing: 6 }}>
        THE FOOD SPOT · TANGER
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 95,
          fontWeight: 800,
          lineHeight: 1.05,
        }}
      >
        <span>Le goût qui</span>
        <span style={{ color: "#ffd340" }}>rassemble.</span>
      </div>
      <div style={{ fontSize: 25 }}>
        BRUXELLES → TANGER · 100% HALAL · 12:00 – 05:00
      </div>
    </div>,
    size,
  );
}
