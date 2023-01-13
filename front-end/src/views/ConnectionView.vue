<template>
  <div class="p-8 min-h-screen">
    <h1 class="text-3xl text-center text-teal-900 font-bold pb-8 pt-8">Bienvenue a Pokedex</h1>
    <div class="flex justify-center p-8 gap-x-40">
      <div class="flex flex-col w-[300px]">
        <h2 class="text-center text-xl pb-4">Connexion</h2>
        <SignIn />
      </div>
      <div class="flex flex-col justify-center w-[300px]">
        <div v-if="isCreated" class="flex justify-center">
          <p class="text-xl text-teal-900">Votre compte a bien été créé ! 😎</p>
        </div>
        <div v-else>
          <h2 class="text-center text-xl pb-4">Nouvel utilisateur?</h2>
          <button
            @click="showSignUpForm = !showSignUpForm"
            type="submit"
            class="bg-teal-600 w-full font-bold text-white p-4 rounded hover:bg-teal-700 duration-200"
          >
            Inscription
          </button>
          <div class="h-[400px]">
            <SignUp v-if="showSignUpForm" @submitEvent="isCreated = true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import { ref } from "vue";

const isCreated = ref(false);

const showSignUpForm = ref(false);
</script>
