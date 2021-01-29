<template>
  <div>
    <hello-world />
    <div class="p-d-flex p-flex-column">
      <h3>threshold is {{ realThreshold }}</h3>
      <Slider
        v-model="threshold"
        :step="1"
        :min="0"
        :max="100"
        class="p-d-flex"
      />
      <div>
        <Button label="save" class="p-d-flex" @click="save"></Button>
      </div>
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
</style>
