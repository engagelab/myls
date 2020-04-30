<template>
  <div>
    <h1 class="font-bold">{{ taskTitle }}: {{ title }}</h1>
    <p>{{ description }}</p>
    <div class="flex flex-row content-start justify-between">
      <table class="table-fixed">
        <thead>
          <tr>
            <th
              v-for="(c, cIndex) in columns"
              :key="`CH${c.name}`"
              :class="[cIndex === 0 ? 'w-1/4' : 'w-1/6']"
              class="px-4 py-2"
            >{{c.name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(u, uIndex) in urlList"
            :key="u.id"
            :class="{ 'bg-gray-100' : uIndex % 2 === 0 }"
          >
            <td v-for="(c, cIndex) in columns" :key="`CR${c.name}`" class="border px-4 py-2">
              <div class="flex flex-row justify-between" v-if="entrytype == 'select'">
                <span
                  v-if="cIndex === 0"
                  class="font-mono text-sm text-green-900 break-words max-w-12"
                >{{ u.title }}</span>
                <AnswerInput v-if="cIndex === 0" mode="binary" v-model="u.selections.selected" />
                <AnswerInput
                  v-if="cIndex > 0 && u.selections.selected"
                  :mode="c.type"
                  v-model="u.selections[c.name]"
                />
              </div>
              <div class="flex flex-row items-center" v-if="entrytype == 'text'">
                <AnswerInput v-if="cIndex === 0" mode="url" v-model="u.title" />
                <AnswerInput v-if="cIndex > 0" :mode="c.type" v-model="u.selections[c.name]" />
                <button v-if="cIndex === 0" class="btn-myls bg-red-400" @click="removeRow(uIndex)">X</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-row mt-4">
      <button v-if="entrytype == 'text'" class="btn-myls mr-4" @click="addRow()">Add URL</button>
      <button class="btn-myls" @click="nextDetail()">Next</button>
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
    taskTitle: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
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
      urlList: [],
    }
  },
  mounted() {
    this.urlList = [...this.urls]
  },
  methods: {
    nextDetail() {
      this.$emit('next-detail', this.urlList)
    },
    removeRow(index) {
      this.urlList.splice(index, 1)
    },
    addRow() {
      this.urlList.push({
        id: `url-${Math.random()}`,
        title: 'other',
        selections: {
          selected: true,
          URL: '',
          Activity: '',
          'Time Spent': '',
        },
        info: `${this.taskTitle} : ${this.title}`,
      })
    },
  },
}
</script>

<style scoped>
</style>
