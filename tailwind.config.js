/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(0, 0%, 14.5%)',
        card: 'hsl(0, 0%, 100%)',
        'card-foreground': 'hsl(0, 0%, 14.5%)',
        popover: 'hsl(0, 0%, 100%)',
        'popover-foreground': 'hsl(0, 0%, 14.5%)',
        primary: '#123962',
        'primary-foreground': 'hsl(0, 0%, 98.5%)',
        secondary: '#2754ba',
        'secondary-foreground': 'hsl(0, 0%, 20.5%)',
        accent: '#00aee6',
        'accent-foreground': 'hsl(0, 0%, 20.5%)',
        muted: '#799eb2',
        'muted-foreground': 'hsl(0, 0%, 55.6%)',
        'supporting-light': '#b1d4e5',
        destructive: 'hsl(0, 84.2%, 60.2%)',
        border: 'hsl(0, 0%, 92.2%)',
        input: 'hsl(0, 0%, 92.2%)',
        ring: 'hsl(0, 0%, 70.8%)',
      },
      borderRadius: {
        DEFAULT: '0.625rem',
      },
    },
  },
  plugins: [],
}

