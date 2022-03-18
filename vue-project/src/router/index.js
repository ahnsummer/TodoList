import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/index.vue";
import Todos from "../pages/todos/index.vue";
import Memo from "../pages/memo.vue";
import Todo from "../pages/todos/_id.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todos",
    name: "Todos",
    component: Todos,
  },
  {
    path: "/memo",
    name: "Memo",
    component: Memo,
  },
  {
    path: "/todos/:id",
    name: "Todo",
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
