<template>
  <div v-if="course" class="mb-5">
    <AlertAddToCart :text="textAlert" v-if="alert" />
    <v-img
      :src="axios.getUri() + course.image"
      height="500"
      cover
      class="mt-5"
    ></v-img>
    <v-row class="my-2">
      <v-col cols="6">
        <h1>
          {{ course.name }}
        </h1>
      </v-col>
      <v-col cols="6">
        <h1 class="text-right">
          {{ course.precio }}
        </h1>
      </v-col>
    </v-row>
    <p>
      {{ course.descripcion }}
    </p>
    <v-btn block class="my-2" color="pink-darken-4" @click="addToCart()"
      >Add to cart</v-btn
    >
  </div>
  <div v-else>
    <NotFound404View />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import NotFound404View from "./NotFound404View.vue";
import axios from "../axios-config";
import AlertAddToCart from "@/components/AlertAddToCart.vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const route = useRoute();
const course = ref(null);
const alert = ref(false);
const textAlert = ref("");

const addToCart = () => {
  let isIn;
  axios.get(`/users/${authStore.authUser}/cart`).then((res) => {
    isIn = res.data.some((item) => item.id == course.value.id);
    if (isIn) {
      textAlert.value = "Course is already in cart";
      alert.value = true;
    } else {
      axios.post(`/users/${authStore.authUser}/cart`, course.value).then(() => {
        textAlert.value = "Course was added to cart";
        alert.value = true;
        authStore.addItem();
      });
    }
  });
};

onMounted(() => {
  axios.get(`/courses/${route.params.productId}`).then((res) => {
    course.value = res.data;
  });
});
</script>
