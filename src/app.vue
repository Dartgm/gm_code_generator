<template>
  <main class="app-container">
    <section>
      <router-link to="/">首页</router-link>
      <router-link to="/help">帮助</router-link>
    </section>
    <section>
      <router-view />
    </section>
  </main>
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  setup(){
    return {

    }
  }
})
</script>