import { createPinia } from "pinia";

const store = createPinia();

export default function setupStore(app) {
  app.use(store);
}

export { store };
