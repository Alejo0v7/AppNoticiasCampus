import { createRouter, createWebHistory } from "@ionic/vue-router";
/* import { RouteRecordRaw } from 'vue-router'; */
import TabsPage from "../views/TabsPage.vue";
import Tab1Page from "../views/Tab1Page.vue";
import Tab2Page from "../views/Tab2Page.vue";
import Tab3Page from "../views/Tab3Page.vue";
import Tab4Page from "../views/Tab4Page.vue";
import Tab5Page from "../views/Tab5Page.vue";

import ViewRol from "../views/CRUD/ViewRol.vue";
import ViewUsuario from "../views/CRUD/ViewUsuario.vue";
import ViewTipoPublicacion from "../views/CRUD/ViewTipoPublicacion.vue";
import ViewCategoria from "../views/CRUD/ViewCategorias.vue";
import ViewPublicacion from "../views/CRUD/ViewPublicacion.vue";

import LoginView from "../views/LoginView.vue";
import RegistrarseView from "../views/RegistrarseView.vue";
import { Storage } from "@ionic/storage";

const routes /* : Array<RouteRecordRaw> */ = [
  {
    path: "/",
    component: LoginView,
    // Se verifica la sesión antes de activar la ruta
    beforeEnter: async (to, from, next) => {
      let res = await validarAcceso();
      if (res) {
        next("/tabs/tab1"); // Redirección al componente AddStudent
      } else {
        next(); // Se muestra el componente
      }
    },
  },
  {
    path: "/registrarse",
    component: RegistrarseView,
    // Se verifica la sesión antes de activar la ruta
    beforeEnter: async (to, from, next) => {
      let res = await validarAcceso();
      if (res) {
        next("/tabs/tab1"); // Redirección al componente AddStudent
      } else {
        next(); // Se muestra el componente
      }
    },
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/tab1",
      },
      {
        path: "tab1",
        component: Tab1Page,
        beforeEnter: async (to, from, next) => {
          let res = await validarAcceso();
          if (res) {
            next();
          } else {
            next("/");
          }
        },
      },
      {
        path: "tab2",
        component: Tab2Page,
        beforeEnter: async (to, from, next) => {
          let res = await validarAcceso();
          if (res) {
            next();
          } else {
            next("/");
          }
        },
      },
      {
        path: "tab3",
        component: Tab3Page,
        beforeEnter: async (to, from, next) => {
          let res = await validarAcceso();
          if (res) {
            next();
          } else {
            next("/");
          }
        },
      },
      {
        path: "tab5",
        component: Tab5Page,
        beforeEnter: async (to, from, next) => {
          let res = await validarAcceso();
          if (res) {
            next();
          } else {
            next("/");
          }
        },
      },
      {
        path: "tab4",
        component: Tab4Page,
        beforeEnter: async (to, from, next) => {
          let res = await validarAcceso();

          if (res) {
            let rol = await validarRol();
            if (rol == "Admin") {
              next();
            } else {
              next("/tabs/tab1");
            }
          } else {
            next("/");
          }
        },
      },
    ],
  },
  /* Rutas de ADMIN */
  {
    path: "/ViewRol",
    component: ViewRol,
    beforeEnter: async (to, from, next) => {
      let res = await validarAcceso();

      if (res) {
        let rol = await validarRol();
        if (rol == "Admin") {
          next();
        } else {
          next("/tabs/tab1");
        }
      } else {
        next("/");
      }
    },
  },
  {
    path: "/ViewUsuario",
    component: ViewUsuario,
    beforeEnter: async (to, from, next) => {
      let res = await validarAcceso();

      if (res) {
        let rol = await validarRol();
        if (rol == "Admin") {
          next();
        } else {
          next("/tabs/tab1");
        }
      } else {
        next("/");
      }
    },
  },
  {
    path: "/ViewTipoPublicacion",
    component: ViewTipoPublicacion,
    beforeEnter: async (to, from, next) => {
      let res = await validarAcceso();

      if (res) {
        let rol = await validarRol();
        if (rol == "Admin") {
          next();
        } else {
          next("/tabs/tab1");
        }
      } else {
        next("/");
      }
    },
  },
  {
    path: "/ViewCategoria",
    component: ViewCategoria,
    beforeEnter: async (to, from, next) => {
      let res = await validarAcceso();

      if (res) {
        let rol = await validarRol();
        if (rol == "Admin") {
          next();
        } else {
          next("/tabs/tab1");
        }
      } else {
        next("/");
      }
    },
  },
  {
    path: "/ViewPublicacion",
    component: ViewPublicacion,
    beforeEnter: async (to, from, next) => {
      let res = await validarAcceso();

      if (res) {
        let rol = await validarRol();
        if (rol == "Admin") {
          next();
        } else {
          next("/tabs/tab1");
        }
      } else {
        next("/");
      }
    },
  },
];

// Función que verifica la existencia del usuario en el storage,
// para mantener o cerrar la sesión
async function validarAcceso() {
  let storage = new Storage();
  await storage.create();
  let usuario = await storage.get("user");
  // Si existe retorna true, caso contrario false
  return usuario ? true : false;
}

async function validarRol() {
  let storage = new Storage();
  await storage.create();
  let rol = await storage.get("rol");
  return rol;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
