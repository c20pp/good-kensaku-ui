<template>
  <div>
    <hello-world />

    <div class="p-grid p-jc-center">
      <Button
        label="Bad"
        icon="pi pi-times"
        class="p-button-danger p-col-3 p-mr-2"
      ></Button>
      <Button
        @click="sendGood"
        label="Good"
        icon="pi pi-check"
        class="p-button-success p-col-3"
      ></Button>
    </div>
    {{ currentURL }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: { HelloWorld },

  setup() {
    const currentURL = ref('')

    const sendFeedBack = async (evaluation: boolean) => {
      fetch('http://127.0.0.1:4010/feedback', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: currentURL,
          userEvaluation: evaluation,
        }),
      })
    }

    const sendGood = () => {
      browser.tabs
        .query({ active: true, lastFocusedWindow: true })
        .then(tabs => {
          if (typeof tabs[0].url === 'string') {
            currentURL.value = tabs[0].url
          }
        })
      sendFeedBack(true)
    }

    return {
      sendGood,
      currentURL,
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
