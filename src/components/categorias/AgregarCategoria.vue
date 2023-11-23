<template>
  <ion-button shape="round" expand="block" @click="OpenMdos">
    Agregar Categoria
  </ion-button>
  <!-- modal -->
  <ion-modal :is-open="modalDos">
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar Nueva Categoria</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="modalDos = false">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <br />
      <ion-input
        label="Ingresa el nombre la categoria"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="nombre.nombre"
      ></ion-input>
      <br />
      <ion-button shape="round" expand="block" @click="AddCategoria">
        Agregar
      </ion-button>
    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonPage,
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
} from "@ionic/vue";

import axios from "axios";

export default {
  name: "AgregarCategoria",
  components: {
    IonPage,
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
  },
  data() {
    return {
      respuesta: [],
      tipoPublicacion: {},
      modalDos: false,
      nombre: {},
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
    // MODAL
    OpenMdos() {
      this.modalDos = true;
    },
    AddCategoria() {
      axios
        .post(
          "http://127.0.0.1:8000/api/categoria/store",
          this.nombre,
          this.config
        )
        .then((response) => {
          console.log(response);
          this.nombre = "";
          this.modalDos = false;
          location.reload()
        })
        .catch((error) => {
          console.log(error);
          console.log(this.getToken);
        });
    },
  },
  mounted() {
    this.getToken();
  },
};
</script>

<style></style>
