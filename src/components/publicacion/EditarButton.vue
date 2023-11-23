<template>
  <!-- Boton -->
  <ion-button @click="getPublicacion(id)" size="small">
    <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
  </ion-button>
  <!-- Modal del boton -->
  <ion-modal :is-open="Modal">
    <ion-header>
      <ion-toolbar>
        <ion-title>Editar Publicación</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="Modal = false">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <br />
      <ion-input
        label="Título"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="publicacion.titulo"
      >
      </ion-input>
      <br />
      <ion-input
        label="Subtítulo"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="publicacion.subtitulo"
      >
      </ion-input>
      <br />
      <ion-input
        label="Descripción"
        color="primary"
        label-placement="stacked"
        maxlength="400"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="publicacion.descripcion"
      >
      </ion-input>
      <br />
      <ion-input
        label="Fecha"
        color="primary"
        label-placement="stacked"
        type="date"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="publicacion.fecha"
      >
      </ion-input>
      <br />

      <ion-input
        label="Imagen"
        color="primary"
        label-placement="stacked"
        maxlength="500"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="publicacion.imagen"
      >
      </ion-input>
      <br />
      <ion-select
        ustify="space-between"
        label="Categtoria"
        interface="action-sheet"
        placeholder="Selecciona"
        fill="outline"
        shape="round"
        v-model="publicacion.id_categoria"
      >
        <ion-select-option
          v-for="(categoria, i) in categorias"
          :key="i"
          :value="categoria.id"
        >
          {{ categoria.nombre }}
        </ion-select-option>
      </ion-select>
      <br />
      <ion-select
        ustify="space-between"
        label="Tipo de publicación"
        interface="action-sheet"
        placeholder="Selecciona"
        fill="outline"
        shape="round"
        v-model="publicacion.id_tipo_publicacion"
      >
        <ion-select-option
          v-for="(tipo, i) in tipoPublicacion"
          :key="i"
          :value="tipo.id"
        >
          {{ tipo.tipo }}
        </ion-select-option>
      </ion-select>
      <br />
      <ion-list>
        <ion-item>
          <ion-checkbox
            justify="space-between"
            shape="round"
            v-model="publicacion.destacado"
            >Destacada</ion-checkbox
          >
        </ion-item>
        <ion-item>
          <ion-checkbox
            justify="space-between"
            shape="round"
            v-model="publicacion.visible"
            >Visible</ion-checkbox
          >
        </ion-item>
      </ion-list>
      <br />
      <ion-button
        shape="round"
        color="primary"
        expand="block"
        @click="editarPublicacion(publicacion.id)"
      >
        Editar
      </ion-button>
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
} from "@ionic/vue";
import axios from "axios";
import { createOutline } from "ionicons/icons";

export default {
  name: "EditarButton",
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
  },
  props: {
    id: Number,
  },
  data() {
    return {
      createOutline,
      Modal: false,
      publicacion: {},
      categorias: {},
      tipoPublicacion: {},
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
      this.getCategorias(), this.getTipoPublicacion();
    },
    getPublicacion(id) {
      this.Modal = true;
      axios
        .get(this.globalVar + `publicacion/find/${id}`, this.config)
        .then((response) => {
          this.publicacion = response.data.data[0];
          console.log(response);
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
    editarPublicacion(id) {
      if (!this.publicacion["fecha"]) {
        /* Default date */
        var date = new Date();
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });
        var formattedDate = year + "-" + month + "-" + day;
        console.log(formattedDate);
        this.publicacion["fecha"] = formattedDate;
      }
      if (this.publicacion["destacado"] != true) {
        this.publicacion["destacado"] = false;
      }
      if (this.publicacion["visible"] != true) {
        this.publicacion["visible"] = false;
      }

      axios
        .put(
          this.globalVar + `publicacion/update/${id}`,
          this.publicacion,
          this.config
        )
        .then((response) => {
          this.publicacion = response.data.data;
          console.log("Editado");
          console.log(response);
          this.Modal = false;
          location.reload();
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },

    getCategorias() {
      this.categorias = {};
      axios
        .get(this.globalVar + "categoria/index", this.config)
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
        .get(this.globalVar + "tipoPublicacion/index", this.config)
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
    this.getToken();
  },
};
</script>
