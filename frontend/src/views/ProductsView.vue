<template>
  <div>
    <div class="text-h4 ml-7 my-2"><p>Courses</p></div>
    <v-divider class="mx-3"></v-divider>
    <div class="container-products">
      <v-card
        v-for="(course, index) in paginatedCourses"
        :key="index"
        @click="mostrarCurso(course.id)"
      >
        <v-img :src="course.image" cover height="400"></v-img>
        <v-card-title class="px-7"
          ><h3>{{ course.name }}</h3></v-card-title
        >
        <v-card-text class="px-7 pb-5">
          {{ course.precio }}
          <v-btn block class="my-2" color="pink-darken-4">Add to cart</v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div class="text-center paginacion">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="4"
        @input="updatePage"
        rounded="circle"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const route = useRouter();

const courses = ref([]);

const currentPage = ref(1);
const itemsPerPage = 3;

const totalPages = computed(() =>
  Math.ceil(courses.value.length / itemsPerPage)
);

const paginatedCourses = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return courses.value.slice(startIndex, startIndex + itemsPerPage);
});

const updatePage = (page) => {
  currentPage.value = page;
};

const mostrarCurso = (id) => {
  route.push(`/products/${id}`);
};

onMounted(() => {
  axios.get("/courses").then((res) => {
    courses.value = res.data;
  });
});
</script>

<style scoped>
.container-products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1% 4%;
  padding: 2%;
}

.paginacion {
  margin-bottom: 2%;
}
@media only screen and (max-width: 1100px) {
  .container-products {
    grid-template-columns: repeat(1, 1fr);
    gap: 0;
  }
  .v-card {
    margin-bottom: 3%;
  }

  .paginacion {
    margin-bottom: 5%;
  }
}
</style>