/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "Fira Mono", "Consolas", "Menlo", "monospace"]
    },
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.3)',
        glassDark: 'rgba(36,41,61,0.55)'
      },
    },
  },
  plugins: [],
}

