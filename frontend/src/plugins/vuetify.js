import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FFB82F",
        secondary: "#92B6D8",
        accent: "#8c9eff",
        error: "#b71c1c",
        brown: "#4A3E33",
        deepblue: "#28363F",
        blue: "#92B6D8"
      },
    },
    opthions: {
      customProperties: true,
    },
  },
});
