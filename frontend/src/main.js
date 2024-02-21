import { createApp, markRaw } from 'vue'
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
import LoginViewVue from './views/LoginView.vue'


import { createPinia } from 'pinia'
import createPersistedState from 'pinia-plugin-persistedstate'
import RegisterViewVue from './views/RegisterView.vue'

const pinia = createPinia()
pinia.use(createPersistedState)

const vuetify = createVuetify({
    components,
    directives,
})

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
        }, {
            path: '/login',
            component: LoginViewVue
        }, {
            path: '/register',
            component: RegisterViewVue
        }]
    }))
    .mount('#app')