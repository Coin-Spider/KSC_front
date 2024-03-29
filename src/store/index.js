import Vuex from 'vuex'
import {createApp} from "vue";

const app=createApp({})
app.use(Vuex)
const store=new Vuex.Store({
    state:{
        user: {
            userId: 0,
            nickName: "",
            email: "",
            role: "",
            onDate: "",
            picUrl:"",
        },
    },
    mutations:{
        setUser(state,user){
            state.user.userId=user.userId;
            state.user.email=user.email;
            state.user.nickName=user.nickName;
            state.user.role=user.role;
            state.user.onDate=user.onDate;
            state.user.picUrl="http://127.0.0.1:"+user.picUrl;
            localStorage.setItem("_u_id",user.userId);
            localStorage.setItem("_token",user.token);
        },
    }
})
export default store