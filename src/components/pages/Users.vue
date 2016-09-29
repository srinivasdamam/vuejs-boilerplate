<template lang="html">
  <h2 class="title is-2">Users</h2>
  <hr>
  <table class="table is-striped">
  <thead>
    <tr>
      <th>Email</th>
      <th>ID</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody v-for="user in users.data" transition="expand">
    <tr>
      <td>{{ user.email }}</td>
      <td>{{ user.id }}</td>
      <td>
        <a v-on:click="remove(user.id)">
          <i class="fa fa-trash"></i>
        </a>
      </td>
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
      this.$set('users', response.data)
    })
  },
  attached () {},
  methods: {
    remove (id) {
      this.$http.delete('http://localhost:8090/api/users/' + id).then(response => {
        if (response.status == 200) {
           location.reload(true);
        }
      })
    },
  },
  components: {}
}
</script>

<style lang="css">
</style>
