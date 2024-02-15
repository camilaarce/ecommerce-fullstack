<template>
  <div>
    <div class="text-h4 ml-7 my-2"><p>Shopping cart</p></div>
    <v-divider class="mx-3"></v-divider>
    <div v-if="cartItems.length > 0">
      <div v-for="course in cartItems" :key="course.id" class="mt-5">
        <v-row>
          <v-col cols="5" sm="2">
            <v-img :src="course.image" aspect-ratio="1" cover></v-img>
          </v-col>
          <v-col cols="7" sm="4" class="d-flex align-center">
            <div>
              <h2>{{ course.name }}</h2>
              <h3>{{ course.precio }}</h3>
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-btn
              block
              class="my-2"
              color="pink-darken-4"
              @click="remove(course.id)"
              >Remove from cart</v-btn
            >
          </v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
      </div>
      <v-btn block class="my-2" color="pink-darken-4"
        >Proceed to checkout</v-btn
      >
    </div>
    <div v-else class="text-center mt-5">
      <h2>You current have no items in your cart.</h2>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const cartItems = ref([]);

const remove = (id) => {
  axios.delete(`/users/0/cart/${id}`).then((res) => {
    cartItems.value = res.data;
  });
};

onMounted(() => {
  axios.get(`/users/0/cart`).then((res) => {
    cartItems.value = res.data;
  });
});
</script>