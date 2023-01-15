<template>
  <div class="px-[2rem] py-[1rem] text-[1rem]">
    <div class="flex justify-between items-center pt-2">
      <img
        class="w-[225px] cursor-pointer pl-8"
        src="../assets/images/Pokédex_logo.png"
        alt=""
        @click="homeRedirection"
      />
      <div class="">
        <div class="flex justify-center">
          <h2>
            Bonjour <span class="capitalize">{{ username }}</span>
          </h2>
        </div>
      </div>

      <div class="pr-4">
        <RouterLink to="/team">
          <button class="cursor-pointer transition duration-300 ease-in-out hover:scale-110">
            Mon equipe
          </button>
        </RouterLink>
      </div>
      <div class="pr-4">
        <button
          @click="disconnect"
          class="cursor-pointer transition duration-300 ease-in-out hover:scale-110"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const homeRedirection = () => {
  if (route.name === "pokedex") {
    router.go("/");
  }
  router.push("/");
};

const username = window.localStorage.getItem("username");

const disconnect = () => {
  window.localStorage.clear();
  router.push("/connection");
};
</script>

<style scoped lang="scss">
div {
  h1,
  button {
    color: #fff8dc;
    text-shadow: 2px 1px 4px #000000;
  }
}
</style>
