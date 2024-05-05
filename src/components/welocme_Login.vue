<template>
  <div id="b" class="All">
    <img src="./public/logo.png" alt="wording"
         style="width: 296px; height: 186px; margin-left: 625px; margin-top: 70px">
    <div style="font-size: 55px; font-weight: bold ; color: #FF5733; margin-left: 556px; margin-top: 20px">
      Welcome to KSC
    </div>
    <div style="margin-left: 740px; font-size: 25px; font-weight: bold; color: #FF5733; margin-top: 240px">
      log in
    </div>
    <button @click="ToLogIn"
            style="background-color: white; outline: none; border: none; display: flex; margin-left: 725px; ">
      <img alt="error" src="./public/箭头%201.png"
           style="width: 50px; margin-left: 30px; margin-top: 10px; overflow: auto">
    </button>
    <img src="./public/logo.png" alt="wording"
         style="width: 296px; height: 186px; margin-left: 625px; margin-top: 400px">
    <input class="login_Tab" v-model="$data.user.userName" placeholder="用户名">
    <input class="login_Tab" v-model="$data.user.passWord" style="margin-top: 25px" placeholder="密码">
    <div v-if="is_login_able"
         style="display:flex;flex-direction:row ;margin-left: 610px;font-weight: bolder;font-size: 20px;color: #FF4821FF;">
      <div style="margin-top: 15px">
        {{ login_error_message }}
      </div>
      <div style="margin-left: 5px;font-size: 25px;margin-top: 10px">
        !
      </div>
    </div>
    <button @click="Login($data.user)"
            style="width: 90px; height: 40px; margin-left: 725px; margin-top: 45px; border: none;border-radius: 25px; background-color: #FF5733;color: white; font-weight: bolder;font-size: 20px">
      确认
    </button>
    <div style="margin-left: 730px; font-size: 25px; font-weight: bold; color: #FF5733; margin-top: 120px">
      sign up
    </div>
    <button @click="ToSignUp"
            style="background-color: white; outline: none; border: none; display: flex; margin-left: 725px; ">
      <img alt="error" src="./public/箭头%201.png"
           style="width: 50px; margin-left: 30px; margin-top: 10px; overflow: auto">
    </button>
    <input class="login_Tab" placeholder="昵称" style="margin-top: 370px" v-model="$data.sign_up_user.nickName">
    <input class="login_Tab" placeholder="邮箱" style="margin-top: 25px" v-model="$data.sign_up_user.email">
    <input class="login_Tab" placeholder="用户名" style="margin-top: 25px" v-model="$data.sign_up_user.userName">
    <input class="login_Tab" placeholder="密码" style="margin-top: 25px" v-model="$data.sign_up_user.passWord">
    <input class="login_Tab" placeholder="请再次输入密码" style="margin-top: 25px"
           v-model="$data.sign_up_user.passwordAgain">
    <div v-if="is_sign_up_able"
         style="display:flex;flex-direction:row ;margin-left: 610px;font-weight: bolder;font-size: 20px;color: #FF4821FF;">
      <div style="margin-top: 15px">
        {{ sign_up_error_message }}
      </div>
      <div style="margin-left: 5px;font-size: 25px;margin-top: 10px">
        !
      </div>
    </div>
    <button
        style="width: 90px; height: 40px; margin-left: 725px; margin-top: 45px; border: none;border-radius: 25px; background-color: #FF5733;color: white; font-weight: bolder;font-size: 20px"
        @click="signup($data.sign_up_user)">
      确认
    </button>
  </div>
</template>
<style>
.All {
  overflow: auto;
  height: 2800px;
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
}

.login_Tab {
  display: flex;
  width: 320px;
  height: 42px;
  margin-left: 606px;
  border-radius: 10px;
  color: white;
  background-color: #FF5733;
  border: 0;
  margin-top: 55px;
  padding-left: 10px;
  font-size: 20px;
}

.login_Tab:focus {
  background-color: #FF5733;
  border: 0;
  outline: none;
}

::placeholder {
  color: rgba(255, 255, 255, 0.75);
  font-size: 20px;
}

button:focus {
  outline: none;
}
</style>

<script>
import axios from "axios";
import {useRoute, useRouter} from "vue-router";
import store from "@/store/index.js";
import router from "@/router/index.js";
import Router from "@/router/index.js";


export default {
  data() {
    return {
      // loading:this.setup().loading,
      is_login_able: false,
      login_error_message: "",
      sign_up_error_message: "",
      is_sign_up_able: false,
      sign_up_user: {
        nickName: "",
        userName: "",
        passWord: "",
        email: "",
        passwordAgain: ""
      },
      user: {
        userName: "",
        passWord: "",
      },
      responseMessage: {
        body: [],
        messageCode: "",
      }
    }

  },
  setup() {
    const router = useRouter()
    const router_to = (path) => {
      router.push(path)
    }
    const loadEssay=async function () {
      console.log("开始加载")
      const response = await axios.get('/Essay/Homing');
      if (response.data.messageCode === '200' || response.data.messageCode === '1') {
        store.commit('addEssay',response.data.body);
      }
      console.log("加载完成")
    }
    return {
      router_to,
      loadEssay
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    Login(user) {
      axios.post("/User/Login", user).then((response) => {
        if (response.data.messageCode === '200' || response.data.messageCode === '1') {
          this.$store.commit('setUser', response.data.body)
          window.location.reload()
          // this.router_to("/home")
        } else {
          this.is_login_able = true
          this.login_error_message = response.data.body
        }
      })
    }
    ,
    signup(sign_up_user) {
      axios.post("/User/Register", sign_up_user).then((response) => {
        if (response.data.messageCode === '200' || response.data.messageCode === '1') {
          this.$store.commit('setUser', response.data.body)
          this.router_to("/home")
        } else {
          this.is_sign_up_able = true
          this.sign_up_error_message = response.data.body
        }
      })
    }
    ,
    ToLogIn() {
      window.scroll({
        top: 1050,
        behavior: "smooth"
      })
    }
    ,
    ToSignUp() {
      window.scrollTo({
        top: 2000,
        behavior: "smooth"
      })
    }
    ,
  }
}
</script>