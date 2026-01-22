/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/client/**/*.{js,jsx,ts,tsx,html}",
    "./src/client/index.html",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          750: "#1f2937",
          850: "#1a1f2e",
        },
      },
    },
  },
  plugins: [],
};
