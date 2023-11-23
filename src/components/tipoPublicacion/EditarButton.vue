<template>
  <!-- Boton -->
  <ion-button @click="getTipoPublicacion(id)" size="small">
    <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
  </ion-button>
  <!-- Modal -->
  <ion-modal :is-open="Modal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Editar Tipo de Publicacion</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="Modal = false">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <br />
      <ion-input
        label="Ingresa el nombre del Tipo de Publicacion"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="tipoPublicacion.tipo"
      ></ion-input>
      <br />
      <ion-button
        shape="round"
        color="primary"
        expand="block"
        @click="editarTipoPublicacion(tipoPublicacion.id)"
      >
        Editar
      </ion-button>
    </ion-content>
  </ion-modal>
</template>
<script>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonModal,
  IonButtons,
  IonItem,
  IonInput,
  IonIcon,
} from "@ionic/vue";
import { createOutline } from "ionicons/icons";

import axios from "axios";
export default {
  name: "EditarButton",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
    IonModal,
    IonButtons,
    IonItem,
    IonInput,
    IonIcon,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      tipoPublicacion: {},
      Modal: false,
      createOutline,
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
    },
    getTipoPublicacion(id) {
      this.Modal = true;

      axios
        .get(this.globalVar + `tipoPublicacion/find/${id}`, this.config)
        .then((response) => {
          this.tipoPublicacion = response.data.data;
          console.log(response);
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    editarTipoPublicacion(id) {
      this.Modal = false;

      axios
        .put(
          this.globalVar + `tipoPublicacion/update/${id}`,
          this.tipoPublicacion,
          this.config
        )
        .then((response) => {
          this.tipoPublicacion = response.data.data;
          console.log("Editado");
          console.log(response);
          location.reload();
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
  },
  mounted() {
    this.getToken();
  },
};
</script>
