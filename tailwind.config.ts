import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // এটুকু ensure কর যেন সব ফাইল covered হয়
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)", // ✅ এইটা লাগবেই
        ring: "var(--ring)", // ✅ যেহেতু outline-ring/50 ইউজ করছিস
        background: "var(--background)",
        foreground: "var(--foreground)",
        // চাইলে আরও color add করতে পারিস globals.css থেকে
      },
    },
  },
  plugins: [],
};

export default config;
