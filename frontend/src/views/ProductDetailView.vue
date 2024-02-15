<template>
  <div v-if="course">
    <v-img :src="course.image" height="500" cover></v-img>
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
import axios from "axios";

const route = useRoute();
const course = ref(null);

const addToCart = () => {
  axios.post(`/users/0/cart`, course.value).then((res) => {
    console.log(res.data);
  });
};

onMounted(() => {
  axios.get(`/courses/${route.params.productId}`).then((res) => {
    course.value = res.data;
  });
});
</script>