<script>
import axios from "axios";
import {useStore} from "vuex";
import router from "@/router/index.js";
import {useRouter} from "vue-router";
import {ref} from 'vue'

export default {
  methods: {
    useRouter, useStore,

  },
  data() {
    return {
      widowsInf: {
        height: "",
        width: "",
      },
      reviewContent:""
    }
  },
  setup() {
    const reviewList = {
      reviewId: 0,
      reviewChi: [],
      reviewContent: "",
      userHead: "",
      userNickName: "",
      essayId: "",
      onTime: "",
      reviewToId: "",
      reviewToNickName: ""
    }
    const essayPage = {
      essayText: "",
      like: 0,
      colltions: 0,
      onTime: "",
      headPath: "",
      nickName: "",
      userId: 0,
      followers: 0,
      reviewList: [],
    }
    const isLoading = ref(true)
    const isFollowed = ref(false)
    const isLiked = ref(false)
    const isCollected=ref(false)
    // for (let i=0;i<essayPage.reviewList.length;i++){
    //   if (essayPage.reviewList[i].reviewId===1){
    //     essayPage.reviewList[i].reviewChi.push()
    //   }
    // }
    const store = useStore()
    const router = useRouter()
    // const isLoading=true
    const follow = function (beFollowedId) {
      axios.get('/User/follow?userId=' + store.state.user.userId + '&beFollowedId=' + beFollowedId).then((response) => {
        if (response.data.messageCode === '1' || response.data.messageCode === '200') {
          essayPage.followers += 1
          isFollowed.value = true
          console.log(essayPage.followers)
        }
      }).catch(

      )
    }
    const delFollow = function (beFollowedId) {
      axios.get('/User/delFollow?userId=' + store.state.user.userId + '&beFollowedId=' + beFollowedId).then((response) => {
        if (response.data.messageCode === '1' || response.data.messageCode === '200') {
          essayPage.followers -= 1
          isFollowed.value = false
        }
      }).catch(

      )
    }
    const like = function () {
      axios.get('/Essay/like?userId=' + store.state.user.userId + '&essayId=' + router.currentRoute.value.params.essayId).then((response) => {
        if (response.data.messageCode === '1' || response.data.messageCode === '200') {
          essayPage.like += 1
          isLiked.value = true
        }
      }).catch(

      )
    }
    const unLike = function () {
      axios.get('/Essay/unLike?userId=' + store.state.user.userId + '&essayId=' + router.currentRoute.value.params.essayId).then((response) => {
        if (response.data.messageCode === '1' || response.data.messageCode === '200') {
          essayPage.like -= 1
          isLiked.value = false
        }
      }).catch(

      )
    }
    const collection=function (){
      axios.get('/Essay/collection?userId=' + store.state.user.userId + '&essayId=' + router.currentRoute.value.params.essayId).then((response) => {
        if (response.data.messageCode === '1' || response.data.messageCode === '200') {
          essayPage.colltions += 1
          isCollected.value=true
        }
      }).catch(

      )
    }
    const unCollection=function (){
      axios.get('/Essay/unCollection?userId=' + store.state.user.userId + '&essayId=' + router.currentRoute.value.params.essayId).then((response) => {
        if (response.data.messageCode === '1' || response.data.messageCode === '200') {
          essayPage.colltions -= 1
          isCollected.value=false
        }
      }).catch(

      )
    }
    //评论
    const replyEssay=function (reviewContent){
      axios.post('/Review/ReplyEssay?reviewContent='+reviewContent+'&essayId='+router.currentRoute.value.params.essayId+'&reviewUser='+store.state.user.userId).then((reponse)=>{
        if (reponse.data.messageCode==='1' || reponse.data.messageCode === '200'){
         console.log(reponse.data.body)
         essayPage.reviewList.push(reponse.data.body)
        }
      }).catch((e)=>{

      })
    }
    const load = async function () {
      // useRouter().currentRoute.value.params.essayId
      axios.get('/Essay/EssayPage/' +router.currentRoute.value.params.essayId+ '?userId=' + useStore().state.user.userId)
          .then((reponse) => {
            if (reponse.data.messageCode === '1' || reponse.data.messageCode === '200') {
              console.log(reponse.data)
              // 修改数据
              essayPage.essayText = reponse.data.body.essayText
              essayPage.like = reponse.data.body.like
              essayPage.headPath = reponse.data.body.headPath
              essayPage.userId = reponse.data.body.userId
              essayPage.nickName = reponse.data.body.nickName
              essayPage.colltions = reponse.data.body.colltions
              essayPage.followers = reponse.data.body.followers
              essayPage.onTime = reponse.data.body.onTime
              essayPage.reviewList = reponse.data.body.reviewList
              if (reponse.data.body.isFollowed > 0) {
                isFollowed.value = true;
              }
              if (reponse.data.body.isLiked > 0) {
                isLiked.value = true;
              }
              if (reponse.data.body.isCollected > 0) {
                isCollected.value = true;
              }
              //修改loading数据
              isLoading.value = false;
            } else {
              console.log('error')
            }
          })
    }
    load()
    return {
      essayPage,
      isLoading,
      reviewList,
      follow,
      delFollow,
      isFollowed,
      isLiked,
      like,
      unLike,
      isCollected,
      collection,
      unCollection,
      replyEssay,
    }
  }, mounted() {
    const that = this;
    that.widowsInf.height = window.screen.availHeight + 'px';
    that.widowsInf.width = window.innerWidth + 'px';
    console.log(that.widowsInf.width)
    console.log(that.widowsInf.height)

  },

}
</script>

