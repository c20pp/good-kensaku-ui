<template>
  <div>
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const defaultText = ref<string>('hello')

    const text = computed(() => {
      return browser.i18n.getMessage('extName')
    })

    return {
      defaultText,
      text,
    }
  },
})
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
