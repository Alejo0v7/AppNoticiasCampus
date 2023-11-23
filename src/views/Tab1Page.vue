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
      <ion-select
        justify-content="space-between"
        label="Categoría"
        interface="action-sheet"
        placeholder="Selecciona"
        fill="outline"
        shape="round"
        v-model="selectedCategoria"
        @ionChange="filtrarPorCategoria"
        ><ion-select-option :value="null">Todos</ion-select-option>
        <ion-select-option
          v-for="(categoria, i) in categorias"
          :key="i"
          :value="categoria.id"
        >
          {{ categoria.nombre }}
        </ion-select-option>
      </ion-select>
      <div v-if="show && data.length === 0">
        <h2>No Hay Noticias y Eventos para esa Categoria</h2>
      </div>
      <!-- Card -->
      <div v-for="(post, i) in data" :key="i">
        <CardPublicacion
          v-if="post.visible"
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
  name: "Tab1Page",
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
      categorias: [],
      selectedCategoria: null,
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
      this.obtenerCategorias();
    },
    filtrarPorCategoria() {
      if (this.selectedCategoria !== null) {
        axios
          .get(
            this.globalVar + `publicacionesCategoria/${this.selectedCategoria}`,
            this.config
          )
          .then((response) => {
            this.data = response.data.data;
            console.log("Data after filter:", this.data);

            this.show = true;
          })
          .catch((error) => {
            console.log("Error: " + error);
            this.data = []; // Vacías el array en caso de error
            this.show = true; // Muestras el mensaje de error
          });
      } else {
        this.ver();
      }
    },
    obtenerCategorias() {
      axios
        .get(this.globalVar + "categoria/index", this.config)
        .then((response) => {
          this.categorias = response.data.data;
          console.log(response.data.data);
        });
    },
    ver() {
      axios
        .get(this.globalVar + "publicacion/index", this.config)
        .then((response) => {
          let data = response.data;
          this.data = data.data.filter((post) => post.visible == true);
          this.show = true;
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
