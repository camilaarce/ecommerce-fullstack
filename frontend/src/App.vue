<template>
  <v-app>
    <AppNavbar class="navbar" />
    <v-main class="container">
      <router-view class="children"></router-view>
    </v-main>
    <AppFooter class="footer" />
  </v-app>
</template>

<script setup>
import AppFooter from "./components/AppFooter.vue";
import AppNavbar from "./components/AppNavbar.vue";
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #b8fffb;
}

*::-webkit-scrollbar-thumb {
  background-color: #880e4f;
  border-radius: 20px;
}

.container {
  display: grid;
  place-items: center;
  margin-top: 150px;
}

.children {
  width: 75vw;
  height: 100%;
}

.navbar {
  top: 0;
  width: 100%;
  z-index: 1000;
  position: fixed;
}
</style>