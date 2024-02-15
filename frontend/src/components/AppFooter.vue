<template>
  <v-footer class="bg-pink-darken-4 d-flex flex-column py-5">
    <div>
      <v-btn class="mx-4" variant="text" icon="mdi-instagram"></v-btn>
      <v-btn class="mx-4" variant="text" icon="mdi-facebook"></v-btn>
      <v-btn class="mx-4" variant="text" icon="mdi-whatsapp"></v-btn>
    </div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>Para Saborear</strong></div>
  </v-footer>
</template>