<template>
  <div>
    <div v-if="$i18n.locale === 'no'">
        <p class="m-4 font-bold">Velkommen til Online Learning Practices Survey!</p>
        <p class="m-4">Denne undersøkelsen handler om hvordan studenter innen data- og programvare bruker internett til å lære programmering.
          Studien er en del av et PhD-prosjekt ved Institutt for pedagogikk ved UiO.
        </p>
        <p class="m-4">
          Undersøkelsen vil samler inn data fra din nettleserloggen, <u>men kun</u> på nettstedene som <u>du rapporterer å ha brukt</u> for aktiviteter du angir,
          og <u>kun hvor ofte og lenge</u> du får tilgang til disse nettstedene.</p>
        <p class="m-4">Dataene som samles inn om deg vil bli anonymisert og lagres trygt, i henhold til lovgivningen om personvern i Norge og Europa (GDPR).
          Du vil ikke bli gjenkjent av andre eller av lærerne dine.</p>
          <p class="m-4">
            <span class="text-blue-600 cursor-pointer" @click="$emit('mode', 'anon')">Her</span>
            kan du lese mer om hvordan vi anonymiserer dataene dine og om dataene vi samler inn fra nettleserloggen din..</p>
        <p class="m-4">Hvis du har spørsmål eller ønsker å vite mer om prosjektet, kontakt meg på a.a.a.moya@iped.uio.no.</p>
        <p class="m-4">Tusen takk for din deltakelse!</p>
        <p class="m-4">Andres Araos</p>
        <div class="flex flex-row m-4">
          <p>Jeg ønsker å delta i lotteri for å vinne et gavekort på 500 kroner fra Elkjøp</p>
          <AnswerInput mode="binary" :value="lottery" @input="value => $emit('lottery', value)" />
        </div>
    </div>

    <div v-else-if="$i18n.locale === 'en'">
        <p class="m-4">Welcome to the Online Learning Practices Survey!</p>
        <p class="m-4">This survey is about how students in Computer Science and Software Engineering courses use the internet to learn programming. The study is part of a PhD project at the Department of Education at University of Oslo.</p>
        <p class="m-4">
          The survey will collect data about what you do when you work on programming tasks. In addition, it will collect some data from your browser history, but <u>only</u> from those sites that you report having used for programming tasks. No personal data or other browsing history is collected.</p>
        <p class="m-4">The data will be anonymised and stored securely, in accordance with the legislation on privacy in Norway and Europe (GDPR). You will not be recognized by others or by your teachers.</p>
        <p class="m-4"><span class="text-blue-600 cursor-pointer" @click="$emit('mode', 'anon')">Here</span> you can read more about how your data will be anonymized and about the data we collect from the browser history.</p>
        <p class="m-4">If you have questions or want to know more about the project, contact Andres Araos at a.a.a.moya@iped.uio.no.</p>
        <p class="m-4">Thank you very much for your participation!</p>
        <p class="m-4">Andres Araos</p>
        <div class="flex flex-row m-4">
          <p>I would like to participate in the lottery to win a gift card of 500 kr. from Elkjøp </p>
          <AnswerInput mode="binary" :value="lottery" @input="value => $emit('lottery', value)" />
        </div>
  </div>
  </div>
</template>


<script>
import AnswerInput from './AnswerInput.vue'
export default {
  name: 'StartPage',
  components: {
    AnswerInput
  },
  props: {
    lottery: {
      value: String,
      default: 'false',
    }
  }
}
</script>

<style scoped>
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
