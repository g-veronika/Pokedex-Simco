<template>
  <div class="text-center text-xl pt-8 pb-4">Creer un compte</div>

  <div class="">
    <form action="" method="get" class="form-example">
      <div class="flex flex-col pb-4">
        <label for="email">Email </label>
        <input v-model="newUserMail" class="" type="email" name="name" id="name" required />
      </div>
      <div class="flex flex-col pb-4">
        <label for="username">Username </label>
        <input
          v-model="newUserMail"
          class="username"
          type="text"
          name="username"
          id="username"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="password">Mot de passe</label>
        <input v-model="newUserPassword" type="password" name="password" id="password" required />
      </div>
      <div class="pt-8">
        <button
          type="submit"
          class="bg-teal-600 w-full font-bold text-white p-4 rounded hover:bg-teal-700 duration-200"
        >
          Inscription
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const newUserMail = "";
const newUserPassword = "";
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
