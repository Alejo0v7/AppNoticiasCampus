<template>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <h3>Tipos de Publicacion</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>ID</ion-col>
        <ion-col>Tipo de Publicacion</ion-col>
        <ion-col>Acciones</ion-col>
      </ion-row>
      <ion-row v-for="(data, i) in respuesta" :key="i">
        <ion-col>{{ data.id }}</ion-col>
        <ion-col>{{ data.tipo }}</ion-col>
        <ion-col>
          <!-- Componentes -->
          <EditarButton :id="data.id" />
          <EliminarButton :id="data.id" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { IonContent, IonGrid, IonCol, IonRow } from "@ionic/vue";
import EditarButton from "./EditarButton.vue";
import EliminarButton from "./EliminarButton.vue";

import axios from "axios";
export default {
  name: "ListaRoles",
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
        .get(this.globalVar + "tipoPublicacion/index", this.config)
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

<style></style>
