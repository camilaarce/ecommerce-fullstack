import { defineStore } from "pinia";
import axios from "../axios-config";

export const useCartStore = defineStore("cart", {
    state: () => ({ cart: 0 }),
    getters: {
        cartItems: (state) => state.cart,
    },
    actions: {
        addItem() {
            this.cart = this.cart + 1;
        },
        removeItem() {
            this.cart = this.cart - 1;
        },
        async obtenerItems() {
            await axios
                .get("/users/0/cart")
                .then((res) => {
                    this.cart = res.data.length;
                })
        }
    },
    persist: true,
});
