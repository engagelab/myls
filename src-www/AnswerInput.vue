<template>
  <div class="flex flex-row items-center ml-2 py-1">
    <template v-if="mode == 'binary'">
      <input
        class="mr-1 mb-1"
        type="radio"
        id="yes"
        :value="true"
        v-model="selectedBoolean"
        @change="valueInput"
      />
      <label class="mr-2" for="yes">Yes</label>
      <input
        class="mr-1 mb-1"
        type="radio"
        id="no"
        :value="false"
        v-model="selectedBoolean"
        @change="valueInput"
      />
      <label class="mr-1" for="no">No</label>
    </template>
    <template v-if="mode == 'url'">
      <input
        class="mr-1 mb-1"
        type="url"
        id="urlString"
        placeholder="https://example.com"
        pattern="https://.*"
        size="30"
        required
        v-model="selectedUrl"
        @input="valueInput"
      />
    </template>
    <template v-if="mode == 'text'">
      <input
        class="mr-1 mb-1 checkValid w-full px-1"
        :placeholder="placeholder"
        type="text"
        :id="'textString' + randomId"
        v-model="selectedText"
        @input="valueInput"
      />
    </template>
    <template v-if="mode == 'email'">
      <input
        class="mr-1 mb-1 w-full px-1 placeholder-black placeholder-opacity-25"
        :class="[validEmail ? 'valid-email' : 'invalid-email']"
        :placeholder="placeholder"
        type="email"
        :id="'textString' + randomId"
        v-model="selectedText"
        @input="valueInput"
      />
    </template>
    <template v-if="mode == 'quaternary'">
      <input
        class="mr-1 mb-1"
        type="radio"
        id="1-25"
        value="1-25%"
        v-model="selectedQuart"
        @change="valueInput"
      />
      <label class="inputQ" for="1-25">1-25%</label>
      <input
        class="mr-1 mb-1"
        type="radio"
        id="25-50"
        value="25-50%"
        v-model="selectedQuart"
        @change="valueInput"
      />
      <label class="inputQ" for="25-50">25-50%</label>
      <input
        class="mr-1 mb-1"
        type="radio"
        id="50-75"
        value="50-75%"
        v-model="selectedQuart"
        @change="valueInput"
      />
      <label class="inputQ" for="50-75">50-75%</label>
      <input
        class="mr-1 mb-1"
        type="radio"
        id="100"
        value="100%"
        v-model="selectedQuart"
        @change="valueInput"
      />
      <label class="inputQ" for="100">100%</label>
    </template>
    <template v-if="mode == 'multiChoice'">
      <div class="flex flex-col">
        <div v-for="o in options" :key="o.id" class="py-1">
          <input
            class="mr-1 mb-1"
            type="checkbox"
            :id="`input-${o.id}`"
            :value="o.title"
            v-model="selectedMultiChoice"
            @change="valueInput"
          />
          <label class="mr-2" :for="`input-${o.id}`">{{ o.title }}</label>
        </div>
      </div>
    </template>
    <template v-if="mode == 'conditional'">
      <div class="flex flex-col py-1">
        <div v-for="(o, i) in options" :key="o.id">
          <input
            class="mr-1 mb-1"
            type="radio"
            :id="`input-${o.id}`"
            :value="o.title"
            v-model="selectedSingleChoice"
            @change="valueInput"
          />
          <label class="mr-2" :for="`input-${o.id}`">{{ o.title }}</label>
          <AnswerInput v-if="selectedSingleChoice === o.title" class="pl-4" mode="multiChoice" v-model="selectedMultiChoice" @input="valueInput" :options="conditionals[i].options" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AnswerInput',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      default: '',
    },
    mode: {
      value: String,
      default: 'binary',
    },
    options: {
      value: Array,
      default: () => [],
    },
    conditionals: {
      value: Object,
      default: () => {},
    },
    placeholder: {
      value: String,
      default: '',
    },
  },
  data() {
    return {
      selectedBoolean: undefined,
      selectedQuart: '',
      selectedText: '',
      selectedUrl: '',
      selectedSingleChoice:'',
      selectedMultiChoice: [],
      randomId: Math.random()
    }
  },
  watch: {
    value: function () {
      this.checkValue()
    }
  },
  mounted() {
    this.checkValue()
  },
  computed: {
    validEmail() {
      const regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      return regex.test(this.selectedText)
    },
  },
  methods: {
    checkValue() {
      switch (this.mode) {
        case 'binary':
          this.selectedBoolean = this.value
          break
        case 'url':
          this.selectedUrl = this.value
          break
        case 'email':
          this.selectedText = this.value
        case 'text':
          this.selectedText = this.value
          break
        case 'quaternary':
          this.selectedQuart = this.value
      }
    },
    valueInput($event) {
      let value
      switch (this.mode) {
        case 'binary':
          value = $event.target.value == 'true'
          break;
        case 'multiChoice':
          value = this.selectedMultiChoice
          break;
        case 'conditional':
          value = { level1: this.selectedSingleChoice, level2: this.selectedMultiChoice }
          break;
        default:
          value = $event.target.value
      }
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped>
.inputQ {
  @apply mr-1 whitespace-no-wrap;
}
.valid-email {
  @apply bg-green-400 rounded-sm
}
.invalid-email {
  @apply bg-red-400 rounded-sm
}
label {
  @apply pointer-events-none;
}
</style>
