import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import { IonicVue } from '@ionic/vue';

// Importar Ionic Storage
import { Storage } from '@ionic/storage'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';



const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store)
  app.config.globalProperties.globalVar = 'http://127.0.0.1:8000/api/';

// Permiñtirá usar la variable storage de forma global
const storage = new Storage()
await storage.create()
app.config.globalProperties.$storage = storage;

router.isReady().then(() => {
  app.mount('#app');
});