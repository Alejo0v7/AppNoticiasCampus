<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Publicaciones</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true" class="ion-padding">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Publicaciones</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <!-- Componentes -->
        <AgregarButton/>
        <ListaPublicacion/>
  
      </ion-content>
    </ion-page>
  </template>
  
  <script >
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import  AgregarButton  from "../../components/publicacion/AgregarButton.vue";
  import  ListaPublicacion  from "../../components/publicacion/ListaPublicacion.vue";
  
  export default {
    name:'ViewPublicacion',
    components:{
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,
      AgregarButton, ListaPublicacion
    }
  }
  </script>