<template>
  <ion-list>
    <ion-item>
      <ion-icon :icon="idCard" slot="start"></ion-icon>
      <ion-label>Carnet: {{ users.carnet }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon :icon="personCircle" slot="start"></ion-icon>
      <ion-label>Usuario: {{ users.usuario }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-icon :icon="mail" slot="start"></ion-icon>
      <ion-label>Correo: {{ users.correo }}</ion-label>
    </ion-item>
  </ion-list>
  <br />
  <ion-button shape="round" @click="getPerfil()" expand="block" color="warning">
    Modificar perfil
  </ion-button>
  <br />
  <ion-button shape="round" expand="block" color="danger" @click="logout">
    Cerrar sesión
  </ion-button>

  <!-- Modal para modificar datos del usuario -->
  <ion-modal :is-open="modalState2" @didDismiss="modalState2 = false">
    <ion-header>
      <ion-toolbar>
        <ion-title>Información de la categoria</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="modalState2 = false">
            <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-input
        label="Carnet"
        color="warning"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        placeholder="Nombre categoria"
        v-model="users.carnet"
        :disabled="true"
      ></ion-input>
      <!-- Nombre del usuario -->
      <ion-input
        label="Nombre"
        color="warning"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        placeholder="Nombre categoria"
        v-model="users.usuario"
      ></ion-input>
      <br />
      <!-- Correo del usuario -->
      <ion-input
        label="Correo"
        color="warning"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        placeholder="Correo"
        v-model="users.correo"
      ></ion-input>
      <br />
      <ion-button
        shape="round"
        color="warning"
        expand="block"
        @click="editarPerfil()"
      >
        <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
        Guardar cambios
      </ion-button>
    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  IonIcon,
  IonTitle,
  IonModal,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonInput,
  IonContent,
} from "@ionic/vue";

import { personCircle, idCard, mail, closeCircle } from "ionicons/icons";

import axios from "axios";

export default {
  name: "PerfilView",
  components: {
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButton,
    IonIcon,
    IonTitle,
    IonModal,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonInput,
    IonContent,
  },
  data() {
    return {
      personCircle,
      idCard,
      mail,
      closeCircle,
      users: {},
      modalState1: false,
      modalState2: false,
      config: {},
      car: null,
    };
  },
  methods: {
    async getToken() {
      let token = await this.$storage.get("token");
      let car = await this.$storage.get("carnet");

      this.config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      this.car = car;
      this.verPerfil();
    },
    verPerfil(id = this.car) {
      axios
        .get(`http://127.0.0.1:8000/api/usuario/find/${id}`, this.config)
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.users = res.data;
          }
        })
        .catch((error) => console.log("Ha ocurrido un error " + error));
    },

    getPerfil(id = this.car) {
      this.modalState2 = true;
      axios
        .get(`http://127.0.0.1:8000/api/usuario/find/${id}`, this.config)
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.users = res.data;
          }
        })
        .catch((error) => console.log("Ha ocurrido un error " + error));
    },

    editarPerfil(id = this.car) {
      this.Modal = false;
      axios
        .put(
          `http://127.0.0.1:8000/api/usuario/update/${id}`,
          this.users,
          this.config
        )
        .then((response) => {
          this.users = response.data.data;
          console.log("Editado");
          console.log(response);
          location.reload();
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    logout() {
      this.$storage.clear();
      this.$router.push("/");
    },
  },
  mounted() {
    this.getToken();
  },
};
</script>
