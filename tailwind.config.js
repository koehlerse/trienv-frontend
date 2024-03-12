/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'default': ['Montserrat', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        "trienv-shade": {
          50: "#f7f7f7",
          100: "#ededed",
          200: "#d9d9d9",
          300: "#c8c8c8",
          400: "#adadad",
          500: "#999999",
          600: "#888888",
          700: "#7b7b7b",
          800: "#676767",
          900: "#545454",
          950: "#363636",
        },
        "trienv-light-blue": {
          50: "#eefffd",
          100: "#c5fffc",
          200: "#8bfffb",
          300: "#51fff9",
          400: "#14eded",
          500: "#00cfd1",
          600: "#00a2a8",
          700: "#007f85",
          800: "#05656a",
          900: "#0a5357",
          950: "#002f35",
        },
        "trienv-blue": {
          50: "#eafffe",
          100: "#cafffd",
          200: "#9cfffe",
          300: "#57feff",
          400: "#0cf2ff",
          500: "#00d5ea",
          600: "#00a8c4",
          700: "#008aa3",
          800: "#0b6a7f",
          900: "#0e586b",
          950: "#023a4a",
        },
      },
    },
  },
  plugins: [],
};
