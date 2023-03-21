import { createApp } from "vue";
import App from "./App.vue";
import setupStore from "/@/store";
import { setupRouter } from "./router";
import "/@/style/index.scss";

const app = createApp(App);

setupStore(app);
// app.use(router)
setupRouter(app);
app.mount("#app");
