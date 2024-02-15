<template>
  <div class="footer">
    <div>
      <v-btn class="mx-4" variant="text" icon="mdi-instagram"></v-btn>
      <v-btn class="mx-4" variant="text" icon="mdi-facebook"></v-btn>
      <v-btn class="mx-4" variant="text" icon="mdi-whatsapp"></v-btn>
    </div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>Para Saborear</strong></div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #880e4f;
  color: white;
  height: 10vh;
  display: grid;
  place-items: center;
}
</style>