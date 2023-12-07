/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        typing: 'typing 10s infinite steps(62)',
      },
      keyframes: {
        typing: {
          '0%': {
            width: '0',
          },
          '80%': {
            width: '62ch',
          },
          '100%': {
            width: '62ch',
          },
        },
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [],
  
}

