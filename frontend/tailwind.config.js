/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d6a4f',
        secondary: '#52b788',
        accent: '#ffb703',
        dark: '#1b4332'
      }
    },
  },
  plugins: [],
}