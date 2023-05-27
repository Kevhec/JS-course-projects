/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      minWidth: {
        '1.5': '1.5rem'
      }
    }
  },
  plugins: []
}
