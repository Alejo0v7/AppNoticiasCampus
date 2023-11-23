<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-input
              label="Carnet"
              color="success"
              label-placement="stacked"
              maxlength="50"
              fill="outline"
              shape="round"
              clear-input="true"
              placeholder="Carnet"
              v-model="usuario.carnet"
            ></ion-input>
            <br />

            <ion-input
              label="Correo electrónico"
              color="success"
              label-placement="stacked"
              maxlength="50"
              fill="outline"
              shape="round"
              clear-input="true"
              placeholder="Correo electrónico"
              v-model="usuario.correo"
            ></ion-input>
            <br />
            <ion-input
              label="Contraseña"
              color="success"
              label-placement="stacked"
              maxlength="50"
              fill="outline"
              shape="round"
              clear-input="true"
              placeholder="Contraseña"
              type="password"
              v-model="usuario.password"
            ></ion-input>
            <br />
            <ion-button
              shape="round"
              color="success"
              expand="block"
              @click="login"
            >
              <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
              Iniciar Sesión
            </ion-button>

            <ion-button
              shape="round"
              color="tertiary"
              expand="block"
              @click="Registrarse"
            >
              <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
              Registrarse
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <!-- Toast para inicio de sesión -->
    <ion-toast
      :duration="2500"
      :message="toastMessage"
      :is-open="toastState"
      @didDismiss="toastState = false"
      :icon="informationCircleOutline"
    ></ion-toast>
  </ion-page>
</template>

<script>
import { checkmarkOutline } from "ionicons/icons";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonToast,
} from "@ionic/vue";

import axios from "axios";

export default {
  name: "LoginView",
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonInput,
    IonToast,
  },
  data() {
    return {
      checkmarkOutline,
      toastState: false,
      toastMessage: null,
      usuario: {},
    };
  },
  methods: {
    login() {
      axios
        .post(this.globalVar + "login", this.usuario)
        .then((response) => {
          this.toastState = true;
          this.toastMessage = "Usuario correcto, ¡Bienvenido!";
          console.log(response);
          this.$storage.set("token", response.data.token);
          this.$storage.set("user", response.data.data.usuario);
          this.$storage.set("carnet", response.data.data.carnet);
          this.$storage.set("rol", response.data.data.rol);
          this.usuario = {};
          console.log(response.data.data);
          this.$router.push("/tabs/tab1");
        })
        .catch((error) => {
          this.toastState = true;
          this.toastMessage = "Usuario invalido " + error;
        });
    },
    Registrarse() {
      this.$router.push("/registrarse");
    },
  },
};
</script>
