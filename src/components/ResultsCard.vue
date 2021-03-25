<template>
  <div class="c-results-card">
    <img src="../assets/logo.png" alt="Tiger Fortune Teller" class="c-results-card__logo">
    <div class="c-results-card__body o-heading--l">Watch out world! This <span v-html="results.random[0]"></span> </div>
  </div>
</template>

<script>
export default {
  name: "ResultsCard",
  props: ["results"]
}
</script>