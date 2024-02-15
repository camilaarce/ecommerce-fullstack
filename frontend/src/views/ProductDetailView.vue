<template>
  <div v-if="course" class="mb-5">
    <v-alert
      v-if="alert"
      text="Se agregó el curso al carrito"
      variant="tonal"
      closable
      color="pink-darken-4"
    ></v-alert>
    <v-img
      :src="axios.getUri() + '/' + course.image"
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

const route = useRoute();
const course = ref(null);
const alert = ref(false);

const addToCart = () => {
  axios.post(`/users/0/cart`, course.value).then(() => {
    alert.value = true;
  });
};

onMounted(() => {
  axios.get(`/courses/${route.params.productId}`).then((res) => {
    course.value = res.data;
  });
});
</script>