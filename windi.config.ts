import { defineConfig } from "windicss/helpers";
import { toRGB } from "windicss/utils";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#59B4CE",
          "100": "#F2F9FC",
          "200": "#D3FDFD",
          "300": "#65CEEB",
          "400": "#5FC2DE",
          "500": "#59B4CE",
          "600": "#59B4CE",
          "700": "#29535E",
          "800": "#29535E",
          "900": "#29535E",
        },
        secondary: {
          default: "#B5EEFF",
          light: "#EDFBFF",
          darker: "#A3D6E6",
          dark: "#88B2BF",
        },
      },
      fontFamily: {
        sans: [
          "Segoe UI",
          "Meiryo",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        display: [
          "Segoe UI",
          "Meiryo",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        body: [
          "Segoe UI",
          "Meiryo",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [
    require("windicss/plugin/forms"),
    require("@windicss/plugin-animations")({
      settings: {
        animatedSpeed: 500,
        animationDelaySpeed: 1000,
      },
    }),
  ],
});
