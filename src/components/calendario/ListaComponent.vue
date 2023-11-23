<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <br />
        <ion-title class="ion-text-center">Eventos</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-justify-content-center">
      <ion-col>
        <ion-list lines="full">
          <ion-item v-for="(data, i) in respuesta" :key="i">
            <ion-card
              class="custom-card"
              v-if="data.visible && data.tipo_publicacion == 'Evento'"
            >
              <ion-card-header class="ion-text-center">
                <ion-card-title>{{ data.titulo }}</ion-card-title>
                <ion-card-subtitle>{{ data.subtitulo }}</ion-card-subtitle>
                <ion-card-subtitle>{{ data.fecha }}</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content class="ion-text-center">
                <br />
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
ion-card {
  width: 100%;
}
.custom-card {
  box-shadow: 0px 0px 20px -10px;
  border-radius: 15px;
  width: 100%;
}
ion-card-header {
  background-color: 255, 241, 242;
}
</style>
