<template>
  <div class="p-2">
    <h1 class="font-bold">Browsing Survey</h1>
    <button v-if="mode == ''" class="btn-myls" @click="start()">Begin</button>
    <div v-if="!submitStatus">
      <!-- The first template requests consent before proceeding-->
      <template v-if="mode == 'consent'">
        <p class="pt-2">Do you consent to the University of Oslo collecting this information?</p>
        <AnswerInput mode="binary" :value="consented" @input="value => consented = value" />
        <button
          class="btn-myls"
          :class="{ 'btn-disabled': !consented }"
          @click="giveConsent()"
          :disabled="!consented"
        >Confirm</button>
      </template>

      <!-- The second template displays general selection of category -->
      <template v-if="mode == 'intro'">
        <p class="pt-2">I. Activities</p>
        <div v-for="(t, index) in tasks" :key="t.id" class="p-2">
          <h2 class="font-bold">{{index + 1}}. {{t.title}}</h2>
          <p class="mb-2">{{t.description}}</p>
          <div v-for="d in t.details" :key="d.id" class="flex flex-row pl-2">
            <span class="pr-2">{{d.title}}</span>
            <AnswerInput mode="binary" :value="d.selected" @input="value => d.selected = value" />
          </div>
        </div>
        <button
          class="btn-myls"
          :class="{ 'btn-disabled': detailItems.length < 1}"
          @click="selectTasks()"
          :disabled="detailItems.length < 1"
        >Confirm</button>
      </template>

      <!-- The third template then displays details for one selected category at a time -->
      <template v-if="mode == 'details'">
        <p class="pt-2">II. Resources</p>
        <URLSelection
          :key="detail.id"
          :title="detail.title"
          :taskTitle="detail.taskTitle"
          :description="detail.description"
          :urls="detail.urls"
          :columns="detail.columns"
          :entrytype="detail.entrytype"
          class="p-2"
          @next-detail="updatedList => nextDetail(updatedList, detail)"
        />
      </template>

      <!-- Final template confirms submission of results -->
      <template v-if="mode == 'submit'">
        <p>We will now scan your browser history to count URLs matching only those you selected in the survey</p>
        <p>By clicking 'Submit' you agree to share both your survey answers and selective browser history for the selected URLs with the University of Oslo MyLS Project</p>
        <button class="btn-myls" @click="submitChoices()">Submit</button>
      </template>

      <!-- Error template -->
      <template v-if="mode == 'error'">
        <p>{{errorMessage}}</p>
        <p>Ensure you are running Chrome web browser and have the Extension installed.</p>
        <button class="btn-myls" @click="getExtension()">Get the Chrome extension...</button>
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
const editorExtensionId = process.env.VUE_APP_EXTENSION_ID

export default {
  name: 'app',
  components: {
    URLSelection,
    AnswerInput,
  },
  data() {
    return {
      submitStatus: false,
      domains: [],
      tasks: [],
      detailIndex: 0,
      data: [],
      errorMessage: '',
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
    },
  },
  methods: {
    start() {
      this.mode = 'consent'
      try {
        chrome.runtime.sendMessage(
          editorExtensionId,
          { type: 'HELLO' },
          response => {
            if (!response || !response.success) {
              console.log('Error connecting to Chrome Extension')
              this.errorMessage = 'Chrome Extension not found'
              this.mode = 'error'
            } else {
              this.getData()
            }
          }
        )
      } catch (error) {
        console.log(error)
      }
    },
    // Send the result to our server via the Chrome background script
    submitChoices() {
      const selectedTasks = this.detailItems
      const data = this.detailItems
        .map(d => d.urls.filter(u => u.selections.selected))
        .reduce((acc, curr) => acc.concat(curr))
      const request = { data, type: 'SUBMIT' }
      chrome.runtime.sendMessage(editorExtensionId, request, response => {
        if (!response.success) {
          console.log('Error sending data to server')
          // this.errorMessage = 'Error sending data'
          // this.mode = 'error'
        } else {
          this.submitStatus = true
          window.localStorage.setItem('submitStatus', true)
        }
      })
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

      const dataRoute = process.env.VUE_APP_DATA_ROUTE
      const serverURL = process.env.VUE_APP_FULL_SERVER
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
          const urls = detail.urls.map((url, index3) => {
            const selections = { selected: false }
            detail.columns.forEach(
              c => (selections[c.name] = c.type == 'binary' ? false : '')
            )
            return {
              id: `url-${index3}`,
              title: url,
              selections,
              info: `${task.title} : ${detail.title}`,
            }
          })
          return {
            id: `detail-${index2}`,
            taskTitle: task.title,
            title: detail.title,
            description: detail.description,
            urls,
            columns: detail.columns,
            entrytype: detail.entrytype || 'select',
            selected: false,
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
    getExtension() {
      window.open(process.env.VUE_APP_CHROME_STORE_EXTENSION_URL, '_blank')
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
  @apply bg-blue-500 text-white text-sm font-bold py-1 px-2 rounded;
}
.btn-disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
