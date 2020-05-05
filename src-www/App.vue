<template>
  <div>
    <div class="flex flex-row bg-gray-300 p-2">
      <img src="./assets/icons/icon_32.png">
      <h1 class="font-bold text-lg w-full pl-4">Learning Practices Survey</h1>
    </div>
    <button v-if="mode == ''" class="btn-myls m-4" @click="start()">Begin</button>
    <div v-if="!submitStatus" class="m-4">
      <!-- The first template requests consent before proceeding-->
      <template v-if="mode == 'consent'">
        <h1 class="font-bold text-lg">Informed consent</h1>
        <p
          class="mt-4"
        >Thank you for agreeing to participate in the project, ‘Exploring undergraduate students’ learning with non-curricular resources and digital tools’!</p>
        <p
          class="mt-4"
        >Please, read about the project and how it collects, stores and processes data in the Information Letter that you can find <span class="text-blue-600 cursor-pointer" @click="mode = 'tandc'">here</span>.</p>

        <p class="mt-4">
          I have received and understood information about the project <i>exploring undergraduate students’ learning with non-curricular resources and digital tools</i> and have been given the opportunity to ask questions. I give consent:
          <ul class="list-disc list-inside m-2">
            <li>To participate in a survey</li>
            <li>To provide access to the web browsing history of the websites I declare to use during the survey</li>
            <li>To participate in an interview</li>
          </ul>
          </p>
          <p class="mt-4">I give consent for my personal data to be processed until the end date of the project, approx. January 2021.
        </p>
        <div class="flex flex-row p-4">
          <AnswerInput mode="text" placeholder="user@example.com" :value="email" @input="value => email = value" />
          <AnswerInput mode="binary" :value="consented" @input="value => consented = value" />
          <button
            class="btn-myls"
            :class="{ 'btn-disabled': !consented || !email }"
            @click="giveConsent()"
            :disabled="!consented"
          >Confirm</button>
        </div>
      </template>

      <template v-if="mode == 'tandc'">
        <TandC></TandC>
        <button class="btn-myls mt-4 ml-2" @click="mode = 'consent'">Back</button>
      </template>

      <!-- The second template displays general selection of category -->
      <template v-if="mode == 'activities'">
        <p class="pt-2 underline">Activities</p>
        <div class="p-2">
          <h2 class="font-bold">{{taskIndex + 1}}. {{tasks[taskIndex].title}}</h2>
          <p class="mb-2">{{tasks[taskIndex].description}}</p>
          <div v-for="d in tasks[taskIndex].details" :key="d.id" class="flex flex-row pl-2">
            <span class="pr-2">{{d.title}}</span>
            <AnswerInput mode="binary" :value="d.selected" @input="value => d.selected = value" />
          </div>
        </div>
        <button
          class="btn-myls mt-4"
          :class="{ 'btn-disabled': detailItems.length < 1}"
          @click="selectTasks()"
          :disabled="detailItems.length < 1"
        >Confirm</button>
      </template>

      <!-- The third template then displays details for one selected category at a time -->
      <template v-if="mode == 'details'">
        <p class="pt-2 underline">Resources</p>
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
          @previous-detail="updatedList => previousDetail()"
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
      <div v-if="id">
        <p>If you wish to uninstall this extension, click here:</p>
        <button class="btn-myls" @click="uninstall()">Uninstall Chrome extension</button>
      </div>
      <div v-else>
        <p>The extension is no longer installed</p>
      </div>
    </div>
  </div>
</template>

<script>
import URLSelection from './URLSelection.vue'
import AnswerInput from './AnswerInput.vue'
import TandC from './TandC'
const editorExtensionId = process.env.VUE_APP_EXTENSION_ID

export default {
  name: 'app',
  components: {
    URLSelection,
    AnswerInput,
    TandC,
  },
  data() {
    return {
      submitStatus: false,
      domains: [],
      tasks: [],
      taskIndex: 0,
      detailIndex: 0,
      data: [],
      errorMessage: '',
      consented: false,
      id: '',
      email: '',
      mode: '',
    }
  },
  created() {
    this.id = window.localStorage.getItem('id')
  },
  computed: {
    detailItems() {
      let details = []
      this.tasks[this.taskIndex].details.filter(d => d.selected).forEach(d => details.push(d))
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
              if (!this.id) {
                const request = {
                  data: {
                    mode: 'installed',
                  },
                  type: 'INSTALLSTATUS',
                }
                chrome.runtime.sendMessage(
                  editorExtensionId,
                  request,
                  response => {
                    if (response.success) {
                      window.localStorage.setItem('id', response.data.id)
                      this.id = response.data.id
                    }
                  }
                )
              }
              this.getData()
            }
          }
        )
      } catch (error) {
        console.log(error)
      }
    },
    uninstall() {
      const request = {
        data: {
          mode: 'uninstalled',
          id: this.id,
        },
        type: 'INSTALLSTATUS',
      }
      chrome.runtime.sendMessage(editorExtensionId, request, response => {
        if (response.success) {
          chrome.management.uninstallSelf({}, () => {
            window.localStorage.removeItem('id')
            this.id = ''
          })
        }
      })
    },
    // Send the result to our server via the Chrome background script
    submitChoices() {
      const selectedTasks = []
      this.tasks.forEach(t => {
        t.details.filter(d => d.selected).forEach(d => selectTasks.push(d))
      })
      const data = this.selectTasks
        .map(d => d.urls.filter(u => u.selections.selected))
        .reduce((acc, curr) => acc.concat(curr))
      const request = {
        data: { urls: data, installId: this.installId, email: this.email },
        type: 'SUBMIT',
      }
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
          const urls = detail.urls.map((entry, index3) => {
            const selections = { selected: false }
            detail.columns.forEach(
              c => (selections[c.name] = c.type == 'binary' ? false : '')
            )
            return {
              id: `url-${index3}`,
              name: entry.name,
              url: entry.url,
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
      this.mode = 'activities'
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
      } else if (this.taskIndex < this.tasks.length - 1) {
        this.detailIndex = 0
        this.taskIndex++
        this.mode = 'activities'
      } else {
        this.mode = 'submit'
      }
    },
    previousDetail() {
      if (this.detailIndex > 0) {
        // Previous detail
        this.detailIndex--
      } else if (this.mode == 'details') {
        // Previous activity selection
        this.mode = 'activities'
        this.tasks[this.taskIndex].details.forEach(d => d.selected = false)
      } else {
        // Previous Task, final detail
        this.taskIndex--
        this.detailIndex = this.detailItems.length - 1
        this.mode = 'details'
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
