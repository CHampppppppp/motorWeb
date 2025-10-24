/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card-bg)",
        line: "var(--line)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
        brand: "var(--brand)",
        accent: "var(--accent)",
        tran1: "var(--tran1)",
        tran2: "var(--tran2)",
      },
      keyframes: {
        'bike-move': {
          '0%': { transform: 'translateX(0%)' },
          '50%':{ transform: 'translateX(100%)'},
          '100%': { transform: 'translateX(-800%)' },
        },
        'press-bounce': {
          '0%': { transform: 'translateY(0)' },
          '35%': { transform: 'translateY(4px)' },
          '85%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'bike-move': 'bike-move 3.0s ease-in-out',
        'press-bounce': 'press-bounce 1s ease-in-out',
      },
    },
  },
  plugins: [],
}