<template>
  <div class="px-[2rem] py-[1rem] text-[1rem]">
    <div class="flex justify-between gap-y-8 items-center pt-2 flex-col lg:flex-row">
      <img
        class="w-[225px] cursor-pointer"
        src="../assets/images/Pokédex_logo.png"
        alt=""
        @click="homeRedirection"
      />
      <div class="">
        <div class="flex justify-center">
          <h2 v-if="user.$state.userName !== ''">
            Bonjour <span class="capitalize">{{ user.$state.userName }}</span>
          </h2>
        </div>
      </div>
      <div class="" v-if="user.$state.userName !== '' && route.name !== 'team'">
        <RouterLink to="/team">
          <button class="cursor-pointer transition duration-300 ease-in-out hover:scale-110">
            Mon equipe
          </button>
        </RouterLink>
      </div>
      <div class="">
        <button
          v-if="user.$state.userName !== ''"
          @click="disconnect"
          class="cursor-pointer transition duration-300 ease-in-out hover:scale-110"
        >
          Déconnexion
        </button>
        <button
          v-else
          @click="router.push('/connection')"
          class="cursor-pointer transition duration-300 ease-in-out hover:scale-110"
        >
          Connexion
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const user = useUserStore();

const homeRedirection = () => {
  if (route.name === "pokedex") {
    router.go(0);
  }
  router.push("/");
};

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
