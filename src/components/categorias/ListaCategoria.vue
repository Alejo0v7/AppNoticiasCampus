<template>
  <ion-list>
    <ion-item-sliding v-for="(categoria, i) in categorias" :key="i">
      <ion-item>
        <ion-label>{{ categoria.nombre }}</ion-label>
      </ion-item>
      <ion-item-options slot="end">
        <ion-item-option color="tertiary" @click="verCategoria(categoria.id, 1)">
          <ion-icon slot="icon-only" :icon="eye"></ion-icon>
        </ion-item-option>
        <ion-item-option color="success" @click="verCategoria(categoria.id, 2)">
          <ion-icon slot="icon-only" :icon="create"></ion-icon>
        </ion-item-option>
        <ion-item-option color="danger" @click="eliminarCategoria(categoria.id)">
          <ion-icon slot="icon-only" :icon="trash"></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>

  <!-- Modal para mostrar las categorias -->
  <ion-modal :is-open="modalState1" @didDismiss="modalState1=false">
    <ion-header>
      <ion-toolbar>
      <ion-title>Información categorias</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="modalState1=false">
          <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
        </ion-button>
      </ion-buttons>
      </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-icon slot="start" :icon="personCircle"></ion-icon>
              <ion-label>ID: {{ categoria.id }}</ion-label>
          </ion-item> 
          <ion-item>
            <ion-icon slot="start" :icon="personCircle"></ion-icon>
              <ion-label>Nombre:{{ categoria.nombre }}</ion-label>
          </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>


  <!-- Modal para editar -->
  <ion-modal :is-open="modalState2" @didDismiss="modalState2=false">
    <ion-header>
      <ion-toolbar>
        <ion-title>Información de la categoria</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="modalState2=false">
            <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
    <ion-input
    label="Nombre"
    color="warning"
    label-placement="stacked"
    maxlength="30"
    counter
    fill="outline"
    shape="round"
    clear-input="true"
    placeholder="Nombre categoria"
    v-model="categoria.nombre"
    ></ion-input>
    <br>
    <ion-button shape="round" color="warning" expand="block"
    @click="editarCategoria(categoria.id)">
    <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
    Guardar cambios
    </ion-button>
  </ion-content>
  </ion-modal>


</template>

<script>
import { IonItem, IonLabel, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonInput, IonButton, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonToast, IonContent, onIonViewWillEnter } from '@ionic/vue';
import { eye, create, trash, closeCircle, checkmarkOutline, informationCircleOutline, reload } from "ionicons/icons";
import axios from 'axios';
import { callWithErrorHandling } from 'vue';

export default {
  name: 'ListaCategorias',
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonInput,
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonToast,
    IonContent
  },
  data() {
    return {
      categorias: [],
      eye, create, trash, closeCircle, checkmarkOutline, informationCircleOutline,
      modalState1: false,
      modalState2: false,
      categoria: {}
    };
  },
//   created() {
//     this.obtenerCategorias();
//   },
  methods: {
    async obtenerCategorias() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categoria/index');
        if (response.data.code === 200) {
          this.categorias = response.data.data;
        } else {
          console.error('Error en la respuesta del servidor');
        }
      } catch (error) {
        console.error('Ha ocurrido un error ' + error);
      }
    },
    verCategoria(id, action) {
      axios.get(`http://127.0.0.1:8000/api/categoria/find/${id}`)
        .then(response => {
          let res = response.data
          if(res.code==200){
          // Los datos se guardarán en la variable estudiante
          this.categoria = res.data
          }
        })
        .catch(error => console.log('Ha ocurrido un error ' + error))
        // Evalua la ventana modal a mostrar
        if(action==1){
        this.modalState1 = true // Cambia a true la variable para mostrar el modal
        }else {
          this.modalState2 = true
        }
    },
    editarCategoria(id) {
      axios.put(`http://127.0.0.1:8000/api/categoria/update/${id}`, this.categoria)
        .then(response => {
          let res = response.data
          if(res.code==200){
        // Se cambia la visibilidad y el mensaje del toast
          // this.toastState = true
          // this.toastMessage = res.data
        // Se cambia la visibilidad del modal para ocultarlo
          this.modalState2 = false
        // Se invoca la petición para actualizar la lista
          this.obtenerCategorias()
        }
        })
        .catch(error => console.log('Ha ocurrido un error'))
    },
    eliminarCategoria(id) {
      axios.delete(`http://127.0.0.1:8000/api/categoria/delete/${id}`)
        .then(response => {
          let res = response.data;
          if (res.code === 200) {
            this.obtenerCategorias();
          }
        })
        .catch(error => console.log('Ha ocurrido un error'));
    },
  },
  mounted(){
    this.obtenerCategorias()
  },
  onIonViewWillEnter(){
    this.obtenerCategorias()
  }
};
</script>

<style scoped>
</style>
