import { createRouter, createWebHistory } from "vue-router";

import PokedexView from "@/views/PokedexView.vue"
import ConnectionView from "@/views/ConnectionView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "pokedex",
      component: PokedexView,
    },
    {
      path: "/connection",
      name: "connection",
      component: ConnectionView,
    }
  ],
});

export default router;
