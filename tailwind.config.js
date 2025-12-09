/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                blob: "blob 7s infinite",
                slideDown: "slideDown 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
                fadeIn: "fadeIn 0.2s ease-out",
                slideUp: "slideUp 0.3s ease-out forwards",
                slideInRight: "slideInRight 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                slideInLeft: "slideInLeft 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                floatRotate: "floatRotate 3s ease-in-out infinite",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                slideDown: {
                    "from": { transform: "translate(-50%, -20px)", opacity: "0" },
                    "to": { transform: "translate(-50%, 0)", opacity: "1" },
                },
                fadeIn: {
                    "from": { opacity: "0" },
                    "to": { opacity: "1" },
                },
                slideUp: {
                    "from": { transform: "translateY(20px)", opacity: "0" },
                    "to": { transform: "translateY(0)", opacity: "1" },
                },
                slideInRight: {
                    "from": { transform: "translateX(20px)", opacity: "0" },
                    "to": { transform: "translateX(0)", opacity: "1" },
                },
                slideInLeft: {
                    "from": { transform: "translateX(-20px)", opacity: "0" },
                    "to": { transform: "translateX(0)", opacity: "1" },
                },
                floatRotate: {
                    "0%": { transform: "translateY(0) perspective(500px) rotateX(0deg)" },
                    "50%": { transform: "translateY(-3px) perspective(500px) rotateX(10deg)" },
                    "100%": { transform: "translateY(0) perspective(500px) rotateX(0deg)" },
                },
            },
        },
    },
    plugins: [],
}
