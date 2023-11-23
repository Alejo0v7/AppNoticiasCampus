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
      <ion-datetime presentation="date" :multiple="true" :value="fecha" readonly
        ><span slot="title">Calendario de Eventos</span></ion-datetime
      >
      <ListaComponent v-show="mostrar" />
    </ion-content>
  </ion-page>
</template>

<script>
import axios from "axios";
import {
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
