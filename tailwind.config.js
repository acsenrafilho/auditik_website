/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'auditik-blue': '#2269a8',
        'auditik-yellow': '#f6c954',
        'auditik-dark-blue': '#1a5488',
        'bg-cream': '#fffcf0',
        'bg-light-blue': '#f4f9ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft': '0 20px 50px rgba(34, 105, 168, 0.05)',
        'layered': '0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 20px 40px -10px rgba(34, 105, 168, 0.08)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
