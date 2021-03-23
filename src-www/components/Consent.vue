<template>
  <div>
    <div v-if="$i18n.locale === 'no'">
        <h1 class="font-bold text-lg">Informert samtykke</h1>
        <p
          class="mt-4"
        >Takk for at du deltar i denne studien!</p>
        <p
          class="mt-4"
        >Vennligst les om prosjektet og hvordan vi samler inn, lagrer og behandler data, i informasjonsbrevet som du finner <span class="text-blue-600 cursor-pointer" @click="$emit('mode', 'tandc')">her</span>.</p>

        <p class="mt-4">
          Jeg har mottatt og forstått informasjonen om prosjektet som <i>utforsker studenters læring med nettbaserte ressurser og digitale verktøy.</i>
          Jeg har fått mulighet til å stille spørsmål. Jeg gir samtykke til:
          <ul class="list-disc list-inside m-2">
            <li>å delta i en undersøkelse</li>
            <li>å gi tilgang til nettleserloggen til nettstedene jeg erklærer å bruke bare for hensikten med denne undersøkelsen.</li>
            <li>å delta i et intervju</li>
          </ul>
        </p>
        <div class="flex flex-row mt-4">
          <p>Jeg gir samtykke til at personopplysningene mine behandles frem til prosjektets sluttdato, ca. januar 2022.</p>
          <AnswerInput mode="binary" :value="consented" @input="value => $emit('consented', value)" />
        </div>
    </div>

    <div v-else-if="$i18n.locale === 'en'">
      <h1 class="font-bold text-lg">Informed consent</h1>
      <p
        class="mt-4"
      >Thank you for agreeing to participate in this survey study!</p>
      <p
        class="mt-4"
      >Please, read about the project and how it collects, stores and processes data in the Information Letter that you can find <span class="text-blue-600 cursor-pointer" @click="$emit('mode', 'tandc')">here</span>.</p>

      <p class="mt-4">
        I have received and understood information about the project <i>exploring undergraduate students’ learning with non-curricular resources and digital tools</i> and have been given the opportunity to ask questions. I give consent:
        <ul class="list-disc list-inside m-2">
          <li>To participate in a survey</li>
          <li>To provide access to the web browsing history of the websites I declare to use only for the purpose of this survey.</li>
          <li>To participate in an interview</li>
        </ul>
      </p>
      <div class="flex flex-row mt-4">
        <p>I give consent for my personal data to be processed until the end date of the project, approx. January 2021.</p>
        <AnswerInput mode="binary" :value="consented" @input="value => $emit('consented', value)" />
      </div>
    </div>

    <div class="flex flex-row py-2">
      <span class="py-1">{{ $t('email') }}:&nbsp;</span>
      <AnswerInput mode="email" placeholder="user@example.com" :value="email" @input="value => $emit('email', value)" />
    </div>
    <div class="flex flex-row">
      <button
        class="btn-myls"
        :class="{ 'btn-disabled': !consented || !validEmail }"
        @click="$emit('give-consent')"
        :disabled="!consented || !validEmail"
      >{{ $t('confirm') }}</button>
    </div>

  </div>
</template>

<i18n>
{
  "en": {
    "confirm": "Confirm",
    "email": "Email address"
  },
  "no": {
    "confirm": "Bekreft",
    "email": "E-postadresse"
  }
}
</i18n>

<script>
import AnswerInput from './AnswerInput.vue'
const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
export default {
  name: 'StartPage',
  components: {
    AnswerInput
  },
  props: {
    email: {
      value: String,
      default: '',
    },
    consented: {
      value: String,
      default: 'false',
    }
  },
  computed: {
    validEmail() {
      return emailRegex.test(this.email)
    },
  }
}
</script>

<style lang="postcss" scoped>
h1 {
  @apply font-bold text-2xl mb-4;
}
h2 {
  @apply pt-4 font-bold;
}
ul {
  @apply list-disc list-inside m-2;
}
</style>
