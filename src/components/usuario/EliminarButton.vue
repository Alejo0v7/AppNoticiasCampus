<template>
  <!-- Boton -->
  <ion-button @click="deleteUsuario(id)" size="small">
    <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
  </ion-button>
</template>

<script>
import { IonButton, IonButtons, IonIcon } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";

import axios from "axios";

export default {
  name: "EliminarButton",
  components: {
    IonButton,
    IonButtons,
    IonIcon,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      closeOutline,
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
    },
    deleteUsuario(id) {
      axios
        .delete(this.globalVar + `usuario/delete/${id}`, this.config)
        .then((response) => {
          console.log(response);
          console.log("Usuario Eliminado");
          console.log(this.respuesta);
          location.reload();
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
  },
  mounted() {
    this.getToken();
  },
};
</script>
