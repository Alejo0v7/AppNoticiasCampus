<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Categorias </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- Componentes -->
        <div>
            <lista-categoria/>
        </div>
        <br>
        <agregar-categoria/>
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

import AgregarCategoria from '@/components/categorias/AgregarCategoria.vue';
import ListaCategoria from '@/components/categorias/ListaCategoria.vue';


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
    ListaCategoria
    },

};
</script>
