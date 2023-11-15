<template>

  <div class="card">
    <ion-grid>
      <ion-row class="ion-align-items-center">
        <ion-col size="2">
          <ion-icon size="large" :icon="personCircleOutline"></ion-icon>
        </ion-col>
        <ion-col>
          <b>{{ usuario }}</b> <br />
          {{ new Date(createdat).toLocaleString() }}
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col>
          <b v-if="destacado">DESTACADO</b> #{{ tipo }} #{{ categoria }}
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col>
          <ion-img :src="imagen" alt="Portada"></ion-img>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col>
          <b>{{ titulo }}</b> <br />
          <i>{{ subtitulo }}</i>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col size="12">
          {{ descripcion }}
        </ion-col>
        <ion-col
          v-if="tipo == 'Evento' || tipo == 'evento' || tipo == 'EVENTO'"
        >
          <b>Fecha de evento: {{ fecha }}</b>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col size="10">
          <!-- Boton de comentarios -->
          <ion-button
            @click="getPublicacion(id)"
            size="small"
            shape="round"
            color="medium"
            fill="outline"
            expand="block"
          >
            <ion-icon slot="start" :icon="chatboxOutline"></ion-icon>
            Comentarios
          </ion-button>
        </ion-col>
        <ion-col size="2">
          <!-- Boton de compartir -->
          <ion-button
             @click=""
            size="small"
            shape="round"
            color="medium"
            fill="outline"
            expand="block"
          >
            <ion-icon slot="icon-only" :icon="arrowRedoOutline"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>

  <!-- Modal -->
  <ion-modal :is-open="Modal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Publicación</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="Modal = false">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding"> 
        <div class="card">
            <ion-grid>
            <ion-row class="ion-align-items-center">
                <ion-col size="2">
                <ion-icon size="large" :icon="personCircleOutline"></ion-icon>
                </ion-col>
                <ion-col>
                <b>{{ publicacion.usuario }}</b> <br />
                {{ new Date(publicacion.created_at).toLocaleString() }}
                </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center">
                <ion-col>
                <b v-if="publicacion.destacado">DESTACADO</b> #{{ publicacion.tipo_publicacion }} #{{ publicacion.categoria }}
                </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center">
                <ion-col>
                <ion-img :src="publicacion.imagen" alt="Portada"></ion-img>
                </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center">
                <ion-col>
                <b>{{ publicacion.titulo }}</b> <br />
                <i>{{ publicacion.subtitulo }}</i>
                </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center">
                <ion-col size="12">
                {{ publicacion.descripcion }}
                </ion-col>
                <ion-col
                v-if="publicacion.tipo_publicacion == 'Evento' || publicacion.tipo_publicacion == 'evento' || publicacion.tipo_publicacion == 'EVENTO'"
                >
                <b>Fecha de evento: {{ publicacion.fecha }}</b>
                </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center">
                <ion-col>
                    <ion-input
                        color="medium"
                        fill="outline"
                        shape="round"
                        clear-input="true"
                        placeholder="Escribe algo aquí"
                    >
                    </ion-input>
                </ion-col>
                <ion-col size="10">
                <!-- Boton de comentarios -->
                <ion-button
                    
                    size="small"
                    shape="round"
                    color="medium"
                    fill="outline"
                    expand="block"
                    
                >
                    <ion-icon slot="start" :icon="chatboxOutline"></ion-icon>
                    Comentar
                </ion-button>
                </ion-col>
                <ion-col size="2">
                <!-- Boton de compartir -->
                <ion-button
                    @click=""
                    size="small"
                    shape="round"
                    color="medium"
                    fill="outline"
                    expand="block"
                >
                    <ion-icon slot="icon-only" :icon="arrowRedoOutline"></ion-icon>
                </ion-button>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <ion-list>

                        <ion-item>
                            <ion-label>User 1: Comentario 1</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>User 2: Comentario 2</ion-label>
                        </ion-item>
                        
                    </ion-list>
                </ion-col>
            </ion-row>
            </ion-grid>
        </div>
    </ion-content>
  </ion-modal>
</template>
<script>
import {
  IonGrid,
  IonCol,
  IonRow,
  IonIcon,
  IonImg,
  IonButton,

  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonModal,
  IonButtons,
  IonInput,
  IonItem, IonLabel, IonList 
} from "@ionic/vue";
import {
  personCircleOutline,
  chatboxOutline,
  arrowRedoOutline,
} from "ionicons/icons";
import axios from "axios";

export default {
  name: "CardPublicacion",
  props: {
    id: Number,
    titulo: String,
    subtitulo: String,
    descripcion: String,
    fecha: String,
    destacado: Number,
    visible: Number,
    imagen: String,
    categoria: String,
    tipo: String,
    usuario: String,
    createdat: String,
  },
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonIcon,
    IonImg,
    IonButton,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonModal,
    IonButtons,
    IonInput,
    IonItem, IonLabel, IonList 
  },
  data() {
    return {
      personCircleOutline,
      chatboxOutline,
      arrowRedoOutline,
      publicacion:{},
    Modal: false,
    };
  },

  methods:{
    getPublicacion(id) {
      this.Modal = true;
      axios
        .get(this.globalVar + `publicacion/find/${id}`)
        .then((response) => {
          this.publicacion = response.data.data[0];
          console.log(response);
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
  }
};
</script>
<style>
.card {
  margin: 4% 0%;
  padding: 4%;
  border-radius: 15px;
  box-shadow: 0px 0px 20px -10px;
  color: rgb(97, 97, 97);
}
</style>
