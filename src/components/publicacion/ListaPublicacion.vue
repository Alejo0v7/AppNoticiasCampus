<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <h3>Publicaciones</h3>
      </ion-col>
    </ion-row>

    <ion-row class="card" v-for="(data, i) in respuesta" :key="i">
      <div >
        <h3>Título</h3>
        <p>{{ data.titulo }}</p>
        <h3>Subtitulo</h3>
        <p>{{ data.subtitulo }}</p>
        <h4>Acciones</h4>
          <!-- Componentes -->
          <VerButton :id=data.id />
          <EditarButton :id=data.id />
          <EliminarButton :id=data.id />
      </div>
    </ion-row>
  </ion-grid>
</template>

<script>
import {

  IonContent,
  IonGrid,
  IonCol,
  IonRow,

} from "@ionic/vue";

import EditarButton from "./EditarButton.vue";
import EliminarButton from "./EliminarButton.vue";
import VerButton from "./VerButton.vue";


import axios from "axios";
export default {
  name: "ListaPublicacion",
  components: {

    IonContent,
    IonGrid,
    IonCol,
    IonRow,

    EditarButton, EliminarButton, VerButton
  },
  data() {
    return {
      respuesta: [],
    };
  },
  methods: {
    getData() {
      this.respuesta = [];
      axios.get(this.globalVar + "publicacion/index").then((response) => {
        let res = response.data;
        if (res.code == 200) {
          this.respuesta = res.data;
          console.log(this.respuesta);
        }
      });
    },
    
  },
  mounted() {
    this.getData();
  },
  ionViewWillEnter() {
    this.getData();
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
