export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        thertiary: 'var(--color-thertiary)',
        icons_primary: 'var(--color-icons-primary)',
        body_color: 'var(--color-body)' 


      },
      fontFamily: {
        sans: ['var(--font-family-sans)'],
      }
    },
  },
  plugins: [],
}

