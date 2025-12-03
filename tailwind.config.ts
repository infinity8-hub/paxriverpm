import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3183B7',
          lightBlue: '#3183B7',
          darkBlue: '#005D8F',
          blackTitle: '#011825',
          lightBlack: '#000532',
          accent: '#f43f5e',
          background: '#f9fafb',
          button: '#3b82f6',
          dark: '#1e40af',
        }
      }
    },
  },
  plugins: [],
}

export default config;
