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
    <v-btn block class="my-2" color="pink-darken-4">Add to cart</v-btn>
  </div>
  <div v-else>
    <NotFound404View />
  </div>
</template>

<script setup>
import { courses } from "../temp-data.js";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import NotFound404View from "./NotFound404View.vue";

const route = useRoute();
const course = ref(null);

onMounted(() => {
  course.value = courses.find((course) => course.id == route.params.productId);
});
</script>