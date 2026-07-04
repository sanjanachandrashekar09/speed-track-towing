/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#DC2626",
        "primary-dark": "#991b1b",
        dark: "#0a0f1a",
        "dark-2": "#111827",
        steel: "#1e2937",
        background: "#F1F5F9",
        accent: "#F59E0B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        barlow: ["Barlow Condensed", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-fire': 'linear-gradient(135deg, #DC2626 0%, #F59E0B 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'phone-ring': 'phone-ring 3s ease-in-out infinite',
        'float': 'float-y 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
