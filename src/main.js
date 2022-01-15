import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/scss/style.scss";

const app = createApp(App);
app.use(store).use(router).mount("#app");
//createApp(App).use(store).use(router).mount("#app");
