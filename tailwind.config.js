/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this matches your file structure
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px', // Extra small devices
        'sm': '640px', // Small devices
        'md': '768px', // Medium devices
        'lg': '1024px', // Large devices
        'xl': '1280px', // Extra large devices
      },
      spacing: {
        'mobile-p': '0.5rem', // Mobile padding
        'tablet-p': '1rem', // Tablet padding
      },
      fontSize: {
        'mobile': '0.875rem', // Mobile font size
        'base': '1rem', // Default base
      },
      maxWidth: {
        'mobile': '100%', // Full width on mobile
        'content': '640px', // Content width for larger screens
      },
    },
  },
  plugins: [],
};