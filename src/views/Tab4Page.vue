<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Panel Administrativo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Panel Administrativo</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-accordion-group expand="inset">
        <ion-accordion value="first">
          <ion-item slot="header" color="light">
            <ion-label>Usuarios y roles</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-button
              expand="block"
              shape="round"
              @click="this.$router.push({ path: '/ViewRol' })"
            >
              Gestionar Roles
            </ion-button>
            <ion-button
              expand="block"
              shape="round"
              @click="this.$router.push({ path: '/ViewUsuario' })"
            >
              Gestionar Usuarios
            </ion-button>
          </div>
        </ion-accordion>
        <ion-accordion value="second">
          <ion-item slot="header" color="light">
            <ion-label>Noticias y eventos</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <ion-button 
              
              expand="block" 
              
              shape="round"
              @click="this.$router.push({ path: '/ViewCategoria' })"
              >Gestionar Categorias
            </ion-button>
            <ion-button
              expand="block"
              shape="round"
              @click="this.$router.push({ path: '/ViewTipoPublicacion' })"
              >Gestionar Tipos de Publicación</ion-button
            >
            <ion-button 
              expand="block" 
              shape="round"
              @click="this.$router.push({ path: '/ViewPublicacion' })"
              >Gestionar Publicaciones</ion-button
            >
          </div>
        </ion-accordion>
      </ion-accordion-group>
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
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/vue";
export default {
  name: "Tab4Page",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonButton,
  },
};
</script>
