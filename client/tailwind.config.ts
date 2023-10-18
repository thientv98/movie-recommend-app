import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "black-lighten": "#161616",
        primary: "#5179ff",
        // primary: "#bd0000",
        // primary: "#186db6",
        "gray-lighten": "#989898",
        "gray-darken": "#3a3939",
        dark: "#1C1C1E",
        "dark-darken": "#19191b",
        "dark-lighten": "#333335",
        "dark-lighten-2": "#49494b",
      },
      fontFamily: {
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        sm: "repeat(auto-fill, minmax(130px, 1fr))",
        lg: "repeat(auto-fill, minmax(160px, 1fr))",
      },
    },
  },
  plugins: [],
}
export default config
