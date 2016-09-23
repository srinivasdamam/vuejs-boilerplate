<template>
  <div id="app">
    <navbar></navbar>
      <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue';
import Foot from './components/layout/Foot.vue';

export default {
  components: {
    Navbar,
    Foot
  }
}
</script>

<style>
@import "../node_modules/bulma/css/bulma.css";

html {
  background: white;
}
.container {
  padding-top: 25px;
}
</style>
