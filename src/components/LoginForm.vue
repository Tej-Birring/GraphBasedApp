<template>
  <div v-if="token">
    <div v-if="store?.userName.length < 1">
      You are logged in as <em>an unnamed user.</em>
    </div>
    <div v-else>
      You are logged in as <em>{{store?.userName}}</em>
    </div>
    {{store?.userInfo}}
    <button class="btn btn-primary" @click="logout">Log out</button>
  </div>


  <div v-else>
    <b-input placeholder="email" v-model="inEmail">
      <template #prefix>
        <l-icon name="envelope" size="md"/>
      </template>
    </b-input>
    <b-input prefix="" placeholder="phone" v-model="inPhone">
      <template #prefix>
        <l-icon name="phone-handset" size="md"/>
      </template>
    </b-input>
    <b-input prefix="" placeholder="password" v-model="inPassword" password>
      <template #prefix>
        <l-icon name="lock" size="md"/>
      </template>
    </b-input>
    <button class="btn btn-primary" @click="login">Log in</button>
  </div>

  <button class="btn btn-secondary" @click="refreshToken">Refresh Token</button>
  <div class="alert alert-danger" v-if="errorMsg">{{errorMsg}}</div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import {useAuthStore} from "@/stores/auth";
  import {inject, ref, computed} from "vue";
  import {AxiosError} from "axios";
  import type {AxiosInstance} from "axios";
  import BInput from "@/components/Bootstrap/BInput.vue";
  import LIcon from "@/components/Icons/LIcon.vue";

  const store = useAuthStore()
  const {token} = storeToRefs(store)


  const inEmail = ref(null)
  const inPhone = ref(null)
  const inPassword = ref(null)

  const errorMsg = ref(null)

  const backend = inject("backend")
  const login = async () => { errorMsg.value = await backend.login(inEmail.value, inPhone.value, inPassword.value) }
  const logout = backend.logout
  const refreshToken = async () => { errorMsg.value = await backend.refreshToken() }
</script>

<style scoped>

</style>
