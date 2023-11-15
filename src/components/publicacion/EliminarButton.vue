<template>

<!-- Boton -->
<ion-button @click="deletePublicacion(id)" size="small">
    <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
</ion-button>


</template>

<script>
import {
  IonButton,
  IonButtons,
  IonIcon,
} from "@ionic/vue";
import {  closeOutline } from 'ionicons/icons';

import axios from "axios";

export default {
    name: 'EliminarButton',
    components:{
        IonButton,
        IonButtons,
        IonIcon,
    },
    props:{
        id:Number
    },
    data(){
        return{
            closeOutline
        }
    },
    methods:{
        deletePublicacion(id) {
        axios
            .delete(this.globalVar + `publicacion/delete/${id}`)
            .then((response) => {
            console.log(response);
            console.log("Publicacion Eliminada");
            console.log(this.respuesta);
            location.reload()
            })
            .catch((error) => console.log("Ha ocurrido un error" + error));
        },
    }
}
</script>