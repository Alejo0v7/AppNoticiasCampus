<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Tipos de Publicaciones </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Componentes -->
      <AgregarTipoPublicacion />
      <ListaTipoPublicacion />
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
} from "@ionic/vue";
import AgregarTipoPublicacion from "../../components/tipoPublicacion/AgregarTipoPublicacion.vue";
import ListaTipoPublicacion from "../../components/tipoPublicacion/ListaTipoPublicacion.vue";

export default {
  name: "ViewTipoPublicacion",
  components: {
    IonButton,
    AgregarTipoPublicacion,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ListaTipoPublicacion,
  },
  data() {
    return {
      motrarComponente: false,
    };
  },
};
</script>
