<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab4" />
        </ion-buttons>
        <ion-title> Roles de Usuario </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Componentes -->
      <AgregarRoles />
      <ListaRoles />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
} from "@ionic/vue";
import AgregarRoles from "../../components/Roles/AgregarRoles.vue";
import ListaRoles from "../../components/Roles/ListaRoles.vue";

export default {
  name: "ViewRol",
  components: {
    IonButton,
    AgregarRoles,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ListaRoles,
    IonBackButton,
    IonButtons,
  },
  data() {
    return {
      motrarComponente: false,
    };
  },
};
</script>