<template>
  <div :style="widowsInf">
    <div v-if="isLoading" style="margin-top:5px;display: flex;flex-direction: column; width: 100%;height: 100%">
      <div style="align-self: center;margin-top: 20%">
        isLoading
      </div>
    </div>
    <div v-else style="margin-top:5px;display: flex;flex-direction: column; width: 100%;height: 100%">
      <div id="mainEssay" style="border-radius:5px;align-self:center;width:70%;height: auto;margin-left: 8%">
        <!--        <v-md-editor v-model="text" height="auto"></v-md-editor>-->
        <v-md-preview :text="essayPage.essayText"></v-md-preview>
      </div>
      <div style="display: flex;flex-direction: row;margin-left: 19.5%;margin-top: 10px">
        <img :src="essayPage.headPath" style="width: 50px;height: 50px">
        <div style="margin-left: 12px;margin-top: 7px">
          <div style="font-weight: bold">
            {{ essayPage.nickName }}
          </div>
          <div style="font-weight: lighter;font-size: 14px">
            {{ essayPage.followers }}&nbsp;Fellows
          </div>
        </div>
        <button v-if="isFollowed"
                style="background-color: #FF5733;margin-top:5px;margin-left: 5%; width: 80px;border: none;border-radius: 20px;height: 40px"
                @click="delFollow(essayPage.userId)">
          取消关注
        </button>
        <button v-else style="margin-top:5px;margin-left: 5%; width: 80px;border: none;border-radius: 20px;height: 40px"
                @click="follow(essayPage.userId)">
          关注
        </button>
        <button v-if="isLiked"
                style="background-color: #FF5733;margin-top:5px;margin-left: 50%; width: 80px;border: none;border-radius: 20px;height: 40px"
                @click="unLike()">
          {{ essayPage.like }}&nbsp;取消点赞
        </button>

        <button v-else
                style="margin-top:5px;margin-left: 50%; width: 80px;border: none;border-radius: 20px;height: 40px"
                @click="like()">
          {{ essayPage.like }}&nbsp;点赞
        </button>

        <button v-if="isCollected"
                style="background-color: #FF5733;margin-top:5px;margin-left: 1%; width: 80px;border: none;border-radius: 20px;height: 40px"
                @click="unCollection">
          {{ essayPage.colltions }}&nbsp;取消收藏
        </button>

        <button v-else
                style="margin-top:5px;margin-left: 1%; width: 80px;border: none;border-radius: 20px;height: 40px"
                @click="collection">
          {{ essayPage.colltions }}&nbsp;收藏
        </button>
      </div>
      <div
          style="padding:5px;border-radius:10px;display:flex;flex-direction:column;width:70%;margin-top:20px;margin-left:19.5%;box-shadow: 0 0 1px 1px rgb(0,0,0,0.25)">
        <div style="display: flex;flex-direction: row;background-color: white; width: 100%;">
          <div style="margin-left:5px;margin-top:5px;font-size: 18px;font-weight: bolder">
            评论
          </div>
          <div style="width: 90%;display: flex;flex-direction: row">
            <input v-model="reviewContent" placeholder="请输入评论" style="font-size:15px;padding-top:2px;padding-bottom:0;padding-left:10px;margin-top:5px;margin-left:50%;width: 60%;height: 100%;border-radius: 20px;border: none;box-shadow: 0 0 1px 1px rgb(0,0,0,0.55)">
            <button style="font-weight: bold;color:white;font-size:16px;margin-left:10px;width: 12%;height:100%;border-radius: 20px;margin-top: 5px;border: none;background-color: #FF5733" @click="replyEssay(reviewContent)">
              发&nbsp;送
            </button>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;margin-left: 8px;margin-top: 15px;padding-bottom: 5px">
          <div v-for="review in essayPage.reviewList" :key="review">
            <div style="margin-top:10px;display:flex; flex-direction: row">
              <img :src="review.userHead" style="width: 40px;height: 40px">
              <div style="display: flex;flex-direction: column">
                <div style="display:flex;flex-direction: row">
                  <div style="margin-top:7px;margin-left: 5px;font-weight: bold;font-size: 15px">
                    {{ review.userNickName }}&nbsp;&nbsp;:
                  </div>
                  <div style="margin-top: 7px;margin-left: 2px;font-size: 14px">
                    {{ review.reviewContent }}
                  </div>
                </div>
                <div style="margin-left:10px;display:flex; flex-direction: row">
                  <div style="font-size: 13px; font-weight: lighter; color: rgba(0,0,0,0.83)">
                    {{ review.onTime.split("T")[0] }}
                  </div>
                  <button style="margin-left:15px;border:none;background-color: rgba(0,0,0,0)">
                    回复
                  </button>
                </div>
              </div>
            </div>
            <div v-for="reviewChi in review.reviewChi" :key="reviewChi"
                 style="margin-top:5px;display:flex; flex-direction: row;margin-left: 50px">
              <img :src="reviewChi.userHead" style="width: 40px;height: 40px">

              <div style="display: flex;flex-direction: column">
                <div style="display: flex;flex-direction: row">
                  <div
                      style="display:flex;flex-direction:row;margin-top:7px;margin-left: 5px;font-weight: bold;font-size: 15px">
                    {{ reviewChi.userNickName }}&nbsp;&nbsp;
                    <div style="font-weight: bolder;color: #FF5733">
                      to
                    </div>
                    &nbsp;&nbsp;{{ reviewChi.reviewToNickName }}:
                  </div>
                  <div style="margin-top: 7px;margin-left: 2px;font-size: 14px">
                    {{ reviewChi.reviewContent }}
                  </div>
                </div>
                <div style="margin-left:10px;display:flex; flex-direction: row">
                  <div style="font-size: 13px; font-weight: lighter; color: rgba(0,0,0,0.83)">
                    {{ reviewChi.onTime.split("T")[0] }}
                  </div>
                  <button style="margin-left:15px;border:none;background-color: rgba(0,0,0,0)">
                    回复
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="min-height: 50px"></div>
    </div>
  </div>
</template>
<style>
.why-enter-from,
.why-leave-to {
  opacity: 0;
}

.why-enter-to,
.why-leave-from {
  opacity: 1;
}

.why-enter-active {
  transition: opacity 1.5s ease;
}
::placeholder{
  color:rgb(0,0,0,0.50) ;
  font-size: 15px;
}
input:focus{
  outline: none;
  border: none;
}
</style>