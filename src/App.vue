<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <nav class="menu">
      <router-link to="/" class="menu-item">Main Page</router-link>
      <router-link to="/posts" class="menu-item">Archive Posts</router-link>
      <router-link to="/add" class="menu-item">Add Post</router-link>
    </nav>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
