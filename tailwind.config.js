/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scale: {
          "0%": { transform: "scale(3)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        scale: "scale 1s ease-in-out",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
        chillax: ["Chillax", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      width: {
        xl: "305px",
      },
      height: {
        xl: "405px",
      },
      maxWidth: {
        "12xl": "1200px",
      },
      colors: {
        gray: {
          light: "#E5E5E5",
          DEFAULT: "#C3C3C3",
          dark: "#7E7E7E",
        },
        black: "#1D1D1D",
        white: "#FFFFFF",
        green: "#2D5C43",
        purple: "#393158",
        ocean: "#2A5259",
        olive: "#706947",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "52px",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        13: "3.25rem",
      },
    },
  },
  plugins: [],
};
