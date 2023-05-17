import { createApp } from 'vue'
import App from './App.vue'
import setupStore from '/@/store'
import { setupRouter } from './router'
import '/@/style/index.scss'
import installElementIcon from './utils/install-element-icon'
import './style/tailwind.css'
const app = createApp(App)

installElementIcon(app)
setupStore(app)
setupRouter(app)
app.mount('#app')
