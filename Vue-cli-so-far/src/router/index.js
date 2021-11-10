import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  {
    path: "/authenticated",
    name: "LoggedIn",
    component: () => import("../views/LoggedIn.vue"),
  },
  {
    path: "/character",
    name: "Character",
    component: () => import("../views/Character.vue"),
  },
  {
    path: "/main",
    name: "MainPage",
    component: () => import("../views/MainPage.vue"),
  },
  // planning to use this current file path and file for the career quiz, just need some renaming
  // {
  //   path: "/report",
  //   name: "PersonalityQuiz",
  //   component: () => import("../views/PersonalityQuiz.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
