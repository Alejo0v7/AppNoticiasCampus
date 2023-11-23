<template>
  <ion-button shape="round" expand="block" @click="OpenMdos"
    >Agregar</ion-button
  >
  <!-- modal -->
  <ion-modal :is-open="modalDos">
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar Roles</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="modalDos = false">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <br />
      <ion-input
        label="Ingresa el nombre del rol"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="roles.tipo"
      ></ion-input>
      <br />
      <ion-button shape="round" expand="block" @click="agregarRol">
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
  name: "AgregarRoles",
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
      roles: {},
      modalDos: false,
      config: {},
    };
  },
  methods: {
    // MODAL
    OpenMdos() {
      this.roles = {};
      this.modalDos = true;
    },
    async getToken() {
      let token = await this.$storage.get("token");
      this.config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      this.getData();
      console.log(this.config);
    },

    getData() {
      this.respuesta = [];
      axios
        .get(this.globalVar + "tipoUsuario/index", this.config)
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.respuesta = res.data;
            console.log(this.respuesta);
          }
        });
    },
    getRoles(id) {
      this.Modal = true;

      axios
        .get(this.globalVar + `tipoUsuario/find/${id}`, this.config)
        .then((response) => {
          this.roles = response.data.data;
          console.log(response);
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
   agregarRol() {
      // Petición para insertar datos
      console.log(this.$storage.get("token"));
      axios
        .post(this.globalVar + "tipoUsuario/store", this.roles, this.config)
        .then((response) => {
          let res = response.data;
          this.roles = {};
          if (res.code == 200) {
            this.roles = res.data;
            console.log("Agregado");
            location.reload();
          }
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
  },

  mounted() {
    this.getToken();
  },
};
</script>

<style></style>
