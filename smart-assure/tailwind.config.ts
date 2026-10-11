import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // SmartCare Assure palette — straight from the blueprint
        "deep-purple": "#2E1A5E",
        "royal-purple": "#4B2A8C",
        violet: "#7A3FD1",
        "sun-yellow": "#FFD23F",
        lilac: "#F1EAFB",
        "lilac-2": "#E6DCF7",
        surface: "#FBFAFE",
        ink: "#1F1636",
        muted: "#5B556E",
        border: "#D9CDEE",
        pass: "#1E8E3E",
        stop: "#B3261E",
        attention: "#F28C28",
        water: "#3D8FDC",
        // dark mode
        "dark-bg": "#1B0F3B",
        "dark-card": "#2E1A5E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        sheet: "28px",
      },
      fontSize: {
        "screen-title": ["24px", { lineHeight: "1.2", fontWeight: "800" }],
        "card-title": ["17px", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["15px", { lineHeight: "1.5" }],
        caption: ["13px", { lineHeight: "1.4" }],
        tag: ["11px", { lineHeight: "1.2", letterSpacing: "1px" }],
        hero: ["36px", { lineHeight: "1.1", fontWeight: "800" }],
      },
    },
  },
  plugins: [],
};

export default config;
