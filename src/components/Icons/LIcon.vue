<template>
  <i :class="classes" :style="{'font-size': sizePx}"/>
</template>




<script>
export default {
  name: "LIcon",
  props: {
    name: {
      type: String
    },
    size: {
      type: String
    }
  },
  computed: {
    classes() {
      return [
          'lnr',
          `lnr-${this.name}`
      ]
    },
    sizePx() {
      switch (this.size) {
        case "xl": return "60px"
        case "lg": return "45px"
        case "md": return "30px"
        case "sm": return "25px"
        case "xs": return "20px"
      }
    }
  }
}
</script>




<style scoped>

</style>
