import { createApp } from "vue";
import App from "./App.vue";
import setupStore from "/@/store";
import { setupRouter } from "./router";
import "/@/style/index.scss";
import installElementIcon from "./utils/installElementIcon";

const app = createApp(App);

installElementIcon(app);
setupStore(app);
// app.use(router)
setupRouter(app);
app.mount("#app");
