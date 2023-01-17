<template>
  <div class="min-h-screen relative">
    <NavBar />
    <div class="flex justify-center pt-16 gap-10 flex-wrap p-8 min-h-screen">
      <div @click="openModal(pokemon)" v-for="pokemon in pokemons" class="card">
        <div
          class="card-header flex justify-center items-center text-center pt-4 text-lg text-[#4b0a0a]"
        >
          {{ pokemon.name }}
        </div>
        <div class="card-body flex justify-center mt-[30px]">
          <img class="w-[200px]" :src="pokemon.img" :alt="pokemon.name" />
          <div class="refNumber text-xl">{{ pokemon.ref_number }}</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-16 pb-8">
      <button
        type="button"
        :disabled="previousPage === null"
        class="cursor-pointer text-8xl disabled:text-stone-600 disabled:pointer-events-none text-yellow-500 hover:text-yellow-600 disabled:opacity-60"
        @click="goPreviousPage()"
      >
        &#8592;
      </button>
      <button
        type="button"
        :disabled="nextPage === null"
        class="cursor-pointer text-8xl disabled:text-stone-600 disabled:pointer-events-none text-yellow-500 hover:text-yellow-600 disabled:opacity-60"
        @click="goNextPage()"
      >
        &rarr;
      </button>
    </div>
    <PokemonModal
      :class="isModalVisible ? 'opacity-1' : 'opacity-0'"
      v-if="isModalVisible && pokemon"
      @close="isModalVisible = false"
      :pokemon="pokemon"
    />
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import PokemonModal from "@/components/PokemonModal.vue";
import { auth } from "@/getId";
import type { Pokemon } from "@/types/pokemons";
import { ref, inject } from "vue";

const pokemons = ref<Pokemon[]>([]);
const axios: any = inject("axios");

const nextPage = ref(null);
const previousPage = ref(null);
const isModalVisible = ref(false);
const pokemon = ref<Pokemon | undefined>();

const openModal = (item: Pokemon) => {
  pokemon.value = item;
  isModalVisible.value = true;
};

const showPokemonsURL = "https://pokedexbe-akd7k.dev.simco.io/pokedex/?limit=25";

const getList = async (url: string): Promise<void> => {
  await auth();

  await axios.get(url).then((response: { data: any }) => {
    pokemons.value = response.data.results;
    nextPage.value = response.data.next;
    previousPage.value = response.data.previous;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  //On rajoute les images des pokemons
  pokemons.value.forEach((pokemon) => {
    pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.ref_number}.png`;
  });
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

<style scoped lang="scss"></style>
