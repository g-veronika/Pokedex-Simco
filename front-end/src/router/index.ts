import { createRouter, createWebHistory } from "vue-router";

import PokedexView from "@/views/PokedexView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "pokedex",
      component: PokedexView,
    }
  ],
});

export default router;
