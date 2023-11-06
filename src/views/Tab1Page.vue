<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Noticias y Eventos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Noticias y Eventos</ion-title>
        </ion-toolbar>
      </ion-header>

      <h2>Feed</h2>
      <p>From Vuex: {{ this.$store.getters.getAutor }}</p>
      <!-- Componentes -->

      <p>Texto nuevo</p>
    </ion-content>
  </ion-page>
</template>

<script >
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
export default {
  name:'Tab1Page',
  components:{
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent 
  }
}
</script>
