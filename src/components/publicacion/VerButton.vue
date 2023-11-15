<template>
  <!-- Boton -->
  <ion-button @click="getPublicacion(id)" size="small">
    <ion-icon slot="icon-only" :icon="readerOutline"></ion-icon>
  </ion-button>
  <!-- Modal del boton -->
  <ion-modal :is-open="Modal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Ver Publicación</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="Modal = false">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-grid>
            <ion-row class="card">
                <div>
                    <ion-img :src="publicacion.imagen" height="10" alt="Imegen relacionada a la publicación"></ion-img>
                    <p v-for="(cat, i) in tipoPublicacion" :key="i">
                        <p v-if="cat.id == publicacion.id_tipo_publicacion">#{{ cat.tipo }}</p>
                    </p>
                    <p v-for="(cat, i) in categorias" :key="i">
                        <p v-if="cat.id == publicacion.id_categoria">#{{ cat.nombre }}</p>
                    </p>
                    <h3>{{publicacion.titulo}}</h3>
                    <h4>{{publicacion.subtitulo}}</h4>
                    <h5>Descripción</h5>
                    <p>{{ publicacion.descripcion }}</p>
                    <h5>Fecha</h5>
                    <p>{{ publicacion.fecha }}</p>     
                    <p v-if="publicacion.destacado">Destacado: Si</p>
                    <p v-else>Destacado: No</p>
                    <p v-if="publicacion.visible">Visible: Si</p>
                    <p v-else>Visible: No</p>
                    <p>Creada: {{ publicacion.created_at }}</p>
                </div>
            </ion-row>
        </ion-grid>

    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonModal,
  IonButtons,
  IonItem,
  IonInput,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonList,
  IonImg,
} from "@ionic/vue";
import axios from "axios";
import { readerOutline } from "ionicons/icons";

export default {
  name: "VerButton",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
    IonModal,
    IonButtons,
    IonItem,
    IonInput,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonList,
    IonImg,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      readerOutline,
      Modal: false,
      publicacion: {},
      categorias: {},
      tipoPublicacion: {},
    };
  },
  methods: {
    getPublicacion(id) {
      this.Modal = true;
      axios
        .get(this.globalVar + `publicacion/find/${id}`)
        .then((response) => {
          this.publicacion = response.data.data;
          console.log(response);
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    
    getCategorias() {
      this.categorias = {};
      axios
        .get(this.globalVar + "categoria/index")
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.categorias = res.data;
            console.log(this.categorias);
          }
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    getTipoPublicacion() {
      this.tipoPublicacion = {};
      axios
        .get(this.globalVar + "tipoPublicacion/index")
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.tipoPublicacion = res.data;
            console.log(this.tipoPublicacion);
          }
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
  },
  mounted() {
    this.getCategorias(), this.getTipoPublicacion();
  },
};
</script>

<style>
.card{
  margin: 4% 0%;
  padding: 4%;
  border-radius: 15px;
  box-shadow: 0px 0px 20px -10px ;
  color: rgb(97, 97, 97);
}

</style>
