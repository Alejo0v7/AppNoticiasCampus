<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <h3>Tipos de Publicacion</h3>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>ID</ion-col>
      <ion-col>Tipo de Publicacion</ion-col>
      <ion-col>Acciones</ion-col>
    </ion-row>
    <ion-row v-for="(categoria, i) in categorias" :key="i">
      <ion-col>{{ categoria.id }}</ion-col>
      <ion-col>{{ categoria.nombre }}</ion-col>
      <ion-col>
        <ion-button @click="verCategoria(categoria.id, 2)" size="small">
          <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
        </ion-button>

        <ion-button @click="eliminarCategoria(categoria.id)" size="small">
          <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>

  <!-- Modal para editar -->
  <ion-modal :is-open="modalState2" @didDismiss="modalState2 = false">
    <ion-header>
      <ion-toolbar>
        <ion-title>Información de la categoria</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="modalState2 = false">
            <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-input
        label="Nombre"
        color="warning"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        placeholder="Nombre categoria"
        v-model="categoria.nombre"
      ></ion-input>
      <br />
      <ion-button
        shape="round"
        color="warning"
        expand="block"
        @click="editarCategoria(categoria.id)"
      >
        <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
        Guardar cambios
      </ion-button>
    </ion-content>
  </ion-modal>
</template>

<script>
import {
  IonItem,
  IonLabel,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonInput,
  IonButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonToast,
  IonContent,
  onIonViewWillEnter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import {
  eye,
  create,
  trash,
  closeCircle,
  checkmarkOutline,
  informationCircleOutline,
  reload,
  createOutline,
  closeOutline,
} from "ionicons/icons";
import axios from "axios";

export default {
  name: "ListaCategorias",
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonInput,
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonToast,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      categorias: [],
      categoria: {},
      eye,
      create,
      trash,
      closeCircle,
      checkmarkOutline,
      informationCircleOutline,
      createOutline,
      closeOutline,
      modalState1: false,
      modalState2: false,
      config: {},
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
      this.obtenerCategorias();
    },
    obtenerCategorias() {
      axios
        .get("http://127.0.0.1:8000/api/categoria/index", this.config)
        .then((response) => {
          this.categorias = response.data.data;
          console.log(response.data.data);
        });
    },
    verCategoria(id, action) {
      axios
        .get(`http://127.0.0.1:8000/api/categoria/find/${id}`, this.config)
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            // Los datos se guardarán en la variable estudiante
            this.categoria = res.data;
          }
        })
        .catch((error) => console.log("Ha ocurrido un error " + error));
      // Evalua la ventana modal a mostrar
      if (action == 1) {
        this.modalState1 = true; // Cambia a true la variable para mostrar el modal
      } else {
        this.modalState2 = true;
      }
    },
    editarCategoria(id) {
      axios
        .put(
          `http://127.0.0.1:8000/api/categoria/update/${id}`,
          this.categoria,
          this.config
        )
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.modalState2 = false;
            this.obtenerCategorias();
            location.reload();
          }
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    eliminarCategoria(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/categoria/delete/${id}`, this.config)
        .then((response) => {
          let res = response.data;
          if (res.code === 200) {
            this.obtenerCategorias();
            location.reload();
          }
        })
        .catch((error) => console.log("Ha ocurrido un error"));
    },
  },
  mounted() {
    this.getToken();
  },
};
</script>

<style scoped></style>
