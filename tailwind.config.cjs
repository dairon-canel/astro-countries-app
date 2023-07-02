/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'elements-dark-blue': 'hsl(209, 23%, 22%)',
        'bg-very-dark-blue': 'hsl(207, 26%, 17%)',
        'text-very-dark-blue': 'hsl(200, 15%, 8%)',
        'input-dark-gray': 'hsl(0, 0%, 52%)',
        'bg-very-light-gray': 'hsl(0, 0%, 98%)',
        white: 'hsl(0, 0%, 100%)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
