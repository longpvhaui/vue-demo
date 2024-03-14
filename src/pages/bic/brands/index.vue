<template>
  <div class="custom">
    {{ greeting }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/component-api-style
  data() {
    return {
      brandName: 'Hello!',
      message: ' BIC',
    }
  },
  // eslint-disable-next-line vue/component-api-style
  computed: {
    greeting() {
      return  this.brandName + this.message
    },
  },
  // eslint-disable-next-line vue/component-api-style
  mounted() {
    this.greeting // type: string
  },
})
</script>

<style>
     @import './index.scss';
</style>