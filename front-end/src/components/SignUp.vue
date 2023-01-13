<template>
  <div>
    <div class="text-center text-xl pt-8 pb-4">Creer un compte</div>

    <div class="">
      <form @submit.prevent="">
        <div class="flex flex-col pb-4">
          <label for="email">Email </label>
          <input v-model="email" class="" type="email" name="name" required />
        </div>
        <div class="flex flex-col pb-4">
          <label for="username">Username </label>
          <input v-model="username" class="username" type="text" name="username" required />
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
            Inscription
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";

const axios: any = inject("axios");
const email = ref("");
const username = ref("");
const password = ref("");

const emit = defineEmits<{
  (e: "submitEvent"): void;
}>();

const handleSubmit = async () => {
  // Avant de envoyer la requete a l'API on verifie que tous les champs sont remplis
  if (email.value === "" || username.value === "" || password.value === "") {
    return;
  }
  const registerURL = "https://pokedexbe-akd7k.dev.simco.io/api/users/register/";

  const data = {
    password: password.value,
    username: username.value,
    email: email.value,
  };

  await axios
    .post(registerURL, data, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
    .then((response: { data: any }) => {
      if (response.data) {
        emit("submitEvent");
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
