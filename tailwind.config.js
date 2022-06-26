module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 1s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [require('flowbite/src/plugin')],
  // content: ['node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
};
