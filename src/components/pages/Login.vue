<template lang="html">
  <h1 class="title is-1">Login</h1>
  <hr>
  <form v-on:submit.prevent="submit">
    <p class="control">
      <label class="label">Email</label>
      <input class="input" type="email" name="email" v-model="body.email" placeholder="Email">
    </p>
    <p class="control">
      <label class="label">Password</label>
        <input class="input" type="password" name="password" v-model="body.password" placeholder="Password">
      </label>
    </p>
    <button type="submit" class="button is-primary">Submit</button>
  </form>
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
  ready() {},
  attached() {},
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
