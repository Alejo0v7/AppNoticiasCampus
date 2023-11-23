<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" class="color">
        <ion-tab-button tab="tab1" href="/tabs/tab1" class="colorI">
          <ion-icon aria-hidden="true" :icon="newspaperOutline" />
          <ion-label>Feed</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2" class="colorI">
          <ion-icon aria-hidden="true" :icon="calendarOutline" />
          <ion-label>Calendario</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3" class="colorI">
          <ion-icon aria-hidden="true" :icon="personOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab5" href="/tabs/tab5" class="colorI">
          <ion-icon aria-hidden="true" :icon="starOutline" />
          <ion-label>Destacados</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="tab4"
          href="/tabs/tab4"
          class="colorI"
          v-if="isAuthorized"
        >
          <ion-icon aria-hidden="true" :icon="keyOutline" />
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
import {
  ellipse,
  square,
  triangle,
  newspaperOutline,
  calendarOutline,
  personOutline,
  starOutline,
  keyOutline,
} from "ionicons/icons";
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
      newspaperOutline,
      calendarOutline,
      personOutline,
      starOutline,
      keyOutline,
      isAuthorized: false,
    };
  },
  methods: {
    async validarRol() {
      let rol = await this.$storage.get("rol");
      if (rol == "Administrador") {
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

<style scoped>
.color {
  /* --background: #e9e9e9; */
  --background-hover: #713abe;
  --background-focused: #713abe;
  --ripple-color: #713abe;
  --color-selected: #363062;
  color: #363062;
}
.colorI {
  /* --background: #e9e9e9; */
  --background-hover: #713abe;
  --background-focused: #713abe;
  --ripple-color: #713abe;
  --color-selected: #713abe;
  --color: #363062;
}
</style>
