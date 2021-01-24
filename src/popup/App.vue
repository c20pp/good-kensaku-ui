<template>
  <div>
    <hello-world />

    <div class="p-grid p-jc-center">
      <Button
        label="Bad"
        icon="pi pi-times"
        class="p-button-danger p-col-3 p-mr-2"
        @click="sendBad"
      ></Button>
      <Button
        label="Good"
        icon="pi pi-check"
        class="p-button-success p-col-3"
        @click="sendGood"
      ></Button>
    </div>
    {{ currentURL }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: { HelloWorld },

  setup() {
    const currentURL = ref('')

    onMounted(async () => {
      const tabs = await browser.tabs.query({
        active: true,
        lastFocusedWindow: true,
      })

      if (typeof tabs[0].url === 'string') {
        const url = new URL(tabs[0].url.split('#')[0])
        currentURL.value = url.toString()
      } else {
        console.error('fail to get url')
      }
    })

    const sendFeedBack = async (evaluation: boolean) => {
      return fetch('http://127.0.0.1:4010/feedback', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: currentURL.value,
          user_evaluation: evaluation,
        }),
      })
    }

    const sendGood = () => {
      return sendFeedBack(true)
    }
    const sendBad = () => {
      return sendFeedBack(false)
    }

    return {
      sendGood,
      sendBad,
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
