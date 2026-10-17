module.exports = {
  content: ['./index.html', './main.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2F3E27',
        'primary-container': '#3d5033',
        'on-primary': '#ffffff',
        secondary: '#6F7B58',
        'secondary-container': '#e4ecdb',
        'on-secondary': '#ffffff',
        tertiary: '#A2B984',
        'tertiary-container': '#c9dbb5',
        'on-tertiary': '#1a2a10',
        'neutral-bg': '#F7F5ED',
        surface: '#F7F5ED',
        background: '#F7F5ED',
        'surface-card': '#FFFFFF',
        'surface-container': '#F2EFE6',
        'surface-container-low': '#FAF8F2',
        'surface-container-high': '#EAE6DB',
        outline: '#788171',
        'outline-variant': '#D0D7C6',
        'on-surface': '#23281E',
        'on-surface-variant': '#4F5948',
        'secondary-fixed': '#DCE5D1',
        'on-secondary-fixed': '#1B2412'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      },
      spacing: {
        'space-xl': '2.75rem',
        margin: '1.25rem',
        'space-lg': '1.75rem',
        'space-md': '1rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem'
      },
      fontFamily: {
        'display-mobile': ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif'],
        'headline-md': ['Playfair Display', 'serif'],
        'headline-lg': ['Playfair Display', 'serif'],
        'body-lg': ['Montserrat', 'sans-serif'],
        'label-md': ['Montserrat', 'sans-serif'],
        'headline-lg-mobile': ['Playfair Display', 'serif'],
        'body-md': ['Montserrat', 'sans-serif'],
        'label-lg': ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
