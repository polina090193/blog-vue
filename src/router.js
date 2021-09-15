import Vue from "vue";
import Router from "vue-router";
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      alias: "/archive",
      name: "archive",
      component: () => import("./components/Archive")
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: "/posts/:slug",
      name: "post-details",
      component: () => import("./components/Post")
    },
    {
      path: "/posts/:slug/edit",
      name: "post-edit",
      component: () => import("./components/EditPost")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddPost")
    }
  ]
});