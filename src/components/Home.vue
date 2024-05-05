<script>
import store from "@/store/index.js";
import {Store, useStore} from "vuex";
import router from "@/router/index.js";
import {useRouter} from "vue-router";

export default {
  methods: {
    useStore,
    reload() {
      window.location.reload()
    },
    quitLogin(){
      localStorage.clear()
      this.router_to("/")
    },
  },
  data() {
    return {
      isdroped: false
    }
  },
  mounted() {

  },
  setup() {
    console.log(store.state.user.picUrl)
    const router = useRouter()
    const router_to = (path) => {
      console.log(router.currentRoute.value.path)
      if (router.currentRoute.value.path==='/home'){
        window.location.reload()
      }
      router.push(path)
    }
    return {
      router_to
    }
  }
}
</script>

<template>
  <div style="display: flex;flex-direction: column;background-color:white;padding-top: 65px">
    <div style="z-index:2;padding-left:10px;padding-top:0;border-bottom-left-radius: 10px;border-bottom-right-radius:10px;display: flex;flex-direction: row;height: 65px; background-color: white;position: fixed;
  top: 0;
  left: 0;
  width: 1512px;padding-right: 0">
      <button class="homing" @click="router_to('/home')">
        <img src="./public/小logo.png"
             style="height:30px;width: 30px;margin-bottom: 5px;margin-right: 0;margin-top: 8px"/>
      </button>
      <img src="./public/创作.png" style="height: 44px;margin-top: 9px;margin-right: 20px"/>
      <div style="display: flex;flex-direction: row;margin-top: 8px;margin-right: 20px">
        <div id="search_logo"
             style="padding-top:5px;background-color: rgb(234,234,234);border: none;height: 40px;width:35px;border-right: none;border-bottom-left-radius: 18px;border-top-left-radius: 18px;padding-left: 4px">
          <img src="./public/搜索.png" style="width: 25px;margin-top: 5px;margin-left: 8px">
        </div>
        <div>
          <input id="a_search" placeholder="搜索"
                 style="padding-left:5px;font-size:20px;font-weight:bolder;padding-top:2px;background-color: rgb(234,234,234);width: 1125px;height: 43px;border: none;border-left: none;border-bottom-right-radius: 18px;border-top-right-radius: 18px;">
        </div>
      </div>
      <img src="./public/消息.png" style="margin-right:20px;height: 44px;margin-top: 9px">
      <img src="./public/私聊.png" style="margin-right:20px;height: 44px;margin-top: 9px">
      <div>
        <div
             style="align-items: self-end;flex-direction:column;display:flex;padding:0;background-color: #FF5733;margin-top:9px;height:44px;width:44px;border: none;border-radius: 50px;margin-right: 0">
          <img @click="isdroped=!isdroped;" :src="useStore().state.user.picUrl" style="height: 44px; width: 44px;">
          <div v-if="isdroped" style="  box-shadow: 3px 3px 3px rgba(234,234,234,0.77);
display: flex;margin-right: -10px;background-color: white;flex-direction: column;min-width: 300px;border: none;border-radius: 10px;padding: 7px;margin-top: 5px;font-weight: bold">
            <div style="font-weight: lighter;font-size: 13px">
              目前登录账户
              <div class="se"
                  style="font-size:16px;margin-top:5px;padding:3px;flex-direction:row;display:flex;border: none;border-radius: 10px;font-weight: normal">
                <div>
                  <img :src="useStore().state.user.picUrl" style="width: 50px;height: 50px;border: none;border-radius: 50px;margin:12px">
                </div>
                <div style="display: flex;flex-direction: column">
                  <div>
                    昵称:&nbsp;{{useStore().state.user.nickName}}
                  </div>
                  <div>
                    权限:&nbsp;{{useStore().state.user.role}}
                  </div>
                  <div>
                    邮箱:&nbsp;{{useStore().state.user.email}}
                  </div>
                  <div>
                    已经入驻:&nbsp;{{ useStore().state.user.onDate.split("T")[0] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="se" style="margin-top:5px;">
              我的收藏
            </div>
            <div v-if="useStore().state.user.role==='上传者'||useStore().state.user.role==='管理员'" class="se" style="margin-top:5px;">
              已发布
            </div>
            <div v-if="useStore().state.user.role==='上传者'||useStore().state.user.role==='管理员'" class="se" style="margin-top:5px;">
              草稿箱
            </div>
            <div @click="quitLogin" class="se" style="margin-top:5px;">
              退出登录
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width:100%">
      <router-view style="width: 100%;z-index: 1"/>
    </div>
  </div>
</template>

<style scoped>
input:focus {
  outline: none;
  border: none;

}

input:checked {
  #search_logo {
    width: 0;
  }

  width: 1135px;
}

::placeholder {
  color: rgba(0, 0, 0, 0.50);
}



.homing {
  border: none;
  background-color: rgba(134, 134, 134, 0);
  height: 50px;
  width: 50px;
  border-radius: 50px;
  margin-bottom: 3px;
  margin-right: 22px;
  margin-top: 7px;
  transition: 0.3s;

}

.homing:hover {
  transition: 0.3s;
  background-color: rgb(220, 220, 220);
}
.se{
  transition: 0.3s;
  border-radius: 5px;
  padding: 3px;
  padding-left: 6px;
}
.se:hover{
  transition: 0.3s;
  background-color: rgb(220, 220, 220);
}

</style>