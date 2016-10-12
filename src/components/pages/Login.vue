<template lang="html">
  <div class="container">
    <h1>Login</h1>
    <hr>
    <form v-on:submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" v-model="body.email" id="email" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" v-model="body.password" id="password" placeholder="******">
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      context: 'login context',
      body: {
        email: '',
        password: ''
      }
    };
  },
  computed: {},
  methods: {
    submit() {
      this.$auth.login({
          body: this.body,
          redirect: '/',
          success: function () {
             console.log(this.$auth.user());
           },
          error: function () { console.log("AUTH FAILURE BOOOOO"); },
          rememberMe: true,
      });
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
