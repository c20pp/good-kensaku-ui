<template>
  <div>
    <hello-world />
    <h3>threshold is {{ realThreshold }}</h3>
    <Slider v-model="threshold" :step="1" :min="0" :max="100" />
    <div class="p-grid p-jc-end p-ai-end vertical-container">
      <Button label="save" class="p-col-3 p-mr-4" @click="save"></Button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: { HelloWorld },

  setup() {
    const threshold = ref(50)

    onMounted(async () => {
      browser.storage.sync.get(['threshold']).then(result => {
        threshold.value = 100 * result.threshold
      })
    })

    const save = () => {
      browser.storage.sync.set({ threshold: realThreshold.value })
      window.close()
    }

    const realThreshold = computed(() => {
      return threshold.value / 100
    })

    return {
      threshold,
      realThreshold,
      save,
    }
  },
})
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
.vertical-container {
  margin: 10px;
  height: 275px;
}
</style>
