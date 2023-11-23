<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab4" />
        </ion-buttons>
        <ion-title> Categorias </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Componentes -->
      <agregar-categoria />
      <br />
      <div>
        <lista-categoria />
      </div>
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

import AgregarCategoria from "@/components/categorias/AgregarCategoria.vue";
import ListaCategoria from "@/components/categorias/ListaCategoria.vue";

export default {
  name: "ViewCategoria",
  components: {
    IonButton,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    AgregarCategoria,
    ListaCategoria,
    IonBackButton,
    IonButtons,
  },
  beforeMount() {
    
  },
};
</script>
