<template>
  <div id="app">
    <router-view/>
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

</style>
