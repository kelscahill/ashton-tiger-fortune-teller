<template>
  <div class="c-results-card">
    <div class="c-results-card__logo"></div>
    <div class="c-results-card__body o-heading--m u-spacing">
      <p>Ah yes, we can see it now—your <span v-html="results.random[0]"></span> ways will lead you to <span v-html="results.random[1]"></span>, meaning your future will be as bright as a thousand <span v-html="results.random[2]"></span>. You’ll become a master of <span v-html="results.random[3]"></span>, and it is certain you will <span v-html="results.random[4]"></span>. Yes, great things await you in Tigertown!</p>
      <p>Really, your future at Clemson is up to you. We know you’ll make the most of it!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultsCard",
  props: ["results"]
}
</script>