<template>
  <div>
    <div v-if="$i18n.locale === 'no'">
        <p class="m-4 font-bold">Velkommen til Online Learning Practices Survey!<br /><br />Ønsker du at IT-undervisningen i Norge skal bli enda bedre?</p>
        <p class="m-4">Denne undersøkelsen handler om hvordan studenter innen data- og programvare bruker internett til å lære programvareutvikling.
          Studien er en del av et PhD-prosjekt ved Institutt for pedagogikk ved UiO. Den anonyme dataen som blir samlet inn,
          vil bli brukt til å gi anbefalinger til forbedring av undervisningen for studenter som studerer IKT-relaterte emner på universiteter i Norge.
        </p>
        <p class="m-4">
          I undersøkelsen vil du få spørsmål om hva du gjør og hvilke nettsteder du bruker når du lærer programvareutvikling eller jobber med programvareprosjekter/oppgaver.
          I tillegg benytter vi en Google Chrome Extension som teller hvor mange ganger du har besøkt/fått tilgang til nettstedene du krysset av for i undersøkelsen i løpet av de siste tre månedene.
          <a href="https://github.com/engagelab/myls" target="default" class="text-blue-600 cursor-pointer">Her</a> kan du sjekke kildekoden til Google Chrome Extension selv.
          Undersøkelse ta ca. 10 minutter å svare på.</p>
        <p class="m-4">Undersøkelsen samler ingen annen type informasjon enn det som er oppgitt over.
          Som forsker ved UiO samler og behandler jeg dine data i henhold til lovgivning om personvern i Norge og Europa (GDPR). Data som samles inn om deg vil bli anonymisert,
          og lagres trygt på en sikret UiO-server. Du vil ikke bli gjenkjent av andre eller av lærerne dine.
          Bare din personlige e-post vil bli brukt til å invitere deg til et intervju på Zoom.</p>
        <p class="m-4">Hvis du har spørsmål, eller ønsker å vite mer om prosjektet, så kontakt meg på a.a.a.moya@iped.uio.no</p>
        <p class="m-4">Tusen takk for din deltakelse!</p>
        <p class="m-4">Andres Araos</p>
        <div class="flex flex-row m-4">
          <p>Jeg ønsker å delta i lotteri for å vinne et gavekort på 500 kroner fra Elkjøp</p>
          <AnswerInput mode="binary" :value="lottery" @input="value => $emit('lottery', value)" />
        </div>
    </div>

    <div v-else-if="$i18n.locale === 'en'">
        <p class="m-4 font-bold">Welcome to the Online Learning Practices Survey!<br /><br />Do you want the software development teaching to be even better?</p>
        <p class="m-4">This anonymous survey is about how students in Computer Science and Software Engineering courses use the internet to learn software development.
          The anonymous data collected will be used to give recommendations for improving teaching for students studying ICT-related subjects at universities in Norway and Australia.
          The study is part of a PhD project at the Department of Education at University of Oslo.</p>
        <p class="m-4">
          The survey asks you about what you do and what websites you use to learn new things about software development or work on software projects/tasks.
          The survey uses a Google Chrome extension to count how many times you have accessed the websites for your selected activities in the last three months.
          <a href="https://github.com/engagelab/myls" target="default" class="text-blue-600 cursor-pointer">Here</a> you can check the source code of Chrome extension yourself. The survey takes approx. 10 min. to answer.</p>
        <p class="m-4">The extension does not collect any other type of information than what you allow for through the survey.
          As a researcher, I am respecting the legislation on data privacy in Norway and Europe (GDPR).
          The data will be anonymised, and analyzed and stored securely, on a secured UiO-server. You will not be recognized by others or by your teachers.
          In case you agree to, only your personal email will be used to invite you to an interview on Zoom.</p>
        <p class="m-4">If you have questions, or want to know more about the project, contact me at a.a.a.moya@iped.uio.no.</p>
        <p class="m-4">Thank you very much for your participation!</p>
        <p class="m-4">Andres Araos</p>
        <div class="flex flex-row m-4">
          <p>I would like to participate in the lottery to win a gift card of AUD $50</p>
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
