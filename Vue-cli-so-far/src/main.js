import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import i18n from "./i18n"; // .use(i18n) // currently not a priority
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@fortawesome/fontawesome-free/js/all";
import 'animate.css';

createApp(App).use(store).use(router).mount("#app");
