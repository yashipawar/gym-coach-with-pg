// @type {import('tailwindcss').Config} 
import plugin from 'tailwindcss/plugin'
// const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        RedHat: ['"Red Hat Display"', 'sans-serif'],
        KS : ['"Kaushan Script"', 'cursive'],
      },
      fontSize: {
        biggest: '2rem',
        bigger: '1.5rem',
        big: '1.25rem',
        h1: '1.5rem',
        h2: '1.25rem',
        h3: '1rem',
        normal: '.938rem',
        small: '.813rem',
        smaller: '.75rem',
      },
      colors: {
        // Defining custom color palette
        'first-color': 'hsl(79, 72%, 55%)',
        'first-color-light': 'hsl(79, 97%, 77%)',
        'first-color-alt': 'hsl(79, 67%, 52%)',
        'first-color-dark': 'hsl(79, 63%, 50%)',
        'first-color-gray': 'hsl(79, 6%, 64%)',
        'title-color': 'hsl(180, 4%, 98%)',
        'title-color-black': 'hsl(180, 4%, 12%)',
        'text-color': 'hsl(180, 4%, 72%)',
        'text-color-light': 'hsl(180, 4%, 65%)',
        'body-color': 'hsl(180, 12%, 8%)',
      },
      letterSpacing: {
        wider: '1.5px', // Assuming a general case for letter-spacing
      },
      margin: {
        '5': '5rem', // Custom margin equivalent to --font-black (assuming it was meant for spacing)
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const colors = theme('colors'); // Get the theme colors
      const neonUtilities = {}; // Initialize an empty object for neon utilities

      // Iterate over each color in the theme
      for (const color in colors) {
        // Check if the color's value is an object (which means it has shades like '500', '700', etc.)
        if (typeof colors[color] === 'object') {
          const color1 = colors[color]['500']; // Lighter shade
          const color2 = colors[color]['700']; // Darker shade
          // Create a utility class for the neon effect
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 5px ${color1}, 0 0 20px ${color2}`
          };
        }
      }

      // Add the utilities to Tailwind
      addUtilities(neonUtilities, ['responsive', 'hover']);
    })
  ],
}
