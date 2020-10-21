<template>
  <div>
    <div class="flex flex-row bg-gray-300 p-2">
      <img src="./assets/icons/icon_32.png">
      <h1 class="font-bold text-lg w-full pl-4">Learning Practices Survey</h1>
    </div>
    <template v-if="mode == ''" >
      <div class="max-w-4xl">
        <p class="m-4">Welcome to the Online Learning Practices Survey!</p>
        <p class="m-4">This survey is about your use of resources from the Internet when you learn to program.
          It asks you about how you solve problems and learn new skills when you work on a programming task,
          how you get information about professional programming and your future programming career.
          The survey collects data from your browsing history, <u>only</u> of the websites <u>you report to use</u> during the survey for those activities.</p>
        <p class="m-4">The data collected from you will be anonymized and it will be stored safely, according to the regulations for data protection in Norway and Europe (GDPR).
          You will not be recognized by others or your teachers.</p>
        <p class="m-4">This study is part of a PhD project at the Department of Education at UiO. The project studies how computer and software engineering students use the Internet to learn programming.
          If you have any questions and or want to know more, contact me at a.a.a.moya@iped.uio.no.</p>
        <p class="m-4">Thank you very much for your participation!</p>
        <p class="m-4">Andres Araos</p>
        <div class="flex flex-row m-4">
          <p>I would like to participate in the lottery to win a gift card of 500 kr. from Elkjøp </p>
          <AnswerInput mode="binary" :value="lottery" @input="value => lottery = value" />
        </div>
        <button class="btn-myls m-4" @click="start()">Begin</button>
      </div>
    </template>
    <div v-if="!submitStatus" class="m-4 max-w-5xl">
      <!-- The first template requests consent before proceeding-->
      <template v-if="mode == 'consent'">
        <h1 class="font-bold text-lg">Informed consent</h1>
        <p
          class="mt-4"
        >Thank you for agreeing to participate in this survey study!</p>
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
          <span>Email address:&nbsp;</span>
          <AnswerInput mode="text" placeholder="user@example.com" :value="email" @input="value => email = value" />
          <AnswerInput mode="binary" :value="consented" @input="value => consented = value" />
          <button
            class="btn-myls"
            :class="{ 'btn-disabled': !consented || !email }"
            @click="giveConsent()"
            :disabled="!consented || !email"
          >Confirm</button>
        </div>
      </template>

      <template v-if="mode == 'tandc'">
        <TandC></TandC>
        <button class="btn-myls mt-4 ml-2" @click="mode = 'consent'">Back</button>
      </template>

      <!-- The second template displays general selection of category -->
      <template v-if="mode == 'activities'">
        <h1 class="font-bold">Part I: Practices and actions</h1>
        <div class="p-2">
          <h2 class="font-bold">{{practices[pIndex].title}}</h2>
          <p class="mb-2">{{practices[pIndex].description}}</p>
          <div v-for="a in practices[pIndex].actions" :key="a.id" class="flex flex-col pl-2">
            <div class="flex flex-row my-1 justify-between lg:justify-start">
              <span class="pr-2">{{a.title}}</span>
              <AnswerInput mode="binary" v-model="a.selected" />
            </div>
            <div class="flex flex-col" v-if="a.selected">
              <!-- If 'other' then allow entry of additional Actions -->
              <div v-for="(c, cIndex) in a.customActions" :key="c.id" class="flex flex-row items-center py-1">
                <AnswerInput
                  placeholder="action.."
                  mode="text"
                  v-model="c.title"
                  class="w-full lg:w-1/2"
                />
                <button class="btn-myls bg-red-400" @click="removeAction(a, cIndex)">X</button>
              </div>
              <div class="flex flex-row">
                <button v-if="a.entrytype == 'text' && a.selected" class="btn-myls mr-4 mt-4" @click="addAction(a)">+ Add Action</button>
              </div>
            </div>

          </div>
        </div>
        <button
          class="btn-myls mt-4 mr-4"
          v-if="pIndex > 0"
          @click="previousDetail()"
        >Back</button>
        <button
          v-if="pIndex < practices.length - 1 || practiceColumns.length > 1"
          class="btn-myls mt-4"
          @click="selectTasks()"
        >{{ confirmOrNone }}</button>
      </template>

      <!-- The third template then displays details for one selected category at a time -->
      <template v-if="mode == 'websites'">
        <p class="pt-2 underline">Resources</p>
        <URLSelection
          :urls="urls"
          :columns="practiceColumns"
          class="p-2"
          @next-detail="updatedList => nextDetail(updatedList, true)"
          @previous-detail="updatedList => previousDetail(updatedList, true)"
        />
      </template>

      <!-- The fourth template allows selection of demographics -->
      <template v-if="mode == 'demographics'">
        <p class="pt-2 underline">Demographics</p>
        <div v-for="d in demographics" :key="d.id" class="flex flex-col my-2 justify-between lg:justify-start">
          <p class="pr-2">{{ d.title }}</p>
          <AnswerInput class="pl-4" v-model="d.selection" :mode="d.type" :options="d.options" :conditionals="d.conditionals" />
        </div>
        <button
          v-if="allDegmographicsAnswered"
          class="btn-myls mt-4"
          @click="selectTasks()"
        >Done</button>
      </template>

      <!-- Final template confirms submission of results -->
      <template v-if="mode == 'submit'">
        <p>We will now scan your browser history to count URLs matching only those you selected in the survey.</p>
        <p class="pt-2">By clicking 'Submit' you agree to share both your survey answers and selective browser history for the selected URLs with the University of Oslo MyLS Project:
          <i>“Learning with the internet”</i>.
        </p>
        <p class="pt-2">The data collected from you will be anonymized and it will be stored safely, according to the regulations for data protection in Norway and Europe (GDPR).
          You will not be recognized by others or your teachers.</p>
        <button class="btn-myls mt-4" @click="submitChoices()">Submit</button>
      </template>

      <!-- Error template -->
      <template v-if="mode == 'error'">
        <p>{{errorMessage}}</p>
        <p>Ensure you are running Chrome web browser and have the Extension installed.</p>
        <button class="btn-myls mt-4" @click="getExtension()">Get the Chrome extension...</button>
      </template>
    </div>
    <div v-else class="p-2">
      <p>Thank you for your submission!</p>
      <div v-if="id">
        <p>If you wish to uninstall this extension, click here:</p>
        <button class="btn-myls m-4" @click="uninstall()">Uninstall Chrome extension</button>
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
      practices: [],
      urls: [],
      demographics: [],
      pIndex: 0,
      detailIndex: 0,
      data: [],
      errorMessage: '',
      consented: false,
      lottery: false,
      noneSelected: false,
      id: '',
      email: '',
      mode: '',
    }
  },
  created() {
    this.id = window.localStorage.getItem('id')
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === 'visible' && this.mode == 'error') {
        this.start()
      }
    });
  },
  computed: {
    detailItems() {
      let details = []
      this.practices[this.pIndex].actions.filter(d => d.selected).forEach(d => details.push(d))
      return details
    },
    allDegmographicsAnswered() {
      return this.demographics.every(entry => {
        switch (entry.type) {
          case 'binary':
            return entry.selection === true || entry.selection === false
            break
          case 'multiChoice':
            return entry.selection.length > 0
            break
          // Assumes conditional step 1 is 'single choice' and step 2 is a 'multichoice' type
          case 'conditional':
            return entry.selection.level1
              && (entry.selection.level2 === true
              || entry.selection.level2 === false
              || (entry.selection.level2.length && entry.selection.level2.length > 0))
        }
      })
    },
    // Return only Practices where Actions were selected
    practiceColumns() {
      const pc = this.practices.filter(p => p.actions.some(a => a.selected))
      return [{ shortTitle: 'URL' }, ...pc ]
    },
    confirmOrNone() {
      return this.detailItems.length < 1 ? 'None' : 'Confirm'
    }
  },
  methods: {
    createNewEntry(selected) {
      return {
        id: `url-${Math.random()}`,
        title: ''
      }
    },
    removeAction(a, index) {
      a.customActions.splice(index, 1)
    },
    addAction(a) {
      const newEntry = this.createNewEntry(true)
      a.customActions.push(newEntry)
    },
    start() {
      const messageError = () => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message)
        }
        this.errorMessage = 'Chrome Extension not found'
        this.mode = 'error'
      }

      try {
        chrome.runtime.sendMessage(
          editorExtensionId,
          { type: 'HELLO' },
          response => {
            if (!response || !response.success) {
              messageError()
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
              this.mode = 'consent'
              this.getData()
            }
          }
        )
      } catch (error) {
        messageError()
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
          window.localStorage.removeItem('id')
          this.id = ''
        }
      })
    },
    // Send the result to our server via the Chrome background script
    submitChoices() {

      // Collect only those Practices that have selected Actions
      const practices = this.practices.filter(p => p.actions.some(a => a.selected)).map(p => {
        let customActions = []
        let actions = p.actions.filter(a => a.selected).map(a => {
          // include custom actions if they exist
          if (a.customActions && a.customActions.length > 0)
            customActions = a.customActions.map(c => c.title)
          return a.title
        })
        if (customActions.length > 0) actions = actions.concat(customActions)
        return { practice: p.title, shortTitle: p.shortTitle, actions }
      })

      // Collect Websites selected
      const urls = this.urls.filter(u => u.selections.selected).map(u => {
        delete u.selections['selected']
        delete u.selections['URL']
        return u
        /* const filteredSelections = Object.entries(u.selections).filter(e => e[0] !== 'selected' && e[0] !== 'URL')
        const selections = Object.fromEntries(filteredSelections)
        return { ...u, ...selections } */
      })

      // Collect Demographics - only the data we need
      const demographics = this.demographics.map(d => ({ selection: d.selection, title: d.title, shortTitle: d.shortTitle }))

      const request = {
        data: { other: { practices, demographics }, urls, id: this.id, email: this.email, consented: this.consented, lottery: this.lottery },
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
        this.configurePractices()
        this.configureDemographics()
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
    configurePractices() {
      // this.submitStatus = window.localStorage.getItem('submitStatus') // TODO: Uncomment when debugging is done!
      this.data.practices.forEach((p, index) => {
        const actions = p.actions.map((action, index2) => {
          const a = {
            id: `action-${index2}`,
            taskTitle: p.title,
            title: action.title,
            entrytype: action.entrytype || 'select',
            selected: false
          }
          if (action.entrytype === 'text') a.customActions = []
          return a
        })
        this.practices.push({
          id: `practice-${index}`,
          title: p.title,
          shortTitle: p.shortTitle,
          description: p.description,
          actions,
          selected: false,
        })
      })
    },
    configureWebsites() {
      this.urls = this.data.urls.map((entry, index) => {
        const selections = { selected: false }
        this.practiceColumns.forEach(
          p => (selections[p.shortTitle] = p.type == 'binary' ? false : '')
        )
        return {
          id: `url-${index}`,
          name: entry.name,
          type: 'normal',
          url: entry.url,
          search: entry.search,
          selections
        }
      })
    },
    configureDemographics() {
      const setupSelectors = (entry) => {
        let selection
        // if (entry.type === 'binary') selection = undefined // true / false
        if (entry.type === 'multiChoice') {
          selection = [] // Multiple choice
        } else if (entry.type === 'conditional') {
          selection = {
            level1: '', // Single choice
            level2: undefined  // Conditional sub-question may be of any type
          }
          entry.conditionals.forEach(c => {
            selection.level2 = setupSelectors(c) // Multiple choice or true / false
          })
        }
        return selection
      }
      this.demographics = this.data.demographics.map((entry, index) => {
        const selection = setupSelectors(entry)
        return {
          id: `demog-${index}`,
          title: entry.title,
          shortTitle: entry.shortTitle,
          type: entry.type,
          options: entry.options ? entry.options.map((o, i) => {
            return { title: o, id: `demog-option-${index}-${i}`}
          }) : [],
          conditionals: entry.conditionals ? entry.conditionals.map((c, i) => {
            c.options = c.options ? c.options.map((o, i) => {
            return { title: o, id: `demog-cond-option-${index}-${i}`}
          }) : []
            return {...c, id: `demog-cond-${index}-${i}`}
          }) : [],
          selection
        }
      })
    },
    giveConsent() {
      this.mode = 'activities'
    },
    selectTasks() {
      if (this.pIndex < this.practices.length - 1) {
        this.pIndex++
      } else if (this.mode == 'activities' && this.practiceColumns.length > 1) {
        this.configureWebsites()
        this.mode = 'websites'
      } else if (this.mode == 'demographics') {
        this.mode = 'submit'
      }
    },
    getExtension() {
      window.open(process.env.VUE_APP_CHROME_STORE_EXTENSION_URL, '_blank')
    },
    nextDetail(updatedList, detail) {
      this.urls = updatedList
      if (this.detailIndex < this.detailItems.length - 1) {
        this.detailIndex++
      } else if (this.pIndex < this.practices.length - 1) {
        this.detailIndex = 0
        this.pIndex++
        this.mode = 'activities'
      } else if (this.mode == 'websites') {
        this.mode = 'demographics'
      } else {
        this.mode = 'submit'
      }
    },
    previousDetail(updatedList, detail) {
      // if (detail)
      //    this.urls = updatedList
      if (this.detailIndex > 0) {
        // Previous detail
        this.detailIndex--
      } else if (this.mode == 'websites') {
        // Previous section
        this.mode = 'activities'
      } else if (this.mode == 'demographics') {
        // Previous section
        this.mode = 'websites'
      }else if (this.pIndex > 0) {
        // Previous Practice
        this.pIndex--
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
