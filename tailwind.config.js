/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     colors: {
      red_1: '#FF1313',
      green_1: '#36BE57',
      green_2: '#10C12C',
      green_3:'#067521',
      blue_1: '#0150B2',
      blue_light: '#CAE9FB',
      white_blue: '#FBFBFB'

     },
     dropShadow: {
       shadow: '-3px -3px 2px #030303',
       shadow_2: ' -4px 2px 2px #8F8F8F',
     }
    },
  },
  plugins: [],
};
