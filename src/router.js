import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/archive",
      name: "archive",
      component: () => import("./components/Archive")
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