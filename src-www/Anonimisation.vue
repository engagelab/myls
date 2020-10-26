<template>
  <div>
    <h1 class="m-2">Data Anonymization and Browser History Data</h1>
    <p class="m-4">The moment you submit the survey, all your answers and the data from your browser history will be stored and analyzed using an encrypted ID code.
      I will only access your personal email once the analysis of that data is over, in order to invite you to participate in a group interview on Zoom.
      The results of this analysis won’t reveal any specific individual response.
      In the image you can see an example of how the browser history data collected and the encrypted coding looks like.
    </p>
    <div class="flex flex-row justify-center">
      <img src="./assets/anonTable.png" />
    </div>
  </div>
</template>

<style scoped>
p {
  @apply pt-2;
}
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
