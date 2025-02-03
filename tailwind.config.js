const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/app.vue',
    './src/error.vue',
  ],
  theme: {
    screens: {
      xxs: '450px',
      xs: '576px',
      sm: '640px',
      md: '768px',
      lg: '895px',
      xl: '1024px',
      '2xl': '1280px',
      '3xl': '1320px',
    },
    extend: {
      colors: {
        cwhite: '#fff',
        cblack: '#1D1D1D',
        clight: '#EEF2F6',
        cblue: '#1a7fdb',
        cgreen: '#3BC349',
        cyellow: '#FFD700',
        cred: '#FF060F',
      },
    },
  },

  plugins: [iconsPlugin({ collections: getIconCollections(['ep']) })],
}
