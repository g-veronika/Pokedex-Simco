<template>
  <div class="min-h-screen relative">
    <Navbar />
    <div class="py-8">
      <h1 class="text-center">Votre equipe</h1>
    </div>
    <div class="flex justify-center pt-16 gap-10 flex-wrap p-8 max-w-[1200px] m-auto">
      <div v-if="pokemons.length === 0" v-for="pokemon in 6" class="flex justify-center gap-10 p-8">
        <div class="card"></div>
      </div>
      <!-- <div v-else v-for="pokemon in 6" class="flex justify-center gap-10 p-8">
        <div class="card"></div>
      </div> -->
      <div v-else v-for="pokemon in pokemons" class="card">
        <div
          class="card-header flex justify-center items-center text-center pt-4 text-lg text-[#4b0a0a]"
        >
          {{ pokemon.nickname }}
        </div>
        <div class="card-body flex justify-center mt-[30px]">
          <img class="w-[200px]" :src="pokemon.img" :alt="pokemon.name" />
          <div class="refNumber text-xl">{{ pokemon.ref_number }}</div>
        </div>
        <div @click="deleteCard(pokemon.id)" class="flex justify-center pb-8">Supprimer</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { getMyID } from "@/getId";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { inject, ref, watch } from "vue";

const user = useUserStore();
const axios: any = inject("axios");
const accessToken = window.localStorage.getItem("accessToken");
const pokemons = ref([]);

const getChosenCards = async () => {
  const id = user.$state.id;
  const pokemonURL = `https://pokedexbe-akd7k.dev.simco.io/pokemon/?trainer=${id}`;
  await axios
    .get(pokemonURL, {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
    })
    .then((response: { data: any }) => {
      if (response.data) {
        console.log(response.data);
        pokemons.value = response.data.results;
        pokemons.value.forEach(async (pokemon) => {
          pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_creature}.png`;
        });
      }
    })
    .catch(() => {
      // router.push("/");
    });
};

const deleteCard = async (cardId: number) => {
  await axios
    .delete(`https://pokedexbe-akd7k.dev.simco.io/pokemon/${cardId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
    })
    .then((response: { data: any }) => {
      router.go(0);
    })
    .catch(() => {
      // console.log("catch");
    });
};

getMyID().then(() => {
  getChosenCards();
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
