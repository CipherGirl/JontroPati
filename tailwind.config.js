module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fadeIn: 'fadeIn .3s ease',
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
};
