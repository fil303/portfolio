/* Tailwind theme — must load AFTER the Tailwind CDN script. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        // Used by text-mint / bg-mint / border-mint on the dark green panels.
        mint: '#7ce8ad',
        forest: {
          50:  '#effdf5',
          100: '#d7fbe6',
          200: '#b1f4ce',
          300: '#7ce8ad',
          400: '#40d384',
          500: '#18b866',
          600: '#0c9552',
          700: '#0a7644',
          800: '#0b5d39',
          900: '#0b3d2a',
          950: '#04250f',
        },
      },
    },
  },
};
