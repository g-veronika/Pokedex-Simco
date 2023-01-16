import axios from "axios";
import { useUserStore } from "./stores/user";

export const auth = async (): Promise<void> => {
  const user = useUserStore();

  if (!accessToken()) {
    return;
  } else {
    const URL = "https://pokedexbe-akd7k.dev.simco.io/api/users/me/";
    await axios
      .get(URL, {
        headers: { Authorization: `Bearer ${accessToken()}`, Accept: "application/json" },
      })

      // On stock username et id obtenus dans Pinia
      .then((response: { data: any }) => {
        user.$patch({
          userName: response.data.username,
          id: response.data.id,
        });
      })

      //If erreur d'authentification on lance refreshToken() et on relance requete /api/users/me
      .catch(async (error) => {
        if (error.response.status === 401) {
          console.log("before refresh token");
          //On remet a jour accessToken
          await refreshToken().then(async () => {
            console.log("before /users/me");

            if (accessToken()) {
              await axios
                .get(URL, {
                  headers: {
                    Authorization: `Bearer ${accessToken()}`,
                    Accept: "application/json",
                  },
                })
                .then((response: { data: any }) => {
                  console.log("before patch pinia");

                  user.$patch({
                    userName: response.data.username,
                    id: response.data.id,
                  });
                });
            }
          });
        }
      });
  }
};

export const refreshToken = async (): Promise<void> => {
  const token = window.localStorage.getItem("refreshToken");

  await axios
    .post(
      "https://pokedexbe-akd7k.dev.simco.io/api/token/refresh/",
      {
        refresh: token,
      },
      {
        method: "POST",
      }
    )
    .then(async (response: { data: any }) => {
      window.localStorage.setItem("accessToken", response.data.access);
    });
};

export const accessToken = () => {
  const token = window.localStorage.getItem("accessToken");
  return token;
};
