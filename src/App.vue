<template>
  <v-app>
    <v-app-bar app dark>

      <v-btn to="/archive" text>
        All posts
      </v-btn>

      <v-btn to="/add" text>
        Add
      </v-btn>

      <v-btn to="/login" text>
        Login
      </v-btn>

      <v-btn to="/register" text>
        Register
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
.text-editor {
  height: 200px;

  @media screen and (max-width: 575px) {
    height: 100px;
  }
}
</style>