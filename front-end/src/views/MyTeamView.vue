<template>
  <div class="min-h-screen relative">
    <NavBar />
    <h1 class="py-8 text-center text-2xl">Votre equipe</h1>
    <div class="flex justify-center items-center flex-col">
      <p class="py-8 text-center mx-auto">
        Cliquez sur la carte et puis sur ENTRAINER pour donner de l'experience à votre pokemon
      </p>

      <button
        class="x-btn bg-sky-700 transition duration-300 ease-in-out hover:bg-sky-900 p-4 rounded"
        type="button"
        @click="giveXp"
        v-if="pokemons.length !== 0"
      >
        Entrainer
      </button>
    </div>
    <div class="flex justify-center pt-16 flex-wrap p-8 max-w-[1200px] m-auto gap-10">
      <div
        v-if="pokemons.length === 0"
        v-for="pokemon in 6"
        :key="pokemon"
        class="flex justify-center p-8"
      >
        <div
          @click="router.push('/')"
          class="empty-card flex justify-center items-center cursor-pointer w-[250px] min-w-[250px] h-[360px]"
        >
          <div class="plus text-5xl text-white">+</div>
        </div>
      </div>

      <div
        v-else
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :class="selectedPokemon === pokemon ? 'active' : ''"
        class="card"
        @click="
          selectedPokemon === pokemon ? (selectedPokemon = null) : (selectedPokemon = pokemon)
        "
      >
        <div
          class="card-header flex justify-center items-center text-center pt-4 text-lg text-[#4b0a0a]"
        >
          {{ pokemon.nickname }}
        </div>
        <div class="card-body flex justify-center flex-col items-center mt-[30px]">
          <p>lvl: {{ pokemon.level }} / exp: {{ pokemon.experience }}</p>
          <img class="w-[140px]" :src="pokemon.img" :alt="pokemon.name" />
          <div class="refNumber text-xl">{{ pokemon.ref_number }}</div>
        </div>
        <div @click="deleteCard(pokemon.id)" class="flex justify-center pb-8">Supprimer</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { accessToken, auth } from "@/getId";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import type { Pokemon } from "@/types/pokemons";
import { inject, ref } from "vue";

const axios: any = inject("axios");
const pokemons = ref<Pokemon[]>([]);
const selectedPokemon = ref();
const user = useUserStore();

const getChosenCards = async () => {
  await auth().then(async () => {
    const id = user.$state.id;
    const token = accessToken();

    const pokemonURL = `https://pokedexbe-akd7k.dev.simco.io/pokemon/?trainer=${id}`;
    await axios
      .get(pokemonURL, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      })
      .then((response: { data: any }) => {
        if (response.data) {
          pokemons.value = response.data.results;
          pokemons.value.forEach(async (pokemon) => {
            pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_creature}.png`;
          });
        }
      })
      .catch(() => {
        router.push("/connection");
      });
  });
};

const deleteCard = async (cardId: number) => {
  await auth()
    .then(async () => {
      const token = accessToken();
      await axios
        .delete(`https://pokedexbe-akd7k.dev.simco.io/pokemon/${cardId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        })
        .then(() => {
          pokemons.value = pokemons.value.filter((v) => v.id !== cardId);
        });
    })
    .catch(() => {
      router.push("/connection");
    });
};

const giveXp = async () => {
  await auth()
    .then(async () => {
      const token = accessToken();
      await axios
        .post(
          `https://pokedexbe-akd7k.dev.simco.io/pokemon/${selectedPokemon.value.id}/give_xp/`,
          { amount: 100 },
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
          }
        )
        .then((response: { data: any }) => {
          selectedPokemon.value.experience = response.data.experience;
        });
    })
    .catch((error) => {
      if (error.response.status === 401) {
        router.push("/connection");
      }
    });
};

getChosenCards();
</script>

<style scoped lang="scss">
.x-btn {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
.empty-card {
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  transition-duration: 0.8s;
  will-change: transform;
  &:hover {
    transform: rotate(5deg) scale(1.05);
    transition-duration: 0.8s;
  }

  .plus {
    text-shadow: 2px 1px 4px #1c1a1a;
  }
}

.active {
  background-color: rgb(235, 233, 233);
  transform: rotate(5deg) scale(1.05);
  box-shadow: 5px 5px 30px rgb(217 70 239);
  transition-duration: 0.8s;
}
</style>
