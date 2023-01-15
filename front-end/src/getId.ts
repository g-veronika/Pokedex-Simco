import axios from "axios";
import { useUserStore } from "./stores/user";

export const getMyID = async (): Promise<void>=> {
  const user = useUserStore()
  const accessToken = window.localStorage.getItem("accessToken")
  if (!accessToken) {
    return;
  } else {
    const URL = "https://pokedexbe-akd7k.dev.simco.io/api/users/me/";
    await axios
      .get(URL, { headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" } })
      .then((response: { data: any }) => {
        user.$patch({
          userName: response.data.username,
          id: response.data.id,
        });
      })
      .catch(async (error) => {
        if (error.response.status === 401) {
          const refreshToken = window.localStorage.getItem("refreshToken");

          //On refresh token
          await axios
            .post(
              "https://pokedexbe-akd7k.dev.simco.io/api/token/refresh/",
              {
                refresh: refreshToken,
              },
              {
                method: "POST",
              }
            )
            .then((response: { data: any }) => {
              window.localStorage.setItem("accessToken", response.data.access);
            });
        }
      });
  }
};
