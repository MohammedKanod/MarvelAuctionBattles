/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        comic: {
          dark: '#0e0e11',
          charcoal: '#17171c',
          panel: '#1f1f26',
          border: '#000000',
          red: '#d92525',
          'red-dark': '#9b111e',
          yellow: '#ffd100',
          'yellow-light': '#ffeb3b',
          blue: '#1a56db',
          gold: '#f59e0b',
          muted: '#8e8e9f',
        }
      },
      fontFamily: {
        comic: ['"Bangers"', '"Impact"', 'sans-serif'],
        heading: ['"Montserrat"', '"Arial Black"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      boxShadow: {
        'comic-sm': '2px 2px 0px 0px #000000',
        'comic': '4px 4px 0px 0px #000000',
        'comic-lg': '7px 7px 0px 0px #000000',
        'comic-xl': '10px 10px 0px 0px #000000',
        'comic-red': '4px 4px 0px 0px #d92525',
        'comic-yellow': '4px 4px 0px 0px #ffd100',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '6': '6px',
      },
      animation: {
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounceShort 0.5s ease-in-out',
        'pop-in': 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'shake': 'shake 0.4s ease-in-out',
        'glimmer': 'glimmer 2s infinite',
      },
      keyframes: {
        bounceShort: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-6px)' },
          '40%, 80%': { transform: 'translateX(6px)' },
        },
        glimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
