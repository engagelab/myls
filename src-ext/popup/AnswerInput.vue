<template>
  <div class="flex flex-row items-center">
    <template v-if="mode == 'binary'">
      <input class="mr-1" type="radio" id="yes" :value="true" v-model="selectedBoolean" @input="valueInput" />
      <label class="mr-1" for="yes">Yes</label>
      <input class="mr-1" type="radio" id="no" :value="false" v-model="selectedBoolean" @input="valueInput" />
      <label class="mr-1" for="no">No</label>
    </template>
    <template v-if="mode == 'quaternary'">
      <input class="mr-1" type="radio" id="1-25" value="1-25%" v-model="selectedQuart" @input="valueInput" />
      <label class="mr-1" for="1-25">1-25%</label>
      <input class="mr-1" type="radio" id="25-50" value="25-50%" v-model="selectedQuart" @input="valueInput" />
      <label class="mr-1" for="25-50">25%-50%</label>
      <input class="mr-1" type="radio" id="50-75" value="50-75%" v-model="selectedQuart" @input="valueInput" />
      <label class="mr-1" for="50-75">50%-75%</label>
      <input class="mr-1" type="radio" id="100" value="100%" v-model="selectedQuart" @input="valueInput" />
      <label class="mr-1" for="100">100%</label>
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
      type: Boolean,
      required: true,
    },
    mode: {
      value: String,
      default: 'binary'
    }
  },
  data() {
    return {
      selectedBoolean: false,
      selectedQuart: ''
    }
  },
  methods: {
    valueInput($event) {
      const value = this.mode == 'binary' ? ($event.target.value == 'true') : $event.target.value
      this.$emit('input', value)
    },
  },
}
</script>

<style scoped>
input {
  display: inline;
  max-width: 100%;
}
</style>
