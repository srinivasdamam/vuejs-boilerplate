<template lang="html">
  <h1 class="title is-1">Register An Account</h1>
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
