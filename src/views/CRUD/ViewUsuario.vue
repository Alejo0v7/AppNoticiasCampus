<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Usuarios</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true" class="ion-padding">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Usuarios</ion-title>
          </ion-toolbar>
        </ion-header>
  
        <!-- Componentes -->
        <AgregarButton/>
        <ListaUsuario/>
  
      </ion-content>
    </ion-page>
  </template>
  
  <script >
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import  AgregarButton  from "../../components/usuario/AgregarButton.vue";
  import  ListaUsuario  from "../../components/usuario/ListaUsuario.vue";
  
  export default {
    name:'ViewUsuario',
    components:{
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent ,
      AgregarButton, ListaUsuario
    }
  }
  </script>