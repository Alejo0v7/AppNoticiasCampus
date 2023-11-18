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
        <ion-col v-if="tipo == 'Evento' || tipo == 'evento' || tipo == 'EVENTO'">
          <b>Fecha de evento: {{ fecha }}</b>
        </ion-col>
      </ion-row>
      <ion-row class="ion-align-items-center">
        <ion-col size="10">
          <!-- Boton de comentarios -->
          <ion-button @click="getPublicacion(id)" size="small" shape="round" color="medium" fill="outline" expand="block">
            <ion-icon slot="start" :icon="chatboxOutline"></ion-icon>
            Comentarios
          </ion-button>
        </ion-col>
        <ion-col size="2">
          <!-- Boton de compartir -->
          <ion-button @click="" size="small" shape="round" color="medium" fill="outline" expand="block">
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
              <b v-if="publicacion.destacado">DESTACADO</b> #{{ publicacion.tipo_publicacion }} #{{ publicacion.categoria
              }}
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
              v-if="publicacion.tipo_publicacion == 'Evento' || publicacion.tipo_publicacion == 'evento' || publicacion.tipo_publicacion == 'EVENTO'">
              <b>Fecha de evento: {{ publicacion.fecha }}</b>
            </ion-col>
          </ion-row>
          <ion-row class="ion-align-items-center">
            <ion-col>
              <ion-input color="medium" fill="outline" shape="round" clear-input="true" placeholder="Escribe algo aquí"
                v-model="comentarios.contenido">
              </ion-input>
            </ion-col>
            <ion-col size="10">
              <!-- Boton de comentarios -->
              <ion-button size="small" shape="round" color="medium" fill="outline" expand="block"
                @click="AgregarComentario">
                <ion-icon slot="start" :icon="chatboxOutline"></ion-icon>
                Comentar
              </ion-button>
            </ion-col>
            <ion-col size="2">
              <!-- Boton de compartir -->
              <ion-button @click="" size="small" shape="round" color="medium" fill="outline" expand="block">
                <ion-icon slot="icon-only" :icon="arrowRedoOutline"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-list >
                <ion-list-header>
                  <ion-label>Comentarios</ion-label>
                </ion-list-header>
                <ion-item v-for="(data, i) in respuesta" :key="i">
                  <ion-label>
                      <ion-grid class="ion-align-items-center">
                        <ion-row>
                          <ion-col size="2">
                            <ion-icon size="large" :icon="personCircleOutline"></ion-icon>
                          </ion-col>
                          <ion-col size="8">
                            {{ data.usuario }} <br>
                            {{ new Date(data.created_at).toLocaleString() }} 
                          </ion-col>  
                          <ion-col size="2">
                            <ion-fab  vertical="center" horizontal="center" :edge="false" >
                              <ion-fab-button size="small" shape="round" color="light" fill="outline" >
                                <ion-icon :icon="ellipsisVerticalOutline" ></ion-icon>
                              </ion-fab-button>
                              <ion-fab-list side="start">
                                <ion-fab-button @click="getComentarios(data.id)">
                                  <ion-icon :icon="createOutline"></ion-icon>
                                </ion-fab-button>
                                <ion-fab-button @click="EliminarComentario(data.id)">
                                  <ion-icon :icon="closeOutline"></ion-icon>
                                </ion-fab-button>
                              </ion-fab-list>
                            </ion-fab>
                          </ion-col>                        
                        </ion-row>
                        <ion-row>
                          <ion-col  size="8">{{ data.contenido }}</ion-col>
                        </ion-row>

                      </ion-grid>
                  </ion-label>
                  
                  <!-- MODAL -->
                  <ion-modal :is-open="ModalDos">
                    <ion-header>
                      <ion-toolbar>
                        <ion-title>Editar Comentario</ion-title>
                        <ion-buttons slot="end">
                          <ion-button @click="ModalDos = false">Cerrar</ion-button>
                        </ion-buttons>
                      </ion-toolbar>
                    </ion-header>
                    <ion-content class="ion-padding">
                      <br>
                      <ion-input color="medium" fill="outline" shape="round" clear-input="true"
                        placeholder="Escribe algo aquí" v-model="comentarios.contenido">
                      </ion-input>
                      <br>
                      <ion-button size="small" shape="round" color="medium" fill="outline" expand="block"
                        @click="editarComentario(comentarios.id)">
                        <ion-icon slot="start" :icon="chatboxOutline"></ion-icon>
                        Editar
                      </ion-button>
                    </ion-content>
                  </ion-modal>

                  <!-- TERMINA MODAL -->
                  
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
  IonItem, IonLabel, IonList, IonListHeader,
  IonFab, IonFabButton, IonFabList,
} from "@ionic/vue";
import {
  personCircleOutline,
  chatboxOutline,
  arrowRedoOutline,
  createOutline,
  closeOutline,
  ellipsisVerticalOutline,
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
    IonItem, IonLabel, IonList, IonListHeader,
    IonFab, IonFabButton, IonFabList,
  },
  data() {
    return {
      personCircleOutline,
      chatboxOutline,
      arrowRedoOutline,
      createOutline,
      closeOutline,
      ellipsisVerticalOutline,
      publicacion: {},
      respuesta: [],
      comentarios: {},
      id_usuario: null,
      id_publicacion: null,
      Modal: false,
      ModalDos: false
    };
  },

  methods: {
    getPublicacion(id) {
      this.Modal = true;
      axios
        .get(this.globalVar + `publicacion/find/${id}`)
        .then((response) => {
          this.publicacion = response.data.data[0];
          this.id_usuario = 202001
          this.id_publicacion = response.data.data[0].id;
          console.log(response);
          this.getData();
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },


    getData() {
      this.respuesta = [];
      axios.get(this.globalVar + "comentario/index")
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.respuesta = res.data.filter(comentarios => comentarios.id_publicacion == this.id_publicacion);
            console.log(this.respuesta);
          }
        });
    },
    getComentarios(id) {
      this.ModalDos = true
      axios
        .get(this.globalVar + `comentario/find/${id}`)
        .then((response) => {
          this.comentarios = response.data.data;
          console.log(response);
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    AgregarComentario() {
      // Petición para insertar datos
      this.comentarios.id_usuario = this.id_usuario
      this.comentarios.id_publicacion = this.id_publicacion
      console.log(this.comentarios);
      axios
        .post(this.globalVar + "comentario/store", this.comentarios)
        .then((response) => {
          let res = response.data;
          this.comentarios = {};
          if (res.code == 200) {
            this.comentarios = res.data;
            console.log("Agregado");
            this.getData();
          }
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    editarComentario(id) {
      this.ModalDos = false

      axios.put(this.globalVar + `comentario/update/${id}`, this.comentarios)
        .then(response => {
          this.comentarios = response.data.data
          console.log('Editado')
          console.log(response)
          this.getData();

        })
        .catch(error => console.log('Ha ocurrido un error' + error))
    },
    EliminarComentario(id) {
        axios.delete(this.globalVar+`comentario/delete/${id}`)
            .then(response => {
                console.log(response)
                console.log('Comentario Eliminado')
                this.getData();

            })
            .catch(error => console.log('Ha ocurrido un error' + error))
        },
  },

  ionViewWillEnter() {
    this.getData();
  },
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
