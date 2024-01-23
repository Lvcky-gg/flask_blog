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
        black: "#001b2e",
        lightBlue: "#537692",
        slate: "#b3cde4",
        blue: "#1d3f58",
        white: "#eef3f9",
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
