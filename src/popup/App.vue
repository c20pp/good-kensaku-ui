<template>
  <div>
    <hello-world />

    <div class="p-d-flex p-flex-column">
      <div class="p-d-flex p-jc-center">
        <Button
          label="Bad"
          icon="pi pi-times"
          class="p-button-danger p-mr-2"
          style="width: 100px"
          :disabled="submitted"
          @click="sendBad"
        ></Button>
        <Button
          label="Good"
          icon="pi pi-check"
          class="p-button-success"
          style="width: 100px"
          :disabled="submitted"
          @click="sendGood"
        ></Button>
      </div>
      <div v-if="submitted" style="text-align: center">Thank you feedback!</div>
    </div>
    <div>
      {{ currentURL }}
    </div>
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
    const submitted = ref(false)

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
      submitted.value = true
      return fetch('http://127.0.0.1:8080/api/feedback', {
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
      submitted,
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
