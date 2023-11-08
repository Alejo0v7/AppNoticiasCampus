<template>
    <!-- Boton -->
    <ion-button @click="getRoles(id)" size="small">
        <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
    </ion-button>
    <!-- Modal -->
    <ion-modal :is-open="Modal">
        <ion-header>
            <ion-toolbar>
                <ion-title>Editar Roles</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="Modal = false">Cerrar</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <br>
            <ion-input label="Ingresa el nombre del rol" color="primary" label-placement="stacked"
                maxlength="30" counter fill="outline" shape="round" clear-input="true"
                v-model="roles.tipo"></ion-input>
            <br>
            <ion-button shape="round" color="primary" expand="block" @click="editarRol(roles.id)">
                Editar
            </ion-button>
        </ion-content>
    </ion-modal>
    

</template>
<script>

import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonButton, IonModal, IonButtons, IonItem, IonInput,
    IonIcon,
} from '@ionic/vue'
import { createOutline } from 'ionicons/icons';


import axios from 'axios';
export default {
    name:'EditarButton',
    components:{
        IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonButton, IonModal, IonButtons, IonItem, IonInput
        ,IonIcon,
    },
    props:{
        id:Number
    },
    data() {
        return {
            roles: {},
            Modal: false,
            createOutline
        }
    },
    methods:{
        getRoles(id) {
            this.Modal = true

            axios.get(this.globalVar+`tipoUsuario/find/${id}`)
                .then(response => {
                    this.roles = response.data.data
                    console.log(response)
                })
                .catch(error => console.log('Ha ocurrido un error' + error))
        },
        editarRol(id) {
            this.Modal = false

            axios.put(this.globalVar+`tipoUsuario/update/${id}`, this.roles)
                .then(response => {
                    this.roles = response.data.data
                    console.log('Editado')
                    console.log(response)
                    location.reload()

                })
                .catch(error => console.log('Ha ocurrido un error' + error))
        },
    }
}

</script>