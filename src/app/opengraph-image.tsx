import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt =
  "BURGERISTA — Wir leben Burger. Unabhängiges Redesign-Konzept.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 70,
        background: "#f9cf35",
        color: "#24271f",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 35 }}>
        BURGERISTA · REDESIGN CONCEPT
      </div>
      <div style={{ fontSize: 105, fontWeight: 900, lineHeight: 1 }}>
        WIR LEBEN
      </div>
      <div
        style={{
          fontSize: 135,
          fontWeight: 900,
          color: "#f7f5ed",
          lineHeight: 1,
        }}
      >
        BURGER.
      </div>
      <div style={{ fontSize: 20, marginTop: 35 }}>
        BURGER LOVE. AUSTRIAN SOUL.
      </div>
    </div>,
    size,
  );
}
