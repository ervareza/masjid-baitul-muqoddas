import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marble: "#F1F4F9",
        domeBlue: "#29384A",
        panelDark: "#222525",
        goldAccent: "#DDB677",
        navyText: "#1E2842",
      },
    },
  },
  plugins: [],
} satisfies Config;
