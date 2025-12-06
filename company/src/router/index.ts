import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Home from "@/page/site/index.vue"

const routes = [
  { path: "/", name: "home", component: Home },

  {
    path: "/site",
    name: "site",
    component: () => import("@/page/site/index.vue"),
  },

  {
    path: "/report",
    name: "report",
    component: () => import("@/page/report/index.vue"),
  },
];

const router = createRouter({
  // history: createMemoryHistory(),
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
});
export default router;
