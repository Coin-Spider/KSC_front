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
        },essay:{
            essayId:0,
            essayTittle:"",
            onTime: 0,
            typeId: 0,
            typeContent: "",
            userId: 0,
            nickName: "",
            userHead: "",
            coverPath:"",
        },
        essayList:[
        ]
    },
    mutations:{
        setUser(state,user){
            state.user.userId=user.userId;
            state.user.email=user.email;
            state.user.nickName=user.nickName;
            state.user.role=user.role;
            state.user.onDate=user.onDate;
            state.user.picUrl="http://1.14.204.162/img"+user.picUrl;
            localStorage.setItem("_u_id",user.userId);
            localStorage.setItem("_token",user.token);
        },addEssay(state,essayList){
            state.essayList=essayList
            let ip="http://1.14.204.162/img"
            for (let i=0;i<essayList.length;i++){
                state.essayList[i].coverPath=ip+state.essayList[i].coverPath
                state.essayList[i].userHead=ip+state.essayList[i].userHead
            }
            console.log(state.essayList)
        },
    }
})
export default store