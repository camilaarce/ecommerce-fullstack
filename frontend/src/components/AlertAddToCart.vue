<template>
  <div class="alert">
    <v-alert :text="text" closable icon="$info"></v-alert>
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

.v-alert {
  background-color: #ffcbe7;
  color: #880e4f;
  opacity: 0.7;
}
</style>