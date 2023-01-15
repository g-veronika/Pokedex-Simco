<template>
  <div class="min-h-screen relative">
    <Navbar />
    <div class="py-8">
      <h1 class="text-center">Votre equipe</h1>
    </div>
    <div class="flex justify-center pt-16 gap-10 flex-wrap p-8 max-w-[1200px] m-auto">
      <div class="flex justify-center gap-10 p-8">
        <div class="card"></div>
      </div>
      <div class="flex justify-center gap-10 p-8">
        <div class="card"></div>
      </div>
      <div class="flex justify-center gap-10 p-8">
        <div class="card"></div>
      </div>
      <div class="flex justify-center gap-10 p-8">
        <div class="card"></div>
      </div>
      <div class="flex justify-center gap-10 p-8">
        <div class="card"></div>
      </div>
      <div class="flex justify-center gap-10 p-8">
        <div class="card"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped lang="scss">
.card {
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  width: 250px;
  min-width: 250px;
  height: 360px;
  transition-duration: 0.8s;
  cursor: pointer;
  will-change: transform;

  &:hover {
    transform: scale(1.05);
    transition-duration: 0.8s;
    .card-header {
      transition-duration: 0.8s;

      mix-blend-mode: screen;
    }
  }
}
</style>
