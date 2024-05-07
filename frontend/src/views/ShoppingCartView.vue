<template>
  <div>
    <div class="text-h4 ml-7 my-2"><p>Shopping cart</p></div>
    <v-divider class="mx-3"></v-divider>
    <div v-if="cartItems.length > 0">
      <div v-for="course in cartItems" :key="course.id" class="mt-5">
        <v-row>
          <v-col cols="5" sm="2">
            <v-img
              :src="axios.getUri() + course.image"
              aspect-ratio="1"
              cover
            ></v-img>
          </v-col>
          <v-col cols="7" sm="4" class="d-flex align-center">
            <div>
              <h2>{{ course.name }}</h2>
              <h3>{{ course.precio }}</h3>
            </div>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex align-center">
            <v-btn block class="my-2" color="pink-darken-4"
              >Remove from cart
              <v-dialog v-model="course.dialog" activator="parent" width="auto">
                <v-card>
                  <v-card-text>
                    Do you want to remove the course {{ course.name }} from the
                    cart?
                  </v-card-text>
                  <div class="text-end pa-4">
                    <v-btn @click="course.dialog = false" variant="text"
                      >Close Dialog</v-btn
                    >
                    <v-btn
                      @click="
                        remove(course.id);
                        course.dialog = false;
                      "
                      color="pink-darken-4"
                      >confirm</v-btn
                    >
                  </div>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
      </div>
      <v-btn block class="my-2" color="pink-darken-4" @click="pagar"
        >Proceed to checkout</v-btn
      >
      <div id="wallet_container"></div>
    </div>
    <div v-else class="text-center mt-5">
      <h2>You current have no items in your cart.</h2>
    </div>
  </div>
</template>

<script setup>
import axios from "../axios-config";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const cartItems = ref([]);

const remove = (id) => {
  axios.delete(`/users/${authStore.authUser}/cart/${id}`).then((res) => {
    cartItems.value = res.data;
    authStore.removeItem();
  });
};

const mp = new MercadoPago("APP_USR-0b2e2909-6745-4512-ac4f-9e4f5ae6ce63", {
  locale: "es-AR",
});

const pagar = () => {
  const price = cartItems.value.reduce((total, item) => total + item.precio, 0);
  axios
    .post("/create_preference", price, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      createCheckoutButton(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createCheckoutButton = (preference) => {
  console.log(preference);
  const preferenceId = preference.id; // Extraer el ID de preferencia de la respuesta

  const bricksBuilder = mp.bricks();
  const renderComponent = () => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    bricksBuilder.create("wallet", "wallet_container", {
      initialization: {
        preferenceId: preferenceId, // Usar el ID de preferencia en la inicialización
      },
    });
  };

  renderComponent();
};

onMounted(() => {
  axios.get(`/users/${authStore.authUser}/cart`).then((res) => {
    cartItems.value = res.data;
    cartItems.value.map((item) => ({ ...item, dialog: false }));
  });
});
</script>