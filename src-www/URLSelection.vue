<template>
  <div>
    <h1 class="font-bold">Part II: Websites</h1>
    <!--h1 class="font-bold text-2xl mt-4">{{ title }}</h1-->
    <p
      v-if="paginatedList.length > 1"
      class="mb-4"
    >{{ `Page ${pageIndex + 1} of ${paginatedList.length}`}}</p>
    <div class="flex flex-row content-start justify-between">
      <table class="table-fixed">
        <thead>
          <tr>
            <th
              v-for="(c, cIndex) in columns"
              :key="`CH${c.shortTitle}`"
              :class="[cIndex === 0 ? 'w-1/4' : 'w-1/6']"
              class="px-4 py-2"
            >{{c.shortTitle}}</th>
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
                />
                <button v-if="cIndex === 0" class="btn-myls bg-red-400" @click="removeRow(uIndex)">X</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn-myls mr-4 mt-4" @click="addRow()">+ Add URL</button>
    <div class="flex flex-row mt-8">
      <button class="btn-myls mr-4" @click="previousDetail()">Back</button>
      <button
        class="btn-myls"
        :class="{ 'btn-disabled': !allTimeSpentSelected }"
        :disabled="!allTimeSpentSelected"
        @click="nextDetail()"
      >{{ nextIsNone ? 'None' : 'Next'}}</button>
    </div>
  </div>
</template>

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
      pageLength: 20,
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
        p => (selections[p.shortTitle] = p.type == 'binary' ? false : '')
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
      } else {
        this.$emit('next-detail', this.paginatedList.flat())
      }
      window.scrollTo(0, 0)
    },
    previousDetail() {
      if (this.pageIndex > 0) {
        this.pageIndex--
      } else {
        this.$emit('previous-detail', this.paginatedList.flat())
      }
      window.scrollTo(0, 0)
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
