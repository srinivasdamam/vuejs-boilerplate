<template>
  <div id="app">
    <navbar></navbar>
    <main>
      <router-view></router-view>
    </main>
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
main {
  width: 80%;
  margin: 0px auto;
}

footer {
  background: white !important;
}

.hero {
  width: 100% !important;
}

.full-width {
  width: 100vw !important;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
</style>
