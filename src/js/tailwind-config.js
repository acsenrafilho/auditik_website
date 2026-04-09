// Tailwind custom configuration for Auditik

tailwind.config = {
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
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '3rem',
            }
        }
    }
};
