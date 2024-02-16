<template>
  <div>
    <alert-add-to-cart :text="textAlert" v-if="alert" />
    <div class="text-h4 ml-7 my-2"><p>Courses</p></div>
    <v-divider class="mx-3"></v-divider>
    <div class="container-products">
      <v-card v-for="(course, index) in paginatedCourses" :key="index">
        <v-img
          :src="axios.getUri() + course.image"
          cover
          height="400"
          @click="mostrarCurso(course.id)"
        ></v-img>
        <v-card-title class="px-7"
          ><h3
            style="
              white-space: nowrap;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ course.name }}
          </h3></v-card-title
        >
        <v-card-text class="px-7 pb-5">
          {{ course.precio }}
          <v-btn
            block
            class="my-2"
            color="pink-darken-4"
            @click="addToCart(course)"
            >Add to cart</v-btn
          >
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
import axios from "../axios-config";
import AlertAddToCart from "@/components/AlertAddToCart.vue";
import { useCartStore } from "@/store/cart";

const cartStore = useCartStore();

const route = useRouter();

const courses = ref([]);

const currentPage = ref(1);
const itemsPerPage = 3;
const alert = ref(false);
const textAlert = ref("");

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

const addToCart = (course) => {
  let isIn;
  axios.get("/users/0/cart").then((res) => {
    isIn = res.data.some((item) => item.id == course.id);
    if (isIn) {
      textAlert.value = "Course is already in cart";
      alert.value = true;
    } else {
      axios.post(`/users/0/cart`, course).then(() => {
        textAlert.value = "Course was added to cart";
        alert.value = true;
        cartStore.addItem();
      });
    }
  });
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
