<template>
  <div class="input-group flex-nowrap" v-bind="$attrs">
    <div class="input-group-text" :id="id" v-if="hasPrefix">
      <slot name="prefix" />
    </div>
    <input :type="password ? 'password' : 'text'" class="form-control" :placeholder="placeholder" :aria-label="placeholder" :aria-describedby="id" v-model="value" >
  </div>
</template>

<script lang="ts">
import LIcon from "@/components/Icons/LIcon.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "BInput",
  components: {LIcon},
  data() {
    return {
      id: uuidv4()
    }
  },
  props: {
    prefix: {
      type: String
    },
    placeholder: {
      type: String
    },
    modelValue: {
      type: String
    },
    password: {
      type: Boolean
    }
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      }
    },
    hasPrefix() {
      return !!this.$slots["prefix"]
    }
  },
  inheritAttrs: false
}
</script>

<style scoped>

</style>
