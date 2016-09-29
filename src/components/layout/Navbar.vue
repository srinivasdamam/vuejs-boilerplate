<template lang="html">
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item is-brand" href="#">
        <img src="../../assets/logo.png" alt="Vue Logo">
      </a>
    </div>

    <div class="nav-center">
      <a class="nav-item" href="https://github.com/patrickbolle/vuejs-starter-kit">
        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>
    </div>

    <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <div class="nav-right nav-menu">
      <a class="nav-item" href="/">
        Home
      </a>
      <a class="nav-item" v-if="!$auth.check()" v-link="'/login'">
        Login
      </a>
      <a class="nav-item" v-if="!$auth.check()" v-link="'/register'">
        Register
      </a>
      <a v-if="$auth.check()" v-link="'/users'" class="nav-item">
        Users
      </a>
      <a class="nav-item" href="#" >
        {{ $auth.user().email }}
      </a>
      <a v-if="$auth.check()" v-on:click="$auth.logout()" class="nav-item" href="#">
        Logout
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
        context: 'account context'
    };
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
