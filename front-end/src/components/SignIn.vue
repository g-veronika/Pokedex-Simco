<template>
  <div class="">
    <form @submit.prevent="">
      <div class="flex flex-col pb-4">
        <label for="username">Username</label>
        <input v-model="username" class="" type="text" name="username" required />
      </div>
      <div class="flex flex-col">
        <label for="password">Mot de passe</label>
        <input v-model="password" type="password" name="password" required />
      </div>
      <div class="pt-8">
        <button
          @click="handleSubmit"
          type="submit"
          class="bg-teal-600 w-full font-bold text-white p-4 rounded hover:bg-teal-700 duration-200"
        >
          Connexion
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { ref, inject } from "vue";

const axios: any = inject("axios");

const username = ref("user");
const password = ref("tenvklnavst");

const handleSubmit = async () => {
  const accessTokenURL = "https://pokedexbe-akd7k.dev.simco.io/api/token/";

  const data = {
    password: password.value,
    username: username.value,
  };

  await axios
    .post(accessTokenURL, data, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
    .then((response: { data: any }) => {
      if (response.data.access && response.data.refresh) {
        // On stock les 2 tokens dans localStorage
        window.localStorage.setItem("accessToken", response.data.access);
        window.localStorage.setItem("refreshToken", response.data.refresh);
        router.push("/");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<style scoped lang="scss">
form {
  input {
    border: 2px solid black;
    border-radius: 3px;
    padding: 5px;
  }
}
</style>
