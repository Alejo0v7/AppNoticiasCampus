<template>
  <ion-button @click="OpenModal" shape="round" expand="block"
    >Agregar Usuario
  </ion-button>

  <!-- modal -->
  <ion-modal :is-open="modal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Agregar Usuario</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="modal = false">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <br />
      <ion-input
        label="Ingresa el carnet del usuario"
        color="primary"
        label-placement="stacked"
        maxlength="6"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="usuario.carnet"
        type="number"
      >
      </ion-input>
      <br />
      <ion-input
        label="Ingresa el correo del usuario"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="usuario.correo"
      >
      </ion-input>
      <br />
      <ion-input
        label="Ingresa el nombre del usuario"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="usuario.usuario"
      >
      </ion-input>
      <br />

      <ion-input
        label="Ingresa la Contraseña del Usuario"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="usuario.password"
      >
      </ion-input>
      <br />

      <ion-select
        ustify="space-between"
        label="Tipo de usuario"
        interface="action-sheet"
        placeholder="Selecciona"
        fill="outline"
        shape="round"
        v-model="usuario.tipo_usuario"
      >
        <ion-select-option
          v-for="(tipo, i) in dataTipoUsuario"
          :key="i"
          :value="tipo.id"
        >
          {{ tipo.tipo }}
        </ion-select-option>
      </ion-select>
      <br />
      <ion-button shape="round" expand="block" @click="agregarUsuario">
        Agregar
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
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";

import axios from "axios";

export default {
  name: "AgregarButton",
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
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      modal: false,
      usuario: {},
      dataTipoUsuario: {},
      config: {},
    };
  },
  methods: {
    OpenModal() {
      this.usuario = {};
      this.modal = true;
    },
    async getToken() {
      let token = await this.$storage.get("token");
      this.config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      this.getTipoUsuario();
    },
    agregarUsuario() {
      // Petición para insertar datos
      console.log(this.usuario);
      axios
        .post(this.globalVar + "usuario/store", this.usuario, this.config)
        .then((response) => {
          let res = response.data;
          this.roles = {};
          if (res.code == 200) {
            this.roles = res.data;
            console.log("Usuario agregado Agregado");
            this.usuario = {};
            this.modal = false;
            location.reload();
          }
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    getTipoUsuario() {
      this.dataTipoUsuario = {};
      axios
        .get(this.globalVar + "tipoUsuario/index", this.config)
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.dataTipoUsuario = res.data;
            console.log(this.dataTipoUsuario);
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
