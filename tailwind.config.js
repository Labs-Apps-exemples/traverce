// eslint-disable-next-line
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    ...defaultTheme,
    fontFamily: {
      sans: [
        'Silka',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
    },
    extend: {
      rotate: {
        '360': '360deg',
      },
      colors: {
        blue: {
          '50': '#F2F2FC',
          '100': '#E6E6F9',
          '200': '#BFC0EF',
          '300': '#999AE5',
          '400': '#4D4ED2',
          '500': '#0002BF',
          '600': '#0002AC',
          '700': '#000173',
          '800': '#000156',
          '900': '#000139',
        },
      }
    }
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.underline-under': {
          textUnderlinePosition: 'under',
        },
      });
    },
  ],
};
