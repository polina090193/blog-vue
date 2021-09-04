<template>
  <v-app>
    <v-app-bar app dark>

      <v-btn to="/archive" text>
        All posts
      </v-btn>

      <v-btn to="/add" text>
        Add
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

    components: {

    },

    data: () => ({
      
    }),
  };
</script>