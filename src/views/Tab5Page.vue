<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Noticias y Eventos Destacados</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="show">
        <h2>No Hay Noticias y Eventos Destacados</h2>
      </div>
      <!-- Card -->
      <div v-for="(post, i) in data" :key="i">
        <CardPublicacion
          v-if="post.visible && post.destacado"
          :id="post.id"
          :titulo="post.titulo"
          :subtitulo="post.subtitulo"
          :descripcion="post.descripcion"
          :fecha="post.fecha"
          :destacado="post.destacado"
          :visible="post.visible"
          :imagen="post.imagen"
          :categoria="post.categoria"
          :tipo="post.tipo_publicacion"
          :usuario="post.usuario"
          :createdat="post.created_at"
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
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import axios from "axios";
import CardPublicacion from "../components/publicacion/CardPublicacion.vue";

export default {
  name: "Tab5Page",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CardPublicacion,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      allData: [], // Mantén una copia original de todas las publicaciones
      data: [],
      config: {},
      show: false,
    };
  },
  methods: {
    async getToken() {
      let token = await this.$storage.get("token");
      this.config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      this.ver();
    },
    ver() {
      axios
        .get(this.globalVar + "publicacion/index", this.config)
        .then((response) => {
          let data = response.data;
          this.data = data.data.filter((post) => post.destacado == true);
          this.show = false;
        })
        .catch((error) => {
          console.log("Error: " + error);
          this.data = []; // Vacía el array en caso de error
          this.show = true; // Muestra el mensaje de error
        });
    },
  },

  mounted() {
    this.getToken();
  },
};
</script>
