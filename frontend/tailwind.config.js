/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        sky: {
          950: '#080f1e',
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        "pulse-soft": "pulseSoft 2.5s ease-in-out infinite",
        "cloud-drift-1": "cloudDrift 55s linear infinite",
        "cloud-drift-2": "cloudDrift 70s linear infinite",
        "cloud-drift-3": "cloudDrift 90s linear infinite",
        "float": "float 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "rain-fall": "rainFall 1.2s linear infinite",
        "aurora-move": "auroraMove 8s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(-5px) rotate(-1deg)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(14,165,233,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(14,165,233,0.6), 0 0 60px rgba(99,102,241,0.3)" },
        },
        shimmer: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(255,200,50,0.5))" },
          "50%": { filter: "drop-shadow(0 0 22px rgba(255,200,50,0.9)) drop-shadow(0 0 40px rgba(255,150,0,0.4))" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.1", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.3)" },
        },
        auroraMove: {
          "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: "0.4" },
          "33%": { transform: "translate(30px,-20px) scale(1.1)", opacity: "0.6" },
          "66%": { transform: "translate(-20px,15px) scale(0.95)", opacity: "0.35" },
        },
        cloudDrift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(100vw + 500px))" },
        },
        rainFall: {
          "0%": { transform: "translateY(-10px) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) translateX(20px)", opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
