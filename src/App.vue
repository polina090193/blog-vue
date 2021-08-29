<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <v-btn to="/archive" text>
          Archive posts
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
  import HelloWorld from './components/HelloWorld';

  export default {
    name: 'App',

    components: {
      
    },

    data: () => ({
      //
    }),
  };
</script>