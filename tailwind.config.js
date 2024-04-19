/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./safelist.txt"],
  theme: {
    fontSize: {
      xs: ["0.5rem", { lineHeight: "normal" }],
      sm: ["0.6rem", { lineHeight: "normal" }],
      base: ["1rem", { lineHeight: "normal" }],
      lg: ["1.25rem", { lineHeight: "normal" }],
      xl: ["1.5rem", { lineHeight: "normal" }],
    },
    extend: {},
  },
  plugins: [],
};
