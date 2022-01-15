import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/test-api",
    name: "Test API",
    component: () => import("../views/TestApi.vue"),
  },
  {
    path: "/test-sort",
    name: "Test Sorting",
    component: () => import("../views/TestSort.vue"),
  },
  {
    path: "/test-lists",
    name: "Test Lists",
    component: () => import("../views/TestLists.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
