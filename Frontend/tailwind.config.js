/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/*.{html,js}","./public/js/*.js"],
  theme: {
    extend: {
      screens:{
        "mobile" : "470px",
      }
    },
  },
  plugins: [],
}

