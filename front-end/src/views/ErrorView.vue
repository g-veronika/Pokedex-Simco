<template>
  <div class="min-h-screen flex justify-center flex-col items-center">
    <div class="flex justify-center items-center text-9xl px-[1rem]">
      <div class="error-404">4</div>
      <div class="">
        <img
          src="../assets/images/5a0596df9cf05203c4b60445.png"
          alt="pokeball-image"
          class="flex mx-auto w-[350px]"
        />
      </div>
      <div class="error-404">4</div>
    </div>
    <div class="flex flex-col pt-[5rem] lg:pl-[3rem]">
      <RouterLink to="/">
        <button class="pb-[2rem] text-l transition duration-300 ease-in-out hover:scale-110">
          Retour à l'accueil
        </button>
      </RouterLink>
      <div class="">
        <img
          src="../assets/images/pikachu-running.gif"
          alt="pikachu-image"
          class="pikachu-img w-[200px]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.pikachu-img {
  transform: rotateY(180deg);
}
</style>
