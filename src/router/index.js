import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Posts from "../views/Posts.vue";
import Mypost from "../views/Mypost.vue";
import ThisPost from "../views/ThisPost.vue";
import Users from "../views/Users.vue";

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
    path: "/users",
    name: "users",
    component: Users,
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
