import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import { store } from './store';

const app = createApp(App);
app.use(router);
app.provide('store', store);
app.mount('#app');