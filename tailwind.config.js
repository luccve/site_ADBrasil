/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "wiggle": "wiggle 300ms ease-in-out ",
        'stagger': "stagger 500ms ease-in-out",
        'stagger-menu': "stagger_menu 500ms ease-in-out",
      },
      keyframes: {
        wiggle:{
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%,75%": { transform: "rotate(3deg)" },
          "50%": { transform: "rotate(-5deg)" },
         
        },
        stagger:{

          "0%": { transform: "scale(0.6) translateY(-8px)", opacity: "0" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        stagger_menu:{

          "0%": { transform: "scale(0.6) translateY(-200px)", opacity: "0" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        show_card:{
          "0%": { transform: "scale(0.6) translateY(-200px)", opacity: "0" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        }
      }
    },
    colors: {
      blue_l: "#CDDEE9",
      blue: "#06617C",
      turquoise: "#006666",
      green: "#006F35",
      green_m: "#005529",
      green_d: "#003C1D",
      gray: "#6E867D",
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  plugins: [],
};
