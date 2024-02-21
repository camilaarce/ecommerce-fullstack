<template>
    <div style="display: grid; place-items: center; width: 100vw;">
        <v-card class="card-login">
            <v-card-title class="text-center text-h4 mb-5">
                <p>Login</p>
            </v-card-title>
            <p class="text-error">{{ authStore.error }}</p>
            <v-form @submit.prevent="login" v-model="form">
                <v-text-field label="Email" placeholder="Enter your email" v-model="email"
                    :rules="[rules.required]"></v-text-field>
                <v-text-field label="Password" placeholder="Enter your password" type="password" v-model="pass"
                    :rules="[rules.required]"></v-text-field>
                <v-btn block color="pink-darken-4" type="submit" :disabled="!form">
                    <p v-if="!loading">login</p>
                    <v-progress-circular indeterminate :size="25" :width="2" v-else></v-progress-circular>
                </v-btn>
            </v-form>
            <div class="text-right">
                <v-btn variant="text">Create a account</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from '@/store/auth';
import { onMounted } from "vue";
import { watch } from "vue";

const authStore = useAuthStore();

const router = useRouter();

const email = ref(null);
const pass = ref(null);

const form = ref(false);

const rules = { required: value => !!value || 'Obligatory field' }

const loading = ref(false);

const login = async () => {
    loading.value = true;
    const user = {
        'email': email.value,
        'password': pass.value
    }
    await authStore.login(user, router)
}

onMounted(() => {
    authStore.error = null;
})

watch(() => authStore.error, (newError) => {
    if (newError !== null) {
        loading.value = false;
    }
});
</script>

<style scoped>
.card-login {
    width: 50vw;
    min-width: 350px;
    padding: 3%;
}
</style>