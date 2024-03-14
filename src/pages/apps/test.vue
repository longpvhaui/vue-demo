<template>
  <div>{{ a }}</div>
  <div> {{ getDate() }}</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/component-api-style
  data: () => new Object({ a: 1, b: 2 }),
  // eslint-disable-next-line vue/component-api-style
  methods: {
    getDate() {
      return new Date().toISOString()
    },
  },
})
</script>

<style lang="scss">

</style>