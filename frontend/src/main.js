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
import { useAuthStore } from './store/auth'

const pinia = createPinia()
pinia.use(createPersistedState)

const vuetify = createVuetify({
    components,
    directives,
})

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/',
        component: ProductsViewVue
    }, {
        path: '/cart',
        component: ShoppingCartViewVue,
        meta: { requiresAuth: true }
    }, {
        path: '/products',
        component: ProductsViewVue
    }, {
        path: '/products/:productId',
        component: ProductDetailViewVue
    }, {
        path: '/login',
        component: LoginViewVue
    }, {
        path: '/register',
        component: RegisterViewVue
    }, {
        path: '/:pathMatch(.*)*',
        component: NotFound404ViewVue
    }]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (useAuthStore.authUser) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mount('#app')