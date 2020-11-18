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
        <p class="m-4">This survey is about your use of resources from the Internet when you learn software development.
          It asks you about how you solve problems and learn new skills when you work on a software development task,
          and how you get information about professional software development and manage your future career as a software developer.
          The survey collects data from your browsing history, <u>only</u> of the websites <u>you report to use</u> during the survey for those activities,
          and <u>only the frequency</u> with which you access these sites in time</p>
        <p class="m-4">The data collected from you will be anonymized and it will be stored safely, according to the regulations for data protection in Norway and Europe (GDPR).
          You will not be recognized by others or your teachers.</p>
          <p class="m-4"><span class="text-blue-600 cursor-pointer" @click="$emit('mode', 'anon')">Here</span> you can learn more about how we anonymize your data and about the data we collect from your browser history
           [link to separate page with a sample of the table of raw data].</p>
        <p class="m-4">This study is part of a PhD project at the Department of Education at UiO. The project studies how computer and software engineering students use the Internet to learn programming.
          If you have any questions and or want to know more, contact me at a.a.a.moya@iped.uio.no.</p>
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
