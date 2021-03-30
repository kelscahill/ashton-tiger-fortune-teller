<template>
  <div class="c-results-card">
    <img src="../assets/logo.png" alt="Tiger Fortune Teller" class="c-results-card__logo">
    <div class="c-results-card__body o-heading--l u-spacing">
      <p>Watch out world! This <span v-html="results.random[0]"></span></p>
      <p>Really, your future at Clemson is up to you. We know you'll make the most of it!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultsCard",
  props: ["results"]
}
</script>