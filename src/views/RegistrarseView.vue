<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registro</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <!-- Ingresar correo electronico -->
            <ion-input
              label="Ingresa el carnet del usuario"
              color="primary"
              label-placement="stacked"
              maxlength="6"
              counter
              fill="outline"
              shape="round"
              clear-input="true"
              placeholder="Carnet"
              v-model="usuario.carnet"
              type="number"
            ></ion-input>
            <ion-input
              label="Nombre"
              color="success"
              label-placement="stacked"
              maxlength="50"
              fill="outline"
              shape="round"
              clear-input="true"
              placeholder="Usuario"
              v-model="usuario.usuario"
            ></ion-input
            ><br />
            <!-- Ingresar nombre  -->
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
            <!-- Ingresar contraseña -->
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
              @click="register"
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
  name: "RegistrarseView",
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
    register() {
      this.usuario.tipo_usuario = 41;
      axios
        .post(this.globalVar + "usuario/store", this.usuario)
        .then((response) => {
          let res = response.data;
          this.roles = {};
          if (res.code == 200) {
            this.roles = res.data;
            console.log("Usuario agregado Agregado");
            this.usuario = {};
            this.$router.push("/");
          }
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
  },
};
</script>
