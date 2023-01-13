<template>
  <div class="min-h-screen">
    <Navbar />
    <div class="flex justify-center pt-16 gap-10 flex-wrap p-8">
      <div v-for="pokemon in pokemons" class="card">
        <div class="card-header flex justify-center items-center text-center pt-4 text-lg">
          {{ pokemon.name }}
        </div>
        <div class="card-body flex justify-center mt-[30px]">
          <img class="w-[200px]" :src="pokemon.img" :alt="pokemon.name" />
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-16 pb-8">
      <div
        class="cursor-pointer text-8xl"
        :class="previousPage === null ? 'text-stone-600 cursor-not-allowed' : 'text-orange-600'"
        @click="goPreviousPage()"
      >
        &#8592;
      </div>
      <div
        :class="nextPage === null ? 'text-stone-600 cursor-not-allowed' : 'text-orange-600'"
        class="cursor-pointer text-8xl"
        @click="goNextPage()"
      >
        &rarr;
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { ref, inject } from "vue";

const pokemons = ref([]);

const nextPage = ref(null);
const previousPage = ref(null);

const axios: any = inject("axios");

const showPokemonsURL = "https://pokedexbe-akd7k.dev.simco.io/pokedex/?limit=25";

const getList = async (url: string): void => {
  await axios.get(url).then((response: { data: any }) => {
    pokemons.value = response.data.results;
    nextPage.value = response.data.next;
    previousPage.value = response.data.previous;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  pokemons.value.forEach(async (pokemon) => {
    pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.ref_number}.png`;
  });
  console.log(pokemons.value);
};
getList(showPokemonsURL);

const goNextPage = () => {
  if (nextPage.value) {
    getList(nextPage.value);
  }
};
const goPreviousPage = () => {
  if (previousPage.value) {
    getList(previousPage.value);
  }
};
</script>

<style scoped lang="scss">
.card {
  background: rgb(251, 198, 63);
  background: radial-gradient(circle, rgba(251, 198, 63, 1) 0%, rgba(252, 143, 70, 1) 100%);
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  width: 250px;
  min-width: 250px;
  height: 360px;
  transition-duration: 0.8s;
  cursor: pointer;
  will-change: transform;

  &:hover {
    width: 280px;
    height: 390px;
    background-color: rgb(235, 233, 233);
    transform: rotate(5deg);
    box-shadow: 5px 5px 30px rgb(246 196 3);
    transition-duration: 0.8s;
    .card-header {
      mix-blend-mode: screen;
    }
  }
  .card-header {
    font-family: "Sigmar One";
    will-change: transform;

    border: 7px solid #f8a918;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: #efcf95;
    padding: 1rem;
    height: 100px;
  }
}
</style>

<!-- mix-blend-mode: hard-light; -->
