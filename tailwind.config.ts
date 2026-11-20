import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        vintage: {
          parchment: "#FAF5E9",
          cream: "#F4ECD8",
          sand: "#E8DEC5",
          leather: "#6B4423",
          mahogany: "#2C1810",
          deepMahogany: "#1A0F0A",
          gold: "#C59B27",
          antiqueGold: "#E0B33A",
          brass: "#D4AF37",
          amber: "#FFB03B",
          cobblestone: "#2B2D30",
          darkCobble: "#1C1D1F",
          gaslight: "#FFAA33",
          emerald: "#1B4332",
          burgundy: "#5E1914",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Segoe UI", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gaslight: "0 0 25px 5px rgba(255, 170, 51, 0.25)",
        brass: "0 4px 15px -2px rgba(197, 155, 39, 0.4)",
        vintageCard: "0 10px 30px -5px rgba(28, 15, 10, 0.15)",
      },
      backgroundImage: {
        "cobblestone-pattern": "radial-gradient(#3e2316 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
