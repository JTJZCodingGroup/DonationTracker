import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        growShrink: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        shooting: {
          '0%': { opacity: '1', transform: 'translateX(0) translateY(0)' },
          '100%': { opacity: '0', transform: 'translateX(100vw) translateY(50vh)' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        growShrink: 'growShrink 0.5s ease-in-out infinite',
        shooting: 'shooting 1s linear forwards',
      },
    },
  },
  plugins: [],
};

export default config;

