<template>
  <div class="alert">
    <v-alert
      text="Se agregó el curso al carrito"
      closable
      variant="tonal"
      color="pink-darken-4"
    ></v-alert>
  </div>
</template>

<style scoped>
.alert {
  position: fixed;
  top: 150px;
  right: 1%;
  z-index: 2;
}
</style>