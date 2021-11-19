module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    rotate: {
      '270': '270deg',
    }
  },
  variants: {
    extend: {
      scale: ['hover'],
      rotate: ['active'],
    },
  },
  plugins: [],
}
