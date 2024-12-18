const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
      extend: {
        backgroundImage: {
          'radial-blue': 'radial-gradient(circle at bottom right, #061133, #253369)', 
        },
        fontFamily: {
          sans: ['CustomFont', ...defaultTheme.fontFamily.sans],
        },
        keyframes: {
          expand: {
            '0%': { transform: 'scale(0.95)', opacity: 0 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
          collapse: {
            '0%': { transform: 'scale(1)', opacity: 1 },
            '100%': { transform: 'scale(0.95)', opacity: 0 },
          },
            "caret-blink": {
            "0%,70%,100%": { opacity: "1" },
            "20%,50%": { opacity: "0" },
          },
        },
        animation: {
          expand: 'expand 0.5s ease-in-out forwards',
          collapse: 'collapse 0.5s ease-in-out forwards',
          "caret-blink": "caret-blink 1.25s ease-out infinite",
        },
      },
    },
    plugins: [],
  }