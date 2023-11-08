<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Roles de Usuario
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <!-- Componentes -->
            <AgregarRoles/>
            <ListaRoles/>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import AgregarRoles from '../../components/Roles/AgregarRoles.vue';
import ListaRoles from '../../components/Roles/ListaRoles.vue';

export default {
    name: 'ViewRol',
    components: { IonButton, AgregarRoles, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, ListaRoles  },
    data() {
        return {
            motrarComponente: false
        }
    },

}
</script>