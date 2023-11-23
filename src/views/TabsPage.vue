<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Feed</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Calendario</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab5" href="/tabs/tab5">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Destacados</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/tab4" v-if="isAuthorized">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Admin</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { ellipse, square, triangle } from "ionicons/icons";
export default {
  name: "TabsPage",
  components: {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  data() {
    return {
      ellipse,
      square,
      triangle,
      isAuthorized: false,
    };
  },
  methods: {
    async validarRol() {
      let rol = await this.$storage.get("rol");
      if (rol == "Admin") {
        this.isAuthorized = true;
      } else {
        this.isAuthorized = false;
      }
    },
  },
  mounted() {
    this.validarRol();
  },
};
</script>
