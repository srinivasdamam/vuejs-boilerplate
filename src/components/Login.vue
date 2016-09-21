<template lang="html">
  <h1>Login</h1>
  <form v-on:submit.prevent="submit">
    <label><input type="email" name="email" v-model="email" placeholder="Email"></label>
    <label><input type="password" name="password" v-model="password" placeholder="Password"></label>
    <button type="submit" name="button">Sign Up</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    submit() {
      if (this.email !== '') {
        this.$http.post('http://localhost:8090/api/login', {
          email: this.email,
          password: this.password
        }).then(response => {
          console.log(response.token)
        })
        this.email = ''
      } else {
        console.log('Please write a title')
      }
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
