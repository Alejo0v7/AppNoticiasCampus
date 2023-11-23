<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <h3>Usuarios</h3>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>Carnet</ion-col>
      <ion-col>Correo</ion-col>
      <ion-col>Acciones</ion-col>
    </ion-row>
    <ion-row v-for="(data, i) in respuesta" :key="i">
      <ion-col>{{ data.carnet }}</ion-col>
      <ion-col>{{ data.correo }}</ion-col>
      <ion-col>
        <!-- Componentes -->
        <EditarButton :id="data.carnet" />
        <EliminarButton :id="data.carnet" />
      </ion-col>
    </ion-row>
    <ion-row> </ion-row>
  </ion-grid>
</template>

<script>
import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/vue";

import EditarButton from "./EditarButton.vue";
import EliminarButton from "./EliminarButton.vue";

import axios from "axios";
export default {
  name: "ListaUsuario",
  components: {
    IonContent,
    IonGrid,
    IonCol,
    IonRow,

    EditarButton,
    EliminarButton,
  },
  data() {
    return {
      respuesta: [],
      usuario: {},
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
    },
    getData() {
      this.respuesta = [];
      axios
        .get(this.globalVar + "usuario/index", this.config)
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.respuesta = res.data;
            console.log(this.respuesta);
          }
        });
    },
  },
  mounted() {
    this.getToken();
  },
};
</script>
