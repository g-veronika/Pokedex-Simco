<template>
  <div class="p-8 min-h-screen flex flex-col">
    <h1 class="text-3xl text-center pb-8 pt-8">Bienvenue a Pokedex</h1>
    <div class="flex justify-center p-8 gap-x-40 min-h-[600px] min-w-[300px]">
      <div class="flex flex-col w-[300px]">
        <SignIn />
      </div>
      <div class="flex flex-col justify-start w-[400px]">
        <div v-if="isCreated" class="flex justify-center">
          <p class="text-xl">Votre compte a bien été créé ! 😎</p>
        </div>
        <div v-else>
          <h2 class="text-center text-xl pb-4">Nouvel utilisateur?</h2>
          <button
            @click="showSignUpForm = !showSignUpForm"
            type="submit"
            class="bg-cyan-700 w-full font-bold text-white p-4 rounded hover:bg-cyan-900 duration-200"
          >
            Inscription
          </button>
          <div class="h-[400px]">
            <SignUp v-if="showSignUpForm" @submitEvent="isCreated = true" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <img
        src="../assets/images/PikPng.com_pokemon-starters-png_726234.png"
        class="w-[350px]"
        alt=""
      />
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
