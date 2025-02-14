/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}",
           "components/**/*.{ts,tsx}",
            "./src/**/*.{html,ts}",
            "*.{js,ts,jsx,tsx,mdx}",
            "./node_modules/flowbite/**/*.js"
          ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}
