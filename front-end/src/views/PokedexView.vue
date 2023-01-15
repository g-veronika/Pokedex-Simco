<template>
  <div class="min-h-screen relative">
    <Navbar />
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
      v-if="isModalVisible"
      @close="isModalVisible = false"
      :pokemon="pokemon"
    />
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import PokemonModal from "@/components/PokemonModal.vue";
import { getMyID } from "@/getId";
import { ref, inject, onMounted } from "vue";

const pokemons = ref([]);
const axios: any = inject("axios");

const nextPage = ref(null);
const previousPage = ref(null);
const isModalVisible = ref(false);
const pokemon = ref({});

const openModal = (item) => {
  pokemon.value = item;
  isModalVisible.value = true;
};

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

onMounted(() => {
  getMyID();
});
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

  .card-header {
    font-family: "Sigmar One";
    will-change: transform;
    transition-duration: 0.8s;

    border: 3px solid #f8a918;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: #efcf95;
    padding: 2rem;
    height: 100px;
  }

  &:hover {
    background-color: rgb(235, 233, 233);
    transform: rotate(5deg) scale(1.05);
    box-shadow: 5px 5px 30px rgb(246 196 3);
    transition-duration: 0.8s;
    .card-header {
      transition-duration: 0.8s;

      mix-blend-mode: screen;
    }
  }

  .refNumber {
    font-family: "Sigmar One";
    color: #5f2a13;
  }
}
</style>
