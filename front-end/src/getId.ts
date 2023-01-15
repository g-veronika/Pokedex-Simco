import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user";

const router = useRouter();

export const getMyID = async (): Promise<void> => {
  const user = useUserStore();
  if (!accessToken()) {
    return;
  } else {
    console.log(accessToken());
    const URL = "https://pokedexbe-akd7k.dev.simco.io/api/users/me/";
    await axios
      .get(URL, {
        headers: { Authorization: `Bearer ${accessToken()}`, Accept: "application/json" },
      })
      .then((response: { data: any }) => {
        user.$patch({
          userName: response.data.username,
          id: response.data.id,
        });
      })
      .catch(async (error) => {
        if (error.response.status === 401) {
          refreshToken();
          if (accessToken())
            await axios
              .get(URL, {
                headers: {
                  Authorization: `Bearer ${accessToken()}`,
                  Accept: "application/json",
                },
              })
              .then((response: { data: any }) => {
                user.$patch({
                  userName: response.data.username,
                  id: response.data.id,
                });
              })
              .catch(() => {
                router.push("/connection");
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
