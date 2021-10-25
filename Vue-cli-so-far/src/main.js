import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import i18n from "./i18n"; // .use(i18n) // currently not a priority
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "material-icons/iconfont/material-icons.css";
import "bootstrap-icons/font/bootstrap-icons";

createApp(App).use(store).use(router).mount("#app");
