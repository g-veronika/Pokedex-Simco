import { defineStore } from "pinia"

export const useUserStore = defineStore({
  id: "user",


  state: () : {
    userName: string | null
  } => ({
    userName: null
  }),
}
)
