<template>
  <div class="flex justify-center pt-8">
    <img class="w-[225px]" src="../assets/images/Pokédex_logo.png" alt="" />
  </div>
  <h1>Bonjour {{ user.$state.userName }}</h1>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const user = useUserStore();
</script>
