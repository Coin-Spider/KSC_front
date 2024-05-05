import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from "vue-axios";
import axios from "axios";
import store from "@/store/index.js";
import router from "@/router/index.js"
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
    Hljs: hljs,
});
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

// axios.defaults.baseURL ='http://1.14.204.162:8080'
axios.defaults.baseURL ='http://127.0.0.1:8080'
axios.defaults.headers.common['Token'] = localStorage.getItem("_token");


const app=createApp(App);
app.use(VueAxios,axios).use(store).use(VueMarkdownEditor).use(VMdPreview).use(router).mount('#app')
