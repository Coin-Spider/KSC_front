import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from "vue-axios";
import axios from "axios";
import store from "@/store/index.js";
import router from "@/router/index.js"

axios.defaults.baseURL ='http://127.0.0.1:8080'
axios.defaults.headers.common['Token'] = localStorage.getItem("_token");


const app=createApp(App);
app.use(VueAxios,axios).use(store).use(router).mount('#app')
