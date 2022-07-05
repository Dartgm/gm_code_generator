import app from './app.vue'
import {createApp} from "vue";
import router from "./router";
import './theme/index.scss'
createApp(app).use(router).mount('#app')