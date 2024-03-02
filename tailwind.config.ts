import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        courseblack: "#110B17",
        eduOrange: "#FFA500",
        coursepurle: {
          200: "#D9CBF5",
          300: "#C1A7F5",
          400: "#AC9CEB",
          500: "#7E02E0",
          900: "#5F29BA",
        },
        coursepink: "#F57A91",
        courseblue: "#73CAF7",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-1": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-2": "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-3": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-4": "pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-5": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn500ms: "fadeIn 500ms ease-in-out",
        fadeIn: "fadeIn 1s ease-in-out",
        fadeInDelay: "fadeIn 1s ease-in-out 0.5s",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

      },
    },
    fontFamily: {
      manrope: ["Manrope", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
