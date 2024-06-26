import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"
import axios from "axios";
import store from "@/store/index.js";
import Main from "@/components/main.vue";
import {useStore} from "vuex";

const Home = () => import("@/components/Home.vue")
const welcome_Login = () => import("@/components/welocme_Login.vue");
const main=()=>import("@/components/main.vue")
const MainPage=()=>import("@/components/EssayPage.vue")
const routes = [
    {
        path: "/",
        name: "welcome",
        component: welcome_Login,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        children:[
            {
                path:"",
                name:"main",
                component:main
            },
            {
                path: 'page/:essayId',
                name: "essayPage",
                component:MainPage
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
const loadEssay=async function () {
    console.log("开始加载")
    const response = await axios.get('/Essay/Homing');
    if (response.data.messageCode === '200' || response.data.messageCode === '1') {
        store.commit('addEssay',response.data.body);
    }
    console.log("加载完成")
}
router.beforeEach(async (to, form) => {
    if (store.state.user.userId!==null&&store.state.user.userId!==0){
        return true
    }
    const _u_id = localStorage.getItem("_u_id");
    const _token = localStorage.getItem("_token");
    if ((_u_id !==null&&_u_id!=="") && (_token!==null&&_token!=="")) {
        console.log("本地有")
        const response = await axios.get(`/User/chToken?userId=${parseInt(_u_id)}`);
        if (response.data.messageCode === '200' || response.data.messageCode === '1') {
            console.log("检测通过")
            store.commit('setUser', response.data.body)
            console.log(localStorage.getItem('_token'))
            if (to.path === "/") {
                console.log("开始跳转到主页")
                await loadEssay()
                return {path: "/home"}
            }else if(to.path==="/home"){
                await loadEssay()
                return true;
            } else {
                console.log("通行")
                return true;
            }
        } else {
            console.log("检测未通过")
            if (to.path === "/") {
                console.log("这是登录页")
                return true
            } else {
                console.log("跳转到登录页")
                return {path:"/"}
            }
        }
    } else {
        console.log("没有")
        if (to.path === '/') {
            console.log("这是登录页")
            return true
        } else {
            console.log("跳转到登录页")
            return {path:"/"}
        }
    }
})

export default router
