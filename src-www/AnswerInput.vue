<template>
  <div class="flex flex-row items-center ml-2">
    <template v-if="mode == 'binary'">
      <input
        class="mr-1 mb-1"
        type="radio"
        id="yes"
        :value="true"
        v-model="selectedBoolean"
        @input="valueInput"
      />
      <label class="mr-2" for="yes">Yes</label>
      <input
        class="mr-1 mb-1"
        type="radio"
        id="no"
        :value="false"
        v-model="selectedBoolean"
        @input="valueInput"
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
        class="mr-1 mb-1 checkValid"
        :placeholder="placeholder"
        type="text"
        id="textString"
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
        @input="valueInput"
      />
      <label class="inputQ" for="1-25">1-25%</label>
      <input
        class="mr-1 mb-1"
        type="radio"
        id="25-50"
        value="25-50%"
        v-model="selectedQuart"
        @input="valueInput"
      />
      <label class="inputQ" for="25-50">25-50%</label>
      <input
        class="mr-1 mb-1"
        type="radio"
        id="50-75"
        value="50-75%"
        v-model="selectedQuart"
        @input="valueInput"
      />
      <label class="inputQ" for="50-75">50-75%</label>
      <input
        class="mr-1 mb-1"
        type="radio"
        id="100"
        value="100%"
        v-model="selectedQuart"
        @input="valueInput"
      />
      <label class="inputQ" for="100">100%</label>
    </template>
  </div>
</template>

<script>
export default {
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
    placeholder: {
      value: String,
      default: '',
    },
  },
  data() {
    return {
      selectedBoolean: false,
      selectedQuart: '',
      selectedText: '',
      selectedUrl: '',
    }
  },
  mounted() {
    switch (this.mode) {
      case 'binary':
        this.selectedBoolean = this.value
        break
      case 'url':
        this.selectedUrl = this.value
        break
      case 'text':
        this.selectedText = this.value
        break
      case 'quaternary':
        this.selectedQuart = this.value
    }
  },
  methods: {
    valueInput($event) {
      const value =
        this.mode == 'binary'
          ? $event.target.value == 'true'
          : $event.target.value
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped>
.inputQ {
  @apply mr-1 whitespace-no-wrap;
}
.checkValid :invalid {
  border: red;
}
label {
  @apply pointer-events-none;
}
</style>
