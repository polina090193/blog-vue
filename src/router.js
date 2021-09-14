import Vue from "vue";
import Router from "vue-router";
import Login from './components/Login.vue';
import Register from './components/Register.vue';

Vue.use(Router);

export const router = new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      alias: "/archive",
      name: "archive",
      component: () => import("./components/Archive")
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
      component: () => import('./components/Profile.vue')
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/archive', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/archive');
  } else {
    next();
  }
});

export default router;