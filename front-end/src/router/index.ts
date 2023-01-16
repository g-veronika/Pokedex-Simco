import { createRouter, createWebHistory } from "vue-router";

import PokedexView from "@/views/PokedexView.vue";
import ConnectionView from "@/views/ConnectionView.vue";
import MyTeamView from "@/views/MyTeamView.vue";
import ErrorView from "@/views/ErrorView.vue";

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
    },

    {
      path: "/team",
      name: "team",
      component: MyTeamView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: ErrorView,
    },
  ],
});

export default router;
