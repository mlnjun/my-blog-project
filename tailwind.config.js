/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#6C757D",
        n: {
          1: "#FFFFFF",
          2: "#F8F9FA",
          3: "#F1F3F5",
          4: "#E9ECEF",
          5: "#CED4DA",
          6: "#B0B3B8",
          7: "#6C757D",
          8: "#495057",
          9: "#343A40",
          10: "#000000",
        },
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
      fontFamily: {
        "noto-sans-kr": ["Noto Sans KR", "sans-serif"],
      },
      borderRadius: {
        "rounded-0": "0rem",
        "rounded-1": "0.1875rem",
        "rounded-2": "0.3125rem",
        "rounded-3": "0.46875rem",
        "rounded-4": "0.625rem",
        "rounded-5": "0.9375rem",
      },
      borderWidth: {
        0.25: "0.25px",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply max-w-[1080px] mx-auto px-[2rem] py-[4rem]": {},
        },
        ".h1": {
          "@apply font-semibold text-[2rem]": {},
        },
        ".h2": {
          "@apply font-semibold text-[1.75rem]": {},
        },
        ".h3": {
          "@apply font-semibold text-[1.5rem]": {},
        },
        ".h4": {
          "@apply font-semibold text-[1.25rem]": {},
        },
        ".h5": {
          "@apply font-semibold text-lg": {},
        },
        ".h6": {
          "@apply font-semibold text-[1rem]": {},
        },
        ".body-1": {
          "@apply font-normal text-base": {},
        },
        ".body-2": {
          "@apply font-normal text-sm": {},
        },
        ".body-3": {
          "@apply font-normal text-xs": {},
        },
      });
    }),
  ],
};
