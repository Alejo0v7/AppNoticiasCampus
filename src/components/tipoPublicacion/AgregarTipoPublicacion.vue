<template>
  <ion-button shape="round" expand="block" @click="OpenMdos"
    >Agregar</ion-button
  >
  <!-- modal -->
  <ion-modal :is-open="modalDos">
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar Tipo de Publicacion</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="modalDos = false">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <br />
      <ion-input
        label="Ingresa el nombre Tipo de Publicacion"
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
      <ion-button shape="round" expand="block" @click="agregarTipoPublicacion">
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
  name: "AgregarTipoPublicacion",
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
    };
  },
  methods: {
    // MODAL
    OpenMdos() {
      this.tipoPublicacion = {};
      this.modalDos = true;
    },

    getData() {
      this.respuesta = [];
      axios.get(this.globalVar + "tipoPublicacion/index").then((response) => {
        let res = response.data;
        if (res.code == 200) {
          this.respuesta = res.data;
          console.log(this.respuesta);
        }
      });
    },
    getTipoPublicacion(id) {
      this.Modal = true;

      axios
        .get(this.globalVar + `tipoPublicacion/find/${id}`)
        .then((response) => {
          this.tipoPublicacion = response.data.data;
          console.log(response);
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    agregarTipoPublicacion() {
      console.log(this.tipoPublicacion);
      axios
        .post(this.globalVar + "tipoPublicacion/store", this.tipoPublicacion)
        .then((response) => {
          let res = response.data;
          this.tipoPublicacion = {};
          if (res.code == 200) {
            this.tipoPublicacion = res.data;
            console.log("Agregado");
            location.reload();
          }
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
  },
  mounted() {
    this.getData();
  },
  ionViewWillEnter() {
    this.getData();
  },
};
</script>

<style></style>
