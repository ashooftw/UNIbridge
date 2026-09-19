import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card-bg)",
          foreground: "var(--card-fg)",
        },
        primary: {
          DEFAULT: "var(--primary-accent)",
          foreground: "var(--primary-fg)",
        },
        muted: {
          DEFAULT: "var(--muted-bg)",
          foreground: "var(--muted-fg)",
        },
        border: "var(--border-color)",
        ring: "var(--ring-color)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
