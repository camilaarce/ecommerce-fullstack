<template>
  <div class="bg-white">
    <v-row class="px-5">
      <v-col cols="6" class="d-flex justify-start">
        <router-link to="/">
          <img :src="logo" class="my-3" style="height: 100px" />
        </router-link>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        <router-link to="/cart" v-if="authStore.authUser">
          <v-btn class="my-2" color="pink-darken-4"><v-icon icon="mdi-cart"></v-icon>
            <span class="badge" v-if="authStore.cart > 0">{{ authStore.cart }}</span>
          </v-btn>
        </router-link>
        <router-link to="/login" v-if="!authStore.authUser">
          <v-btn class="my-2 ml-2" color="pink-darken-4">
            login
          </v-btn>
        </router-link>
        <v-btn v-else class="my-2 ml-2" color="pink-darken-4" @click="logout">
          logout
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="mx-3"></v-divider>
  </div>
</template>

<script setup>
import logo from "@/assets/logo.png";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();

const router = useRouter();

const logout = () => {
  authStore.logout(router)
}

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