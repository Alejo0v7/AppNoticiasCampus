<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Calendario</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Calendario</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ion-datetime
              class="ion-text-center"
              presentation="date"
              :multiple="true"
              :value="fecha"
              readonly
              color="rose"
              ><span slot="title">Calendario de Eventos</span></ion-datetime
            >
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col>
            <ListaComponent v-show="mostrar" />
          </ion-col>
        </ion-row>
      </ion-grid>
      <div class="centerDiv"></div>
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import {
  IonGrid,
  IonCol,
  IonRow,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  IonButton,
  IonButtons,
  IonNavLink,
} from "@ionic/vue";
import ListaComponent from "../components/calendario/ListaComponent.vue";

export default {
  name: "Tab2Page",
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonDatetime,
    IonButton,
    IonButtons,
    ListaComponent,
    IonNavLink,
  },
  data() {
    return {
      respuesta: [],
      fecha: [],
      mostrar: false,
      config: {},
    };
  },
  methods: {
    async getToken() {
      let token = await this.$storage.get("token");
      this.config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      this.getData();
      this.ver();
    },
    getData() {
      this.respuesta = [];
      axios
        .get(this.globalVar + "publicacion/index", this.config)
        .then((response) => {
          let res = response.data;
          if (res.code === 200) {
            this.respuesta = res.data;
            this.fecha = this.respuesta.map((item) => item.fecha);
          }
        });
    },
    ver() {
      this.mostrar = !this.mostrar;
    },
  },
  mounted() {
    this.getToken();
  },
};
</script>
<style>
:root {
  --ion-color-rose: #713abe;
  --ion-color-rose-rgb: 131, 24, 67;
  --ion-color-rose-contrast: #ffffff;
  --ion-color-rose-contrast-rgb: 255, 255, 255;
  --ion-color-rose-shade: #3d30a2;
  --ion-color-rose-tint: #9d76c1;

  --ion-text-color: #363062;
  --ion-text-color-rgb: 136, 19, 55;

  --ion-color-step-50: #f1eaff;
  --ion-color-step-100: #f1eaff;
  --ion-color-step-150: #f1eaff;
  --ion-color-step-200: #e5cff7;
  --ion-color-step-250: #e5cff7;
  --ion-color-step-300: #e5cff7;
  --ion-color-step-350: #e5cff7;
  --ion-color-step-400: #e5cff7;
  --ion-color-step-450: #e5cff7;
  --ion-color-step-500: #9d76c1;
  --ion-color-step-550: #9d76c1;
  --ion-color-step-600: #9d76c1;
  --ion-color-step-650: #9d76c1;
  --ion-color-step-700: #9d76c1;
  --ion-color-step-750: #9d76c1;
  --ion-color-step-800: #a076f9;
  --ion-color-step-850: #9288f8;
  --ion-color-step-900: #8062d6;
  --ion-color-step-950: #6f61c0;
}

.ion-color-rose {
  --ion-color-base: var(--ion-color-rose);
  --ion-color-base-rgb: var(--ion-color-rose-rgb);
  --ion-color-contrast: var(--ion-color-rose-contrast);
  --ion-color-contrast-rgb: var(--ion-color-rose-contrast-rgb);
  --ion-color-shade: var(--ion-color-rose-shade);
  --ion-color-tint: var(--ion-color-rose-tint);
}

ion-datetime {
  --background: #e5d4ff;
  --background-rgb: 255, 241, 242;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0px 0px 20px -10px;
}
</style>
