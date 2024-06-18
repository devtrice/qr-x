import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import type { PluginAPI } from 'tailwindcss/types/config'

const zIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    zIndex: zIndexes.reduce((z, n) => ({ ...z, [n * 5]: n * 5 }), {}),
    extend: {
      colors: {
        white: '#F2F2F2',
        grey: {
          dark: '#353535',
          DEFAULT: '#94A3B8',
        },
        black: '#161618',
        transparent: 'transparent',
      },
      fontFamily: {
        mono: ['var(--font-mono)', ...fontFamily.mono],
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
      },
      animation: {
        in: 'enter var(--animate-duration) var(--animate-easing) var(--animate-delay) both',
        out: 'leave var(--animate-duration) var(--animate-easing) var(--animate-delay) both',
      },
      backgroundImage: {
        primary: 'linear-gradient(to right bottom, #64B2FF, #8E84FF, #D499ED)',
        secondary: 'linear-gradient(to right bottom, #FFFAD1, #FABFB2, #F47B8F)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-radix')(),
    ({ theme, addUtilities, matchUtilities }: PluginAPI) => {
      addUtilities({ '.flex-center': { 'align-items': 'center', 'justify-content': 'center' } })

      /* Animation */
      matchUtilities({ 'animate-x': value => ({ '--animate-x': value }) }, { values: theme('translate') })
      matchUtilities({ 'animate-y': value => ({ '--animate-y': value }) }, { values: theme('translate') })
      matchUtilities(
        { 'animate-scale': value => ({ '--animate-scale-x': value, '--animate-scale-y': value }) },
        { values: theme('scale') },
      )
      matchUtilities({ 'animate-scale-x': value => ({ '--animate-scale-x': value }) }, { values: theme('scale') })
      matchUtilities({ 'animate-scale-y': value => ({ '--animate-scale-y': value }) }, { values: theme('scale') })
      matchUtilities({ 'animate-opacity': value => ({ '--animate-opacity': value }) }, { values: theme('opacity') })
      matchUtilities({ 'animate-ease': value => ({ '--animate-easing': value }) }, { values: theme('transitionTimingFunction') })
      matchUtilities({ 'animate-delay': value => ({ '--animate-delay': value }) }, { values: theme('transitionDelay') })
      matchUtilities({ 'animate-duration': value => ({ '--animate-duration': value }) }, { values: theme('transitionDuration') })
    },
  ],
}
export default config
