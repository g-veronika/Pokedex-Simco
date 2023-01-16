<template>
  <div class="fixed flex justify-center items-center top-0 left-0 h-screen w-screen">
    <div class="bg-black opacity-70 h-screen w-screen absolute" @click="emit('close')"></div>
    <div
      class="modal-container bg-zinc-200 flex justify-center h-[700px] w-[500px] z-10 relative rounded-xl text-[#4b0a0a]"
    >
      <div
        class="absolute top-4 cursor-pointer text-xl leading-4 right-4 hover:text-black"
        @click="emit('close')"
      >
        x
      </div>
      <div
        class="modal-body w-full"
        :class="pokemon.legendary ? ' rounded-xl shadow-2xl shadow-amber-400' : ''"
      >
        <div class="modal-header text-center text-xl p-[3rem] rounded bg-[#efcf95]">
          {{ pokemon.name }}
        </div>
        <div class="flex justify-center flex-col p-8">
          <div class="image flex justify-center flex-col items-center text-l">
            <div class="text-xl"># {{ pokemon.ref_number }}</div>
            <img class="w-[200px] py-8" :src="pokemon.img" :alt="pokemon.name" />
          </div>
          <div class="flex flex-col gap-y-4 w-3/5 mx-auto">
            <div class="p-2 rounded-xl bg-fuchsia-200 text-center">
              Generation : {{ pokemon.generation }}
            </div>
            <div v-if="pokemon.legendary" class="bg-amber-400 rounded-xl p-2 text-center">
              Legendary
            </div>
            <div class="rounded-xl p-2 text-center" :class="pokemon.type_1.toLowerCase()">
              {{ pokemon.type_1 }}
            </div>
            <div
              v-if="pokemon.type_2 !== ''"
              class="rounded-xl p-2 text-center"
              :class="pokemon.type_2.toLowerCase()"
            >
              {{ pokemon.type_2 }}
            </div>
            <button
              v-if="user.$state.userName != '' && !isRegistered"
              type="button"
              @click="addToTeam"
              class="flex justify-center py-4 m-auto cursor-pointer text-xl hover:text-orange-700"
            >
              Ajouter
            </button>
            <div class="text-center text-xl mt-4 text-orange-700" v-if="isRegistered">
              Pokemon ajouté
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import type { Pokemon } from "@/types/pokemons";
import { accessToken, auth } from "@/getId";

const axios: any = inject("axios");
const user = useUserStore();
const router = useRouter();
const isRegistered = ref(false);
const emit = defineEmits<{
  (e: "close"): void;
}>();

const props = defineProps<{
  pokemon: Pokemon;
}>();

const addToTeam = async () => {
  auth().then(async () => {
    const id = user.$state.id;
    const pokemonURL = "https://pokedexbe-akd7k.dev.simco.io/pokemon/";

    const data = {
      pokedex_creature: props.pokemon.ref_number,
      trainer: id,
      nickname: props.pokemon.name,
      experience: 0,
    };
    const token = accessToken();

    await axios
      .post(pokemonURL, data, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      })
      .then((response: { data: any }) => {
        if (response.data) {
          isRegistered.value = true;
        }
      })
      .catch(() => {
        router.push("/connection");
      });
  });
};

onMounted(() => {
  document.body.style.overflow = "hidden";
});
onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<style scoped lang="scss">
.modal-container {
  background: radial-gradient(circle, rgb(251, 198, 63) 0%, rgb(252, 143, 70) 100%);

  .modal-header {
    border: 3px solid #f8a918;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    box-shadow: 1px 3px 9px rgb(246 196 3);
  }
}

.grass {
  background-color: #78c850;
}
.water {
  background-color: #6890f0;
}
.fire {
  background-color: #f08030;
}
.normal {
  background-color: #a8a878;
}
.fighting {
  background-color: #c03028;
}
.flying {
  background-color: #a890f0;
}
.poison {
  background-color: #a040a0;
}
.electric {
  background-color: #f8d030;
}
.ground {
  background-color: #a8b820;
}
.psychic {
  background-color: #f85888;
}
.rock {
  background-color: #b8a038;
}
.ice {
  background-color: #98d8d8;
}
.bug {
  background-color: #a8b820;
}
.dragon {
  background-color: #7038f8;
}
.ghost {
  background-color: #705898;
}
.dark {
  background-color: #705848;
}
.steel {
  background-color: #b8b8d0;
}
.fairy {
  background-color: #ee99ac;
}
</style>
