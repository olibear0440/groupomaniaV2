import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Posts from "../views/Posts.vue";
import Mypost from "../views/Mypost.vue";
import ThisPost from "../views/ThisPost.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/Posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/Mypost",
    name: "Mypost",
    component: Mypost,
  },
  {
    path: "/Posts/:id",
    name: "ThisPost",
    component: ThisPost,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
