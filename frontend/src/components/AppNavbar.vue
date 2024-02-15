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
          <v-btn class="my-2" color="pink-darken-4">Shopping Cart</v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-divider class="mx-3"></v-divider>
  </div>
</template>

<script setup>
import logo from "@/assets/logo.png";
</script>