/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        red: "#D04848",
        orange: "#F3B95F",
        yellow: "#FDE767",
        blue: "#6895D2",
      },
      fontFamily: {
        sans: ["source-code-pro", "monospace"],
        serif: ["Merriweather", "serif"],
      },

      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
