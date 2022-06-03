<template>
  <div v-if="token">{{token}}</div>
  <div v-else>No token!</div>
  <input v-model="inEmail" placeholder="email" />
  <input v-model="inPhone" placeholder="phone" />
  <input v-model="inPassword" placeholder="password" />
  <br/>
  <button @click="login">Login</button>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import {useAuthStore} from "@/stores/auth";
  import {inject, ref} from "vue";
  import type {AxiosInstance} from "axios";

  const store = useAuthStore()
  const {token} = storeToRefs(store)

  const inEmail = ref(null)
  const inPhone = ref(null)
  const inPassword = ref(null)

  const backend:AxiosInstance = inject("backendConn")
  function login() {
    backend.post("login", {"email": inEmail.value, "password": inPassword.value})
        .then((res)=>{
          const data = res?.data
          store.token = data.token;
        })
        .catch((err)=>{
          if (err instanceof AxiosError) {
            const data = err?.response?.data

          } else {

          }
        })
  }
</script>

<style scoped>

</style>
