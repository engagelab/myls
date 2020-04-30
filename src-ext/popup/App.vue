<template>
  <div class="p-2">
    <h1 class="font-bold">Browsing Survey</h1>
    <button v-if="mode == ''" class="btn-myls" @click="start()">Begin</button>
    <div v-if="!submitStatus">

      <!-- The first template requests consent before proceeding-->
      <template v-if="mode == 'consent'">
        <p>Do you consent to the University of Oslo collecting this information?</p>
        <AnswerInput
          mode="binary"
          :value="consented"
          @input="value => consented = value"
        />
        <button class="btn-myls" :class="{ 'btn-disabled': !consented }" @click="giveConsent()" :disabled="!consented">Confirm</button>
      </template>

      <!-- The second template displays general selection of category -->
      <template v-if="mode == 'intro'">
        <p>I. Activities</p>
        <div v-for="(t, index) in tasks" :key="t.id" class="p-2">
          <h2 class="font-bold">{{index}}. {{t.title}}</h2>
          <p class="mb-2">{{t.description}}</p>
          <div v-for="d in t.details">
            <span class="pr-2">{{d.title}}</span>
            <input type="radio" id="yes" :value="true" v-model="d.selected" />
            <label for="yes">Yes</label>
            <input type="radio" id="no" :value="false" v-model="d.selected" />
            <label for="no">No</label>
          </div>
        </div>
        <button class="btn-myls" :class="{ 'btn-disabled': detailItems.length < 1}" @click="selectTasks()" :disabled="detailItems.length < 1">Confirm</button>
      </template>

      <!-- The third template then displays details for one selected category at a time -->
      <template v-if="mode == 'details'">
        <p>II. Resources</p>
        <URLSelection
          :key="detail.id"
          :title="detail.title"
          :taskTitle="detail.taskTitle"
          :description="detail.description"
          :urls="detail.urls"
          @next-detail="updatedList => nextDetail(updatedList, detail)"
        />
      </template>

      <!-- Final template confirms submission of results -->
      <template v-if="mode == 'submit'">
        <p>By clicking 'Submit' you agree to share browser history for the selected URLs with the University of Oslo MyLS Project</p>
        <button class="submitButton" @click="submitChoices()">Submit</button>
      </template>
    </div>
    <div v-else>
      <p>Thank you for your submission!</p>
    </div>
  </div>
</template>

<script>
import URLSelection from './URLSelection.vue'
import AnswerInput from './AnswerInput.vue'

export default {
  name: 'app',
  components: {
    URLSelection,
    AnswerInput
  },
  data() {
    return {
      submitStatus: false,
      domains: [],
      tasks: [],
      detailIndex: 0,
      data: [],
      consented: false,
      mode: '',
    }
  },
  created() {
    // this.getData()
  },
  computed: {
    detailItems() {
      let details = []
      this.tasks.forEach(t => {
        t.details.filter(d => d.selected).forEach(d => details.push(d))
      })
      return details
    },
    detail() {
      return this.detailItems[this.detailIndex]
    }
  },
  methods: {
    start() {
      this.mode = 'consent'
      this.getData()
    },
    // Send the result to our server via the Chrome background script
    submitChoices() {
      const data = { domains: this.domains, type: 'SUBMIT_DOMAINS' }
      chrome.runtime.sendMessage(data)
      this.submitStatus = true
      window.localStorage.setItem('submitStatus', true)
    },
    // Call the server to get the current configuration
    getData() {
      const xhr = new XMLHttpRequest()
      const headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }
      // Event listener must be added before calling open()
      xhr.addEventListener('loadend', () => {
        this.data = xhr.response
        this.configureData()
      })

      const port = process.env.VUE_APP_SERVER_PORT
      const host = process.env.VUE_APP_SERVER_HOST
      const protocol = process.env.VUE_APP_USE_SSL === 'true' ? 'https' : 'http'
      const dataRoute = process.env.VUE_APP_DATA_ROUTE
      const serverURL = `${protocol}://${host}:${port}`
      xhr.open('GET', `${serverURL}${dataRoute}`)
      xhr.responseType = 'json'
      xhr.withCredentials = false
      const headerKeys = Object.keys(headers)
      headerKeys.forEach(k => xhr.setRequestHeader(k, headers[k]))
      try {
        xhr.send()
      } catch (error) {
        console.log(error)
      }
    },
    // Reformat the JSON data to include selectors
    configureData() {
      // this.submitStatus = window.localStorage.getItem('submitStatus') // TODO: Uncomment when debugging is done!
      this.tasks = this.data.map((task, index) => {
        const details = task.details.map((detail, index2) => {
          const selections = {}
          detail.columns.forEach(c => selections[c.name] = c.type == 'binary' ? false : '')
          const urls = detail.urls.map((url, index3) => {
            return {
              id: `url-${index3}`,
              title: url,
              selections
            }
          })
          return {
            id: `detail-${index2}`,
            taskTitle: task.title,
            title: detail.title,
            description: detail.description,
            urls,
            selected: false
          }
        })
        return {
          id: `task-${index}`,
          title: task.title,
          description: task.description,
          details,
          selected: false,
        }
      })
    },
    giveConsent() {
      this.mode = 'intro'
    },
    selectTasks() {
      this.mode = 'details'
    },
    nextDetail(updatedList, detail) {
      detail.urls = updatedList
      if (this.detailIndex < this.detailItems.length - 1) {
        this.detailIndex++
      } else {
        this.mode = 'submit'
      }
    },
  },
}
</script>

<style>
.btn-myls {
  @apply bg-blue-500 text-white text-sm font-bold py-1 px-2 mt-4 rounded;
}
.btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
