import { defineStore } from "pinia"

export const useUserStore = defineStore({
  id: "user",


  state: () : {
    userName: string,
    id: number | null
  } => ({
    userName: "",
    id: null
  }),

}
)
