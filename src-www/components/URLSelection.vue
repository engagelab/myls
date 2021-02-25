<template>
  <div>
    <h1 class="font-bold">{{ $t('part2Title') }}</h1>
    <p>{{ $t('part2Comment') }}</p><br />
    <p>{{ $t('part2Comment2') }}</p>
    <p
      v-if="paginatedList.length > 1"
      class="mb-4"
    >{{ $t('side') + ` ${ pageIndex + 1} of ${paginatedList.length}`}}</p>
    <div class="flex flex-row content-start justify-between">
      <table class="table-auto">
        <thead>
          <tr>
            <th
              v-for="(c, cIndex) in columns"
              :id="`CH${c.shortTitle}`"
              :key="`CH${c.shortTitle}`"
              :class="[cIndex === 0 ? 'w-1/4' : 'w-1/6']"
              class="px-4 py-2"
            >{{c.shortTitle}}</th>
            <th id="nppa_col">{{ $t('npa') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(u, uIndex) in paginatedList[pageIndex]"
            :key="u.id"
            :class="{ 'bg-gray-100' : uIndex % 2 === 0 }"
          >
            <td v-for="(c, cIndex) in columns" :key="`${u.id}-${cIndex}`" class="border px-4 py-2">
              <!-- Binary type quesiton -->
              <div class="flex flex-row justify-between" v-if="u.type === 'normal'">
                <span
                  v-if="cIndex === 0"
                  class="font-mono text-sm text-green-900 break-words max-w-12"
                >
                  <a :href="u.url" rel="noopener noreferrer" target="_blank">{{ u.name }}</a>
                </span>
                <AnswerInput
                  v-if="cIndex > 0"
                  mode="binary"
                  v-model="u.selections[c.shortTitle]"
                  @input="value => u.selections.selected = value"
                />
              </div>
              <!-- User-added question -->
              <div class="flex flex-row items-center"  v-if="u.type === 'user'">
                <AnswerInput v-if="cIndex === 0" mode="url" v-model="u.search" />
                <AnswerInput
                  v-if="cIndex > 0"
                  placeholder="answer here.."
                  mode="binary"
                  v-model="u.selections[c.shortTitle]"
                  @input="value => u.selections.selected = value"
                />
                <button v-if="cIndex === 0" class="btn-myls bg-red-400" @click="removeRow(uIndex)">X</button>
              </div>
            </td>
            <td class="border px-4 py-2">
              <AnswerInput
                  v-if="u.selections.selected"
                  mode="binary"
                  v-model="u.selections['npa']"
                />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn-myls mr-4 mt-4" v-if="pageIndex === paginatedList.length - 1" @click="addRow()">{{ $t('addURL') }}</button>
    <div class="flex flex-row mt-8">
      <button class="btn-myls mr-4" @click="previousDetail()">{{ $t('back') }}</button>
      <button
        class="btn-myls"
        :class="{ 'btn-disabled': !allTimeSpentSelected }"
        :disabled="!allTimeSpentSelected"
        @click="nextDetail()"
      >{{ nextIsNone ? $t('none') : $t('next') }}</button>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "en": "English",
    "back": "Back",
    "addURL": "+ Add URL",
    "part2Title": "Part II: Webpage Use",
    "part2Comment": "Check ‘yes’ for all listed sites you use / have used when you have performed activities in part 1",
    "part2Comment2": "Note: The sites are listed over five pages, please go through all the pages and select the answers that apply. It will not take you too much time.",
    "side": "Page",
    "none": "None",
    "next": "Next",
    "npa": "Non-programming Activities"
  },
  "no": {
    "no": "Norwegian",
    "back": "Tilbake",
    "addURL": "+ Legge til URL",
    "part2Title": "Del II: Nettstedsbruk",
    "part2Comment": "Kryss av for ‘ja’ for alle oppførte nettstedene du bruker/har brukt når du har utført aktiviteter i del 1.",
    "part2Comment2": "Obs. Nettstedene står listet opp over fem sider, vennligst gå gjennom alle sidene.",
    "side": "Side",
    "none": "Ingen",
    "next": "Neste",
    "npa": "Ikke-programmering"
  }
}
</i18n>

<script>
import AnswerInput from './AnswerInput.vue'
export default {
  name: 'URLSelection',
  components: {
    AnswerInput,
  },
  props: {
    urls: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    entrytype: {
      type: String,
      default: 'select',
    },
  },
  data() {
    return {
      paginatedList: [], // Array of arrays - each internal array is a page of URLs
      pageIndex: 0,
      pageLength: 13,
    }
  },
  mounted() {
    let p = 0
    let i = 0
    this.paginatedList.push([])
    this.urls.forEach(u => {
      if (i < this.pageLength) {
        this.paginatedList[p].push(u)
        i++
      } else {
        this.paginatedList.push([u])
        i = 1
        p++
      }
    })
  },
  computed: {
    // Show the 'npa' column if one of the other columns was answered 'yes'
    showNPA() {
      return this.paginatedList.length > 0 && this.paginatedList[this.pageIndex].some((u) => {
        const uEntries = Object.entries(u.selections)
        return uEntries.some(([key, value]) => key !== 'npa' && value)
      })
    },
    nextIsNone() {
      return (
        !this.paginatedList.flat().some(u => u.selections.selected) &&
        this.pageIndex === this.paginatedList.length - 1
      )
    },
    allTimeSpentSelected() {
      const usesTimeSpentColumn = this.columns.some(
        c => c.name == 'Time Spent in that activity'
      )
      if (usesTimeSpentColumn) {
        return this.paginatedList
          .flat()
          .filter(u => u.selections.selected)
          .every(u => u.selections['Time Spent in that activity'])
      } else {
        return true
      }
    },
  },
  methods: {
    createNewEntry(selected) {
      const selections = { selected: false }
      this.columns.forEach(
        p => (selections[p.shortTitle] = false)
      )
      return {
        id: `url-${Math.random()}`,
        name: 'other',
        type: 'user',
        url: '',
        search: '',
        selections
      }
    },
    nextDetail() {
      if (this.pageIndex < this.paginatedList.length - 1) {
        this.pageIndex++
        window.scrollTo(0, 0)
      } else {
        this.$emit('next-detail', this.paginatedList.flat())
      }
    },
    previousDetail() {
      if (this.pageIndex > 0) {
        this.pageIndex--
        window.scrollTo(0, 0)
      } else {
        this.$emit('previous-detail', this.paginatedList.flat())
      }
    },
    removeRow(index) {
      this.paginatedList[this.pageIndex].splice(index, 1)
    },
    addRow() {
      if (this.paginatedList.length < 1) {
        this.paginatedList.push([])
      }
      const newEntry = this.createNewEntry(true)
      this.paginatedList[this.pageIndex].push(newEntry)
    },
  },
}
</script>

<style scoped>
</style>
