<template>
  <div id="app">
    <welocme_-login/>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import Welocme_Login from "@/components/welocme_Login.vue";

export default defineComponent({
  components: {Welocme_Login}
})
</script>
<style>
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
