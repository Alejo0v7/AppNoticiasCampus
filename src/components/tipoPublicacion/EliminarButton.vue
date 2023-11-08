<template>
  <!-- Boton -->
  <ion-button @click="deleteTipoPublicacion(id)" size="small">
    <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
  </ion-button>
</template>
<script>
import { IonButton, IonButtons, IonIcon } from "@ionic/vue";
import { closeOutline } from "ionicons/icons";

import axios from "axios";

export default {
  name: "ElimnarButton",
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
    };
  },
  methods: {
    deleteTipoPublicacion(id) {
      axios
        .delete(this.globalVar + `tipoPublicacion/delete/${id}`)
        .then((response) => {
          console.log(response);
          console.log("Tipo de Publicacion Eliminado");
          location.reload();
        })
        .catch((error) => console.log("Ha ocurrido un error" + error));
    },
  },
};
</script>
