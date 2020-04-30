<template>
  <div>
    <h1>{{taskTitle}}: {{title}}</h1>
    <p>{{description}}</p>
    <div v-for="u in urlList" :key="u.id" class="flex flex-row content-start justify-between">

      <table class="table-fixed">
        <thead>
          <tr>
            <th v-for="c in columns" class="w-1/2 px-4 py-2">{{c.name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, uIndex) in urlList" :class="{ 'bg-gray-100' : uIndex % 2 === 0 }">
            <td class="border px-4 py-2" v-for="c in columns">
              <span v-if="uIndex === 0">{{ u.title}}</span>
              <AnswerInput
                :mode="c.type"
                :value="u.selections[c.name]"
                @update:value="u.selections[c.name] = $event"
              />
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <button class="submitButton" @click="nextDetail()">Next</button>
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
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    urls: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.urlList = [...this.urls]
  },
  data() {
    return {
      urlList: [],
    }
  },
  methods: {
    nextDetail() {
      this.$emit('next-detail', this.urlList)
    },
  },
}
</script>

<style scoped>
</style>
