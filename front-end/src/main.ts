import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import axios from 'axios'
import VueAxios from 'vue-axios'

import "./styles/styles.scss";

const app = createApp(App);

// https://github.com/imcvampire/vue-axios
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.use(createPinia());
app.use(router);

app.mount("#app");
