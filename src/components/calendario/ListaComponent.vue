<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-title class="ion-text-center" style="color: #2c3e50"
          >Eventos</ion-title
        >
      </ion-col>
    </ion-row>

    <ion-row class="ion-justify-content-center">
      <ion-col>
        <ion-list lines="full">
          <ion-item v-for="(data, i) in respuesta" :key="i">
            <ion-card class="custom-card" v-if="data.visible">
              <ion-card-header
                class="ion-text-center"
                style="background-color: #8e44ad"
              >
                <ion-card-title style="color: #ffffff">{{
                  data.titulo
                }}</ion-card-title>
                <ion-card-subtitle style="color: #ecf0f1">{{
                  data.subtitulo
                }}</ion-card-subtitle>
                <ion-card-subtitle style="color: #ecf0f1">{{
                  data.fecha
                }}</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content style="color: #2c3e50">
                {{ data.descripcion }}
              </ion-card-content>
            </ion-card>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonGrid,
  IonCol,
  IonRow,
  IonTitle,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";
import axios from "axios";

export default {
  name: "ListaPublicacion",
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonTitle,
    IonList,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  },
  data() {
    return {
      respuesta: [],
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
      this.getData();
    },
    getData() {
      this.respuesta = [];
      axios
        .get(this.globalVar + "publicacion/index", this.config)
        .then((response) => {
          let res = response.data;
          if (res.code == 200) {
            this.respuesta = res.data.sort(
              (a, b) => new Date(a.fecha) - new Date(b.fecha)
            );
          }
        });
    },
  },
  mounted() {
    this.getToken();
  },
};
</script>

<style scoped>
.custom-card {
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.custom-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
