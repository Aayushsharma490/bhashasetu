/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#1E3A8A',
          blue: '#2563EB',
          dark: '#0F172A',
          teal: '#0D9488',
          emerald: '#059669',
          amber: '#D97706',
          surface: '#FFFFFF',
          slate: '#F8FAFC',
          muted: '#475569',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
        olchiki: ['Noto Sans Ol Chiki', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      }
    },
  },
  plugins: [],
}
