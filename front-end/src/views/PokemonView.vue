<template>
  <div class="min-h-screen">
    <Navbar />
    <div class="">
      <div class=""></div>
      <!-- <div class="card">
        <div v-for="pokemon in pokemons" class="card">
          <div class="card-header flex justify-center items-center text-center pt-4 text-lg">
            {{ pokemon.name }}
          </div>
          <div class="card-body flex justify-center mt-[30px]">
            <img class="w-[200px]" :src="pokemon.img" :alt="pokemon.name" />
            <div class="refNumber text-xl">{{ pokemon.ref_number }}</div>
          </div>
        </div>
      </div> -->
      <div class="info"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, inject } from "vue";

const axios: any = inject("axios");
const route = useRoute();
const router = useRouter();

const pokemonID = route.params.id;
// const pokemonURL = `https://pokedexbe-akd7k.dev.simco.io/pokemon/${pokemonID}/`;

const showPokemon = async (): void => {
  const url = `https://pokedexbe-akd7k.dev.simco.io/pokemon/${pokemonID}/`;
  const accessToken = window.localStorage.getItem("accessToken");

  await axios
    .get(url, { headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" } })
    .then((response: { data: any }) => {
      console.log(response.data);
    })
    .catch(async (error) => {
      console.log(error);
      if (error.response.status === 401) {
        const refreshToken = window.localStorage.getItem("refreshToken");
        console.log("401 !");

        //On refresh token
        await axios
          .post(
            "https://pokedexbe-akd7k.dev.simco.io/api/token/refresh/",
            {
              refresh: refreshToken,
            },
            {
              method: "POST",
            }
          )
          .then((response: { data: any }) => {
            console.log(response.data);
            window.localStorage.setItem("accessToken", response.data.access);
          })
          .catch(() => {
            router.push("/connection");
          });
      }
    });
};
showPokemon();
</script>
<style scoped lang="scss"></style>
