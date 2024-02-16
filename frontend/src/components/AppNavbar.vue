<template>
  <div class="bg-white">
    <v-row class="px-5">
      <v-col cols="6" class="d-flex justify-start">
        <router-link to="/">
          <img :src="logo" class="my-3" style="height: 100px" />
        </router-link>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <router-link to="/cart">
          <v-btn class="my-2" color="pink-darken-4"
            >Shopping Cart
            <span class="badge" v-if="cartItems > 0">{{ cartItems }}</span>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-divider class="mx-3"></v-divider>
  </div>
</template>

<script setup>
import logo from "@/assets/logo.png";
import { useCartStore } from "@/store/cart";
import { computed, onMounted } from "vue";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);

onMounted(() => {
  cartStore.obtenerItems();
});
</script>

<style scoped>
.badge {
  background-color: white;
  color: #880e4f;
  border-radius: 50%;
  padding: 0.3rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 5px;
}
</style>