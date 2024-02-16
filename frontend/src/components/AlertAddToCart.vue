<template>
  <div class="alert">
    <v-alert
      :text="text"
      closable
      variant="tonal"
      color="pink-darken-4"
    ></v-alert>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["text"]);
</script>

<style scoped>
.alert {
  position: fixed;
  top: 150px;
  right: 1%;
  z-index: 2;
}
</style>