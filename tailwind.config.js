/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        home: "show_card 1s ease-in-out",
        home1: "show_card_1 1s ease-in-out",
        home2: "show_card_2 1s ease-in-out",
        "fade-menu": "fade 300ms ease-in-out",
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 300ms ease-in-out ",
        stagger: "stagger 500ms ease-in-out",
        "stagger-menu": "stagger_menu 500ms ease-in-out",
      },
      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "25%": { opacity: 25 },
          "50%": { opacity: 50 },
          "75%": { opacity: 75 },
          "100%": { opacity: 100 },
        },

        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%,75%": { transform: "rotate(3deg)" },
          "50%": { transform: "rotate(-5deg)" },
        },
        stagger: {
          "0%": { transform: "scale(0.6) translateY(-8px)", opacity: "0" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        stagger_menu: {
          "0%": { transform: "scale(0.6) translateY(-200px)", opacity: "0" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        show_card: {
          "0%": { transform: "scale(0.6) translateY(-200px)", opacity: "0" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        show_card_1: {
          "0%": { transform: "scale(0.6) translateX(-200px)", opacity: "0" },
          "50%": { transform: "translateX(-100px)" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
        show_card_2: {
          "0%": { transform: "scale(0.6) translateX(-200px)", opacity: "0" },
          "50%": { transform: "translateX(100px)" },
          "100%": { transform: "scale(1) translateX(0px)", opacity: "1" },
        },
      },
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
      water_1: "#9C9C9C",
      water_2: "#FFFF73",
      water_3: "#FFAB00",
      water_4: "#4DE600",
      water_5: "#37A800",
      water_6: "#00C4FF",
      water_7: "#005CE6",
      water_8: "#8500A8",
    },
  },
  plugins: [],
};
