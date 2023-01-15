import { createRouter, createWebHistory } from "vue-router";

import PokedexView from "@/views/PokedexView.vue";
import ConnectionView from "@/views/ConnectionView.vue";
import PokemonView from "@/views/PokemonView.vue";
import MyTeamView from "@/views/MyTeamView.vue";




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
      path: "/pokemons/:id",
      name: "pokemon-view",
      component: PokemonView,
    },
    {
      path: "/team",
      name: "team",
      component: MyTeamView,
    }
  ],
});

export default router;
