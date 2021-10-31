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
  {
    path: "/pquiz",
    name: "PersonalityQuiz",
    component: () => import("../views/PersonalityQuiz.vue"),
  },
  {
    path: "/report",
    name: "PersonalityResults",
    component: () => import("../views/PersonalityResults.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
