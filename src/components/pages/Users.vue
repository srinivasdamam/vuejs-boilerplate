<template lang="html">
  <h2 class="title is-2">Users</h2>
  <hr>
  <table class="table is-striped">
  <thead>
    <tr>
      <th>Email</th>
      <th>ID</th>
    </tr>
  </thead>
  <tbody v-for="user in users.data" transition="expand">
    <tr>
      <td>{{ user.email }}</td>
      <td>{{ user.id }}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
export default {
  data () {
    return {
      users: []
    }
  },
  computed: {},
  ready () {
    this.$http.get('http://localhost:8090/api/users').then(response => {
      console.log(response.data);
       this.$set('users', response.data)
    })
  },
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
