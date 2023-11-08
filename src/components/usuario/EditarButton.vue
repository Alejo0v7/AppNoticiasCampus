<template>
<!-- Boton -->
<ion-button @click="getUsuario(id)" size="small">
    <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
</ion-button>
<!-- Modal del boton -->
<ion-modal :is-open="Modal">
    <ion-header>
    <ion-toolbar>
        <ion-title>Editar Usuario</ion-title>
        <ion-buttons slot="end">
        <ion-button @click="Modal = false" >Cerrar</ion-button>
        </ion-buttons>
    </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
    <br>
    <ion-input
        label="Ingresa el carnet del usuario"
        color="primary"
        label-placement="stacked"
        maxlength="6"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="usuario.carnet"
    >
    </ion-input>
    <br>
    <ion-input
        label="Ingresa el correo del usuario"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="usuario.correo"
    >
    </ion-input>
    <ion-input
        label="Ingresa el usuario del usuario"
        color="primary"
        label-placement="stacked"
        maxlength="30"
        counter
        fill="outline"
        shape="round"
        clear-input="true"
        v-model="usuario.usuario"
    >
    </ion-input>
    <br>
    <ion-select ustify="space-between" label="Tipo de usuario" interface="action-sheet" placeholder="Selecciona"
        fill="outline" shape="round" v-model="usuario.tipo_usuario" >
        <ion-select-option v-for="(tipo, i) in dataTipoUsuario" :key="i" :value="tipo.id">
            {{ tipo.tipo }}
        </ion-select-option>
    </ion-select>
    <br>
    <ion-button
        shape="round"
        color="primary"
        expand="block"
        @click="editarUsuario(usuario.carnet)"
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
  IonSelect, IonSelectOption ,
} from "@ionic/vue";
import axios from "axios";
import { createOutline } from 'ionicons/icons';

export default{
    name:'EditarButton',
    components:{
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
        IonSelect, IonSelectOption ,
    },
    props:{
        id:Number
    },
    data(){
        return{
            createOutline,
            usuario: {},
            Modal: false,
            dataTipoUsuario : {}
        }
    },
    methods:{
        getUsuario(id) {
        this.Modal = true;
        axios
            .get(this.globalVar + `usuario/find/${id}`)
            .then((response) => {
            this.usuario = response.data.data;
            console.log(response);
            })
            .catch((error) => console.log("Ha ocurrido un error" + error));
        },
        editarUsuario(id) {
            this.Modal = false;
            axios
                .put(this.globalVar + `usuario/update/${id}`, this.usuario)
                .then((response) => {
                this.usuario = response.data.data;
                console.log("Editado");
                console.log(response);
                location.reload()
                })
                .catch((error) => console.log("Ha ocurrido un error" + error));
            },
        getTipoUsuario() {
            this.dataTipoUsuario = {};
            axios.get(this.globalVar + "tipoUsuario/index")
            .then((response) => {
                let res = response.data;
                if (res.code == 200) {
                this.dataTipoUsuario = res.data;
                console.log(this.dataTipoUsuario);
                }
            }).catch(error => console.log('Ha ocurrido un error' + error));
        },
    },
    mounted(){
        this.getTipoUsuario()
    }
}

</script>