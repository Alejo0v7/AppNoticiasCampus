<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Calendario</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Calendario</ion-title>
        </ion-toolbar>
      </ion-header>

      <h2>Calendario</h2>
      <h2>prueba de ale</h2>
      <!-- Componentes -->
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
export default {
  name: "Tab2Page",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
};
</script>
