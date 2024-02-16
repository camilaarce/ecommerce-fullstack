import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

import ShoppingCartViewVue from './views/ShoppingCartView.vue'
import ProductsViewVue from './views/ProductsView.vue'
import ProductDetailViewVue from './views/ProductDetailView.vue'
import NotFound404ViewVue from './views/NotFound404View.vue'


import { createPinia } from 'pinia'
import createPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState)

const vuetify = createVuetify({
    components,
    directives,
})

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsiKm_kW1LGgmX1hnh-p-ELWDXi3Fl_Ms",
    authDomain: "ecommerce-fullstack-camilaarce.firebaseapp.com",
    projectId: "ecommerce-fullstack-camilaarce",
    storageBucket: "ecommerce-fullstack-camilaarce.appspot.com",
    messagingSenderId: "611238637761",
    appId: "1:611238637761:web:668d387570f98377ec2440"
};

// Initialize Firebase
initializeApp(firebaseConfig);

createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(VueRouter.createRouter({
        history: VueRouter.createWebHistory(process.env.BASE_URL),
        routes: [{
            path: '/',
            component: ProductsViewVue
        }, {
            path: '/cart',
            component: ShoppingCartViewVue,
        }, {
            path: '/products',
            component: ProductsViewVue
        }, {
            path: '/products/:productId',
            component: ProductDetailViewVue
        }, {
            path: '/:pathMatch(.*)*',
            component: NotFound404ViewVue
        }]
    }))
    .mount('#app')