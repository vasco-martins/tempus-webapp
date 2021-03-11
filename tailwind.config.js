const purgeEnabled = process.env.NODE_ENV === "production"

console.log("\n")
console.log(`   TailwindCSS \n`)
console.log(`   ----------- \n`)
console.log(`   ✅ purgeEnabled=${purgeEnabled}\n`)

module.exports = {
  purge: {
    enabled: purgeEnabled,
    content: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.jsx"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '(screen-20)': 'calc(100vh - 5rem)'
      },
      colors: {
        'primary': '#2958E5',
        'primary-hover': '#224BC5',
        'primary-disabled': '#95A9E4',
        'secondary': '#A5B5E5',
        'secondary-hover': '#94A2CD',
        'success': '#6FCF97',
        'success-hover': '#51A775',
        'success-disabled': '#AAEDC6',
        'sidebar': '#F5F5F5'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}
