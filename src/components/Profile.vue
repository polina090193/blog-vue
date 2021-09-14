<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Profile <strong>{{ currentUser.username }}</strong>
      </h3>
    </header>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role, index) in currentUser.roles" :key="index">
        {{ role == "ROLE_USER" ? "Default User" : "Admin" }}
      </li>
    </ul>
    <v-btn class="logout" small color="error" @click.prevent="logOut"> Logout </v-btn>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>

<style>
.container {
  max-width: 750px;
  margin: auto;
  margin-top: 100px;
}

.jumbotron {
  margin-bottom: 20px;
}

.logout {
  margin-top: 20px;
}
</style>