<template>
  <div>
    <div class="text-center text-xl pt-8 pb-4">
      <h2>Creer un compte</h2>
    </div>

    <div class="">
      <form @submit.prevent="">
        <div class="flex flex-col pb-4">
          <label for="email">Email </label>
          <input
            @input="isFormNonValid = false"
            v-model="email"
            class=""
            type="email"
            name="name"
            required
          />
        </div>
        <div class="flex flex-col pb-4">
          <label for="username">Username </label>
          <input
            @input="isFormNonValid = false"
            v-model="username"
            class="username"
            type="text"
            name="username"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="password">Mot de passe</label>
          <input
            @input="isFormNonValid = false"
            v-model="password"
            type="password"
            name="password"
            required
          />
        </div>
        <div class="pt-8">
          <button
            @click="handleSubmit"
            type="submit"
            class="bg-cyan-700 w-full font-bold text-white p-4 rounded hover:bg-cyan-900 duration-200"
          >
            Inscription
          </button>
          <p class="error-message text-center pt-2" v-if="isFormNonValid">
            Les informations ne sont pas valides
          </p>
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
const isFormNonValid = ref(false);

const emit = defineEmits<{
  (e: "submitEvent"): void;
}>();

const handleSubmit = async () => {
  isFormNonValid.value = false;

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
      isFormNonValid.value = true;
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

.error-message {
  color: #ed5656;
  text-shadow: 1px 1px 0px #000000;
}
</style>
