<template>
  <div class="footer">
    <div>
      <v-btn class="mx-4" variant="text" icon="mdi-instagram" href="https://www.instagram.com/parasaborear" target="_blank"></v-btn>
      <v-btn class="mx-4" variant="text" icon="mdi-facebook" href="https://www.facebook.com/parasaborearsgo" target="_blank"></v-btn>
      <v-btn class="mx-4" variant="text" icon="mdi-whatsapp" href="https://api.whatsapp.com/send?phone=543856978804&text=hola%20quiero%20hacer%20una%20consulta" target="_blank"></v-btn>
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