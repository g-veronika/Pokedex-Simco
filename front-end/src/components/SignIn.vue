<template>
  <div class="">
    <form action="" method="get" class="form-example">
      <div class="flex flex-col pb-4">
        <label for="usermail">Email </label>
        <input v-model="userMail" class="" type="text" name="usermail" id="usermail" required />
      </div>
      <div class="flex flex-col">
        <label for="userpasssword">Mot de passe</label>
        <input
          v-model="userPassword"
          type="password"
          name="userpasssword"
          id="userpasssword"
          required
        />
      </div>
      <div class="pt-8">
        <button
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
const userMail = "";
const userPassword = "";
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
