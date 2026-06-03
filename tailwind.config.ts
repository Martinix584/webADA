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
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        primary: "hsl(var(--accent))",
        "primary-hover": "hsl(var(--accent-hover))",
        success: "hsl(var(--success))",
        "success-hover": "hsl(var(--success-hover))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
      },
      textColor: {
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
      },
      backgroundColor: {
        secondary: "var(--bg-secondary)",
        header: "var(--bg-header)",
        "glass-bg": "var(--glass-bg)",
        card: "var(--card-bg)",
      },
      borderColor: {
        DEFAULT: "var(--border-color)",
        strong: "var(--border-color-strong)",
        glass: "var(--glass-border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-outfit)", "Outfit", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
