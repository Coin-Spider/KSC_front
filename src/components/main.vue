<template>
  <div id="main_V">
    <water-fall :width="this.windowWidth-20">
      <div v-for="essay in useStore().state.essayList" :key="essay" style="width: 235px">
        <div class="essayBox" style="width: 235px;height: auto;">
          <img :src="essay.coverPath" alt="cw" style="border-radius: 10px" @click="ToEssayPage(essay.essayId)"/>
          <div style="padding: 5px">
            <div style="font-size: 16px;font-weight: bolder">
              {{essay.essayTittle}}
            </div>
            <div style="display: flex;flex-direction: row;margin-top: 2px">
              <div style="margin-right: 5px;margin-left: 2px">
                <img :src="essay.userHead" style="border-radius: 50px;width: 32px;height: 32px;" alt="ww">
              </div>
              <div style="font-weight: initial;font-size: 14px;margin-top: 7px">
                {{ essay.nickName }}
              </div>
            </div>
            <div style="color: rgba(40,40,40,0.50);margin-top: 0px;font-weight: inherit;font-size: 14px;">
              {{essay.onTime.split("T")[0]}}.{{essay.typeContent}}
            </div>
          </div>
        </div>
      </div>
    </water-fall>
  </div>
</template>
<script>

import {defineComponent} from "vue";
import WaterFall from "@/components/WaterFall.vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import router from "@/router/index.js";

export default defineComponent({
  components: {WaterFall},
  data() {
    return {
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
    }
  },setup(){
    const ToEssayPage = function (essayId){
      // useRouter().push('/home/page/'+essayId)
      router.push('/home/page/'+essayId)
    }
    return{
      ToEssayPage
    }
  },
  methods: {
    useStore,

  },

})
</script>
<style>
.essayBox {
  display: flex;
  flex-direction: column;
  border-radius: 10px
}
.essayBox:hover{

}
</style>