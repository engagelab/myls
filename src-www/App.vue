<template>
  <div>
    <div class="flex flex-row bg-gray-300 p-2">
      <img src="./assets/icons/icon_32.png">
      <h1 class="font-bold text-lg w-full pl-4">Undersøkelse om læringspraksis</h1>
    </div>

    <template v-if="mode == ''" >
      <div class="max-w-4xl">
        <p class="m-4 font-bold">Velkommen til Online Learning Practices Survey!</p>
        <p class="m-4">Denne undersøkelsen handler om studenters bruk av internett når man lærer programvareutvikling.
          Den skal finne ut av hvordan studenter løser problemer og lærer nye ferdigheter når de jobber med en programvareutviklingsoppgave,
          får informasjon om profesjonell programvareutvikling og administrerer sin fremtidige karriere som programvareutviklere.
        </p>
        <p class="m-4">
          Undersøkelsen vil samler inn data fra din nettleserloggen, <u>men kun</u> på nettstedene som <u>du rapporterer å ha brukt</u> for aktiviteter du angir,
          og <u>kun hvor ofte og lenge</u> du får tilgang til disse nettstedene.</p>
        <p class="m-4">Dataene som samles inn om deg vil bli anonymisert og lagres trygt, i henhold til lovgivningen om personvern i Norge og Europa (GDPR).
          Du vil ikke bli gjenkjent av andre eller av lærerne dine.</p>
          <p class="m-4">
            <span class="text-blue-600 cursor-pointer" @click="mode = 'anon'">Her</span>
            kan du lese mer om hvordan vi anonymiserer dataene dine og om dataene vi samler inn fra nettleserloggen din..</p>
        <p class="m-4">Denne studien er en del av et PhD-prosjekt ved Institutt for pedagogikk ved UiO.
          I dette prosjektet forsker jeg på hvordan studenter innen data- og programvare bruker internett til å lære programmering.
          Hvis du har spørsmål eller ønsker å vite mer om prosjektet, kontakt meg på a.a.a.moya@iped.uio.no.</p>
        <p class="m-4">Tusen takk for din deltakelse!</p>
        <p class="m-4">Andres Araos</p>
        <div class="flex flex-row m-4">
          <p>Jeg ønsker å delta i lotteri for å vinne et gavekort på 500 kroner fra Elkjøp</p>
          <AnswerInput mode="binary" :value="lottery" @input="value => lottery = value" />
        </div>
        <button class="btn-myls m-4" @click="start()">Begynne</button>
      </div>
    </template>

    <div v-if="!submitStatus" class="m-4 max-w-5xl">
      <!-- The first template requests consent before proceeding-->
      <template v-if="mode == 'consent'">
        <h1 class="font-bold text-lg">Informert samtykke</h1>
        <p
          class="mt-4"
        >Takk for at du deltar i denne studien!</p>
        <p
          class="mt-4"
        >Vennligst les om prosjektet og hvordan vi samler inn, lagrer og behandler data, i informasjonsbrevet som du finner <span class="text-blue-600 cursor-pointer" @click="mode = 'tandc'">her</span>.</p>

        <p class="mt-4">
          Jeg har mottatt og forstått informasjonen om prosjektet som <i>utforsker studenters læring med nettbaserte ressurser og digitale verktøy.</i>
          Jeg har fått mulighet til å stille spørsmål. Jeg gir samtykke til:
          <ul class="list-disc list-inside m-2">
            <li>å delta i en undersøkelse</li>
            <li>å gi tilgang til nettleserloggen til nettstedene jeg erklærer å bruke under undersøkelsen</li>
            <li>å delta i et intervju</li>
          </ul>
        </p>
        <div class="flex flex-row mt-4">
          <p>Jeg gir samtykke til at personopplysningene mine behandles frem til prosjektets sluttdato, ca. januar 2022.</p>
          <AnswerInput mode="binary" :value="consented" @input="value => consented = value" />
        </div>
        <div class="flex flex-row py-2">
          <span class="py-1">E-postadresse:&nbsp;</span>
          <AnswerInput mode="email" placeholder="user@example.com" :value="email" @input="value => email = value" />
        </div>
        <div class="flex flex-row">
          <button
            class="btn-myls"
            :class="{ 'btn-disabled': !consented || !validEmail }"
            @click="giveConsent()"
            :disabled="!consented || !validEmail"
          >Bekreft</button>
        </div>
      </template>

      <template v-if="mode == 'anon'">
        <Anon></Anon>
        <button class="btn-myls mt-4 ml-2" @click="mode = ''">Tilbake</button>
      </template>

      <template v-if="mode == 'tandc'">
        <TandC></TandC>
        <button class="btn-myls mt-4 ml-2" @click="mode = 'consent'">Tilbake</button>
      </template>

      <!-- The second template displays general selection of category -->
      <template v-if="mode == 'activities'">
        <h1 class="font-bold">Del I: Aktiviteter</h1>
        <p>Obs: Velg alle aktivitetene du utfører, selv om de gjentas under forskjellige seksjoner.</p>
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
                  placeholder="beskrive aktivitetet.."
                  mode="text"
                  v-model="c.title"
                  class="w-full lg:w-1/2"
                />
                <button class="btn-myls bg-red-400" @click="removeAction(a, cIndex)">X</button>
              </div>
              <div class="flex flex-row">
                <button v-if="a.entrytype == 'text' && a.selected" class="btn-myls mr-4 mt-4" @click="addAction(a)">+ Legge til Aktivitet</button>
              </div>
            </div>

          </div>
        </div>
        <button
          class="btn-myls mt-4 mr-4"
          v-if="pIndex > 0"
          @click="previousDetail()"
        >Tilbake</button>
        <button
          v-if="pIndex < practices.length - 1 || practiceColumns.length > 1"
          :class="{ 'btn-disabled': !allActionsAnswered }"
          :disabled="!allActionsAnswered"
          class="btn-myls mt-4"
          @click="selectTasks()"
        >Bekreft</button>
      </template>

      <!-- The third template then displays details for one selected category at a time -->
      <template v-if="mode == 'websites'">
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
        <h1 class="font-bold">Del III: Bakgrunn</h1>
        <div v-for="d in demographics" :key="d.id" class="flex flex-col my-2 justify-between lg:justify-start">
          <p class="pr-2">{{ d.title }}</p>
          <AnswerInput class="pl-4" v-model="d.selection" :mode="d.type" :options="d.options" :conditionals="d.conditionals" />
        </div>
        <button
          :class="{ 'btn-disabled': !allDegmographicsAnswered }"
          :disabled="!allDegmographicsAnswered"
          class="btn-myls mt-4"
          @click="selectTasks()"
        >Ferdig</button>
      </template>

      <!-- Final template confirms submission of results -->
      <template v-if="mode == 'submit'">
        <p>Vi skanner nå nettleserloggen din for å telle nettadresser som bare samsvarer med de du valgte i undersøkelsen.</p>
        <p class="pt-2">Ved å klikke 'Send' samtykker du i å dele både undersøkelsessvar og selektiv nettleserhistorikk for de valgte URL-ene med MyLS-prosjektet ved Universitetet i Oslo:
          <i>“Learning with the Internet”</i>.
        </p>
        <p class="pt-2">Dataene som samles inn fra deg vil bli anonymisert, og de vil bli lagret trygt, i henhold til regelverket for databeskyttelse i Norge og Europa (GDPR).
          Du vil ikke bli gjenkjent av andre, heller ikke av lærerne dine.</p>
        <button class="btn-myls mt-4" @click="submitChoices()">Send</button>
      </template>

      <!-- Error template -->
      <template v-if="mode == 'error'">
        <p>{{errorMessage}}</p>
        <p>Du må har Chrome nettleser og 'Learning Practices Survey' Extension installert.</p>
        <button class="btn-myls mt-4" @click="getExtension()">Få Chrome extension...</button>
      </template>
    </div>
    <div v-else class="p-2">
      <p>Takk for ditt bidrag!</p>
      <div v-if="id">
        <p>Vil du avinstallere denne extension, trykk her:</p>
        <button class="btn-myls m-4" @click="uninstall()">Avinstallere Chrome extension</button>
      </div>
      <div v-else>
        <p>Extension er ikke installert</p>
      </div>
    </div>
  </div>
</template>

<script>
import URLSelection from './URLSelection.vue'
import AnswerInput from './AnswerInput.vue'
import TandC from './TandC'
import Anon from './Anonimisation'
const editorExtensionId = process.env.VUE_APP_EXTENSION_ID
const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
export default {
  name: 'app',
  components: {
    URLSelection,
    AnswerInput,
    TandC,
    Anon
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
    validEmail() {
      return emailRegex.test(this.email)
    },
    allDegmographicsAnswered() {
      return this.demographics.every(entry => {
        switch (entry.type) {
          case 'binary':
            return entry.selection === true || entry.selection === false
            break
          case 'multiChoice':
          case 'singleChoice':
          case 'text':
            return entry.selection && entry.selection.length > 0
            break
          // Assumes conditional step 1 is 'single choice' and step 2 is a 'multichoice' type
          case 'conditional':
            return entry.selection && entry.selection.level1
              && (entry.selection.level2 === true
              || entry.selection.level2 === false
              || (entry.selection.level2.length && entry.selection.level2.length > 0))
        }
      })
    },
    allActionsAnswered() {
      return this.practices[this.pIndex].actions.every(action => {
        return typeof action.selected === 'boolean' && (action.entrytype !== 'text' || (!action.selected || (action.customActions.length > 0 && action.customActions.every(a => a.title !== ''))))
      })
    },
    // Return only Practices where Actions were selected
    practiceColumns() {
      const pc = this.practices.filter(p => p.actions.some(a => a.selected))
      return [{ shortTitle: 'URL' }, ...pc ]
    },
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
    anonymizationPage() {
      this.mode = 'anon'
    },
    start() {
      const messageError = () => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message)
        }
        this.errorMessage = 'Chrome Extension not found'
        this.mode = 'error'
      }
      if (chrome) {
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
      } else {
        this.errorMessage = 'Chrome Extension not found'
        this.mode = 'error'
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
            selected: undefined
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
          p => (selections[p.shortTitle] = false)
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
      if (this.pIndex < this.practices.length - 1) {
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
