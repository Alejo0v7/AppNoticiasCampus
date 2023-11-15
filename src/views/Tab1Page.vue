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

      <!-- Variable global -->
      <p>Variable global para api:</p>
      <p>
        <b>{{ globalVar }}</b>
      </p>

      <!-- Card -->
      <div v-for="(post, i) in data" :key="i">
        <CardPublicacion 
        :id=post.id
        :titulo=post.titulo
        :subtitulo=post.subtitulo
        :descripcion=post.descripcion
        :fecha=post.fecha
        :destacado=post.destacado
        :visible=post.visible
        :imagen=post.imagen
        :categoria=post.categoria
        :tipo=post.tipo_publicacion
        :usuario=post.usuario
        :createdat=post.created_at
        />
      </div>
      
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
import axios from "axios";
import CardPublicacion from "../components/publicacion/CardPublicacion.vue";

export default {
  name: "Tab1Page",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CardPublicacion,
  },
  data(){
    return{
      data:{}
    }
  },
  created() {
    /* Ejemplo usando variable global*/
    axios
      .get(this.globalVar + "publicacion/index")
      .then((response) => {
        let data = response.data.data;
        this.data = data
        console.log(this.data);
      })
      .catch((error) => console.log("Error: " + error));
  },
};
</script>
