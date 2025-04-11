import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import Home from "@/page/report/index.vue";

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
  history: createWebHashHistory(),
  routes,
});
export default router;
