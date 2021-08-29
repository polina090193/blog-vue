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
      path: "/posts/:id",
      name: "post-details",
      component: () => import("./components/Post")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddPost")
    }
  ]
});
