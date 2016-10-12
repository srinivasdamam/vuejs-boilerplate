<template lang="html">
  <div class="container">
    <h1>Register An Account</h1>
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
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      body: {
        email: '',
        password: ''
      }
    };
  },
  computed: {},
  methods: {
    submit() {
      this.$auth.register({
        body: this.body,
        autoLogin: true,
        success: function () {
           console.log('success ' + this.context);
        },
        error: function (res) {
           console.log('error ' + this.context);
           this.error = res.data;
        }
       });
      // console.log("Attempt register");
      // if (this.email !== '') {
      //   this.$http.post('http://localhost:8090/api/register', {
      //     email: this.email,
      //     hash: this.password
      //   }).then(response => {
      //     console.log(response)
      //   })
      //   this.title = ''
      // } else {
      //   console.log('Please write an email')
      // }
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
