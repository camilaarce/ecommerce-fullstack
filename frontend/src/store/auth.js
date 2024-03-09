
import axios from "../axios-config";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({ authUser: null, cart: 0, authToken: null, error: null }),
    getters: {
        user: (state) => state.authUser,
        cartItems: (state) => state.cart,
        token: (state) => state.authToken,
    },
    actions: {
        async login(form, router) {
            this.authToken = null;
            this.authUser = null;
            this.cart = 0;
            this.error = null;
            localStorage.removeItem('auth');
            await axios
                .post("/login", form)
                .then((res) => {
                    this.authToken = res.data.token;
                    this.authUser = res.data.id;
                    this.obtenerItems();
                    router.push('/')
                })
                .catch((err) => {
                    this.error = err.response.data.error;
                });
        },
        async logout(router) {
            this.authToken = null;
            this.authUser = null;
            this.cart = 0;
            this.error = null;
            router.push("/login");
        },
        addItem() {
            this.cart = this.cart + 1;
        },
        removeItem() {
            this.cart = this.cart - 1;
        },
        async obtenerItems() {
            await axios
                .get(`/users/${this.authUser}/cart`)
                .then((res) => {
                    this.cart = res.data.length;
                })
        }
    },
    persist: true,
});
