import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      "dark": {
        extend: "dark",
        colors: {
          background: "#121212",  // Dark gray for the background
          foreground: "#E4E4E7",  // Light gray for the main text
          primary: {
            50: "#1E1E1E",
            100: "#2C2C2E",
            200: "#3A3A3C",
            300: "#48484A",
            400: "#636366",
            500: "#8E8E93",
            600: "#AEAEB2",
            700: "#C7C7CC",
            800: "#D1D1D6",
            900: "#E5E5EA",
            DEFAULT: "#8E8E93",
            foreground: "#E4E4E7",
          },
          focus: "#3A3A3C",  // Darker gray focus color
        },
        layout: {
          disabledOpacity: "0.4",
          radius: {
            small: "4px",
            medium: "8px",
            large: "12px",
          },
          borderWidth: {
            small: "1px",
            medium: "1.5px",
            large: "2px",
          },
        },
      },
      "light": {
        extend: "light",
        colors: {
          background: "#F5F5F7",  // Soft, light gray background
          foreground: "#1C1C1E",  // Almost black for text
          primary: {
            50: "#E5E5EA",
            100: "#D1D1D6",
            200: "#C7C7CC",
            300: "#AEAEB2",
            400: "#8E8E93",
            500: "#636366",
            600: "#48484A",
            700: "#3A3A3C",
            800: "#2C2C2E",
            900: "#1E1E1E",
            DEFAULT: "#636366",
            foreground: "#1C1C1E",
          },
          focus: "#636366",  // Dark gray accent for focus
        },
        layout: {
          disabledOpacity: "0.5",
          radius: {
            small: "4px",
            medium: "8px",
            large: "12px",
          },
          borderWidth: {
            small: "1px",
            medium: "1.5px",
            large: "2px",
          },
        },
      },
    },
  }),],
};
export default config;
