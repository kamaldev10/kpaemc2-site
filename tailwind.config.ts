/** @type {import('tailwindcss').Config} */
import { type Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {},
  plugins: [lineClamp],
};
export default config;
