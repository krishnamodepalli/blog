import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        backg: "var(--primary-bg)",
        tp: "var(--primary-text)",
        ts: "var(--secondary-text)",
        dim: "var(--dim-text)",

        skyblue: "var(--skyblue)",
      },
    },
  },
  plugins: [],
};
export default config;
