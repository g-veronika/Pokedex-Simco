<template>
  <div class=""></div>
  <h1>Pokedex</h1>
  <h2>bonjour {{ user.$state.userName }}</h2>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
const user = useUserStore();
</script>
