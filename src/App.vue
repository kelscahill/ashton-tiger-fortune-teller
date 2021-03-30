<template>
  <div class="l-wrap" role="document">
    <main class="l-main">
      <div class="l-main--inner">

        <article
          v-if="isHidden"
          class="c-panel c-panel--home"
        >
          <header class="c-panel__hero">
            <Logo />
          </header>
          <div class="c-panel__content">
            <div class="c-panel__content-body animate__animated animate__fadeIn animate__slower">
              <h1 class="o-heading--m">
                <span>What does a future at<br/>Clemson hold for you?</span>
                <span>You’re just five questions<br />away from finding out.</span>
              </h1>
            </div>
            <footer class="c-panel__content-footer">
              <button role="button" v-on:click="isHidden = false" class="o-button animate__animated animate__fade-in-up animate__delay-1s">Look into the crystal ball!</button>
              <Branding />
            </footer>
          </div>
        </article>

        <article
          v-if="!isHidden && resolutionIndex < quiz.resolutions.length"
          class="c-panel c-panel--resolutions"
          :id="'c-panel--' + resolutionIndex"
          :class="{'is-revised':isRevised}"
        >
          <header class="c-panel__hero">
            <div class="o-progress-bar">
              <progress :value="(resolutionIndex + 1) * 20" max="100"></progress>
            </div>
            <div class="c-panel__hero-heading">
              <span class="o-progress-counter">{{ resolutionIndex + 1 }}/{{ quiz.resolutions.length }}</span>
              <h2 class="o-heading--xl" v-if="!isRevised">
                <span class="o-statement animate__animated animate__fadeIn" v-html="quiz.resolutions[resolutionIndex].statement + '...'"></span>
              </h2>
              <h2 class="o-heading--xl u-animation__delay" v-if="isRevised">
                <span class="o-statement animate__animated animate__fadeIn" v-html="quiz.resolutions[resolutionIndex].statement + ' '"></span>
                <span class="o-statement-value animate__animated animate__fade-in-up" v-html="results.value[resolutionIndex]"></span>
              </h2>
            </div>
          </header>
          <div class="c-panel__content">
            <div class="c-panel__content-body">
              <div class="c-panel__options u-spacing--half u-animation__delay" v-if="!isRevised">
                <button
                  role="button"
                  class="o-button--secondary animate__animated animate__fadeInUp"
                  v-bind:key="revision.id"
                  v-for="(revision, index) in quiz.resolutions[resolutionIndex].revisions"
                  v-on:click="revise(index, resolutionIndex)"
                  :id="'o-revision--' + resolutionIndex + '-' + index"
                  :data-button="revision.button"
                  :data-value="revision.value"
                  :data-gif="revision.gif"
                  :data-random="revision.options[Math.floor(Math.random() * revision.options.length)]"
                  v-html="revision.button"
                ></button>
              </div>
              <div class="c-panel__gif u-spacing animate__animated animate__fadeIn" v-if="isRevised">
                <img :src="require('./assets/gifs/' + resolutionIndex + '/' + selectedIndex + '.gif')" alt="Gif" />
              </div>
            </div>
            <footer class="c-panel__content-footer">
              <button
                role="button"
                class="o-button--secondary animate__animated animate__fadeInUp animate__delay-1s"
                v-if="isRevised"
                v-on:click="next"
              >{{ quiz.resolutions[resolutionIndex].button_text }}</button>
              <Branding />
            </footer>
          </div>
        </article>

        <article
          v-if="resolutionIndex >= quiz.resolutions.length && resultIsHidden"
          class="c-panel c-panel--complete"
        >
          <header class="c-panel__hero">
            <h2 class="o-heading--xl animate__animated animate__fade-in-up">
              <span>Just a moment!</span>
              <span>These things<br />take time.</span>
            </h2>
          </header>
          <div class="c-panel__content">
            <div class="c-panel__content-body animate__animated animate__fadeIn">
              <h3 class="o-heading--m">
                While we're here, let's live in the now and acknowledge how wonderful it is to have you as a Clemson tiger.
              </h3>
            </div>
            <footer class="c-panel__content-footer">
              <button role="button" class="o-button animate__animated animate__fade-in-up animate__delay-1s" v-on:click="resultIsHidden = !resultIsHidden">Look into the crystal ball!</button>
              <Branding />
            </footer>
          </div>
        </article>

        <article
          v-if="resolutionIndex >= quiz.resolutions.length && !resultIsHidden"
          class="c-panel c-panel--results"
        >
          <header class="c-panel__hero" v-on:click="removeClass()">
            <div id="card-square">
              <ResultsCard :results="results" />
            </div>
            <ResultsCard :results="results" class="animate__animated animate__fadeIn" />
          </header>
          <div class="c-panel__content">
            <footer class="c-panel__content-footer">
              <div id="social-share" class="c-social-share">
                <a target="_blank" rel="noopener noreferrer" :href="'https://facebook.com/sharer/sharer.php?u=' + pageUrl">
                  <span class="o-icon"><img src="./assets/icon-facebook.png" alt="Facebook" /></span>Facebook
                </a>
                <a target="_blank" rel="noopener noreferrer" :href="'https://twitter.com/intent/tweet/?text=' + pageTitle + ' @ClemsonUniv&amp;url=' + pageUrl">
                  <span class="o-icon"><img src="./assets/icon-twitter.png" alt="Twitter" /></span>Twitter
                </a>
                <a target="_blank" rel="noopener noreferrer" :href="'https://www.addtoany.com/add_to/sms?linkurl=' + pageUrl + '&linkname=' + pageTitle">
                  <span class="o-icon"><img src="./assets/icon-sms.png" alt="Message" /></span>Message
                </a>
                <a v-on:click="screenshot()" class="o-button__screenshot">
                  <span class="o-icon"><img src="./assets/icon-instagram.png" alt="Instagram" /></span>
                  <font>Instagram<br /><span class="o-small">(Download Your Results)</span></font>
                </a>
              </div>
              <div class="o-buttons u-animation__delay">
                <button role="button" class="o-button--secondary animate__animated animate__fade-in-up u-space--bottom" v-on:click="reload()">I see it, yes!</button>
                <button role="button" class="o-button animate__animated animate__fade-in-up" v-on:click="addClass()">Look into the crystal ball!</button>
              </div>
              <Branding />
            </footer>
          </div>
        </article>

      </div>
    </main>
  </div>
</template>

<script>
var quiz = {
  resolutions: [
    {
      id: 0,
      statement: "On the first day of school I’d like to",
      button_text: "I see it, yes!",
      revisions: [
        {
          id: 0,
          button: "Get to class early",
          value: "get to class early.",
          options: [
            "early-bird",
            "bright-and-early",
            "bushy-tailed"
          ]
        },
        {
          id: 1,
          button: "Rep my Clemson t-shirt",
          value: "rep my Clemson t-shirt",
          options: [
            "school-spirit",
            "orange-rocking",
            "superfan",
          ]
        },
        {
          id: 2,
          button: "Sign up for a club team",
          value: "sign up for a club team",
          options: [
            "dream-team",
            "highly coordinated",
            "league-leading"
          ]
        },
        {
          id: 3,
          button: "Grab lunch with a new friend",
          value: "grab lunch with a new friend",
          options: [
            "socially savvy",
            "in-demand",
            "well liked"
          ]
        }
      ]
    }
  ]
};

import Logo from './components/Logo.vue'
import Branding from './components/Branding.vue'
import ResultsCard from './components/ResultsCard.vue'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

export default {
  name: "App",
  components: {
    Logo,
    Branding,
    ResultsCard,
  },
  data() {
    return {
      quiz: quiz,
      resolutionIndex: 0,
      resultIsHidden: true,
      isHidden: true,
      isRevised: false,
      pageUrl: 'http://tiger-fortune-teller.test/',
      pageTitle: "Tiger Fortune Teller",
      results: {
        button: [],
        value: [],
        gif: [],
        random: []
      }
    }
  },
  methods: {
    next() {
      setTimeout(() => {
        if (this.resolutionIndex < this.quiz.resolutions.length) {
          this.resolutionIndex++;
        }
        this.isRevised = false;
      }, 300)
    },
    removeClass() {
      document.getElementById("social-share").classList.remove('is-active');
      document.getElementById("social-share").classList.add('is-inactive');
    },
    addClass() {
      document.getElementById("social-share").classList.add('is-active');
    },
    revise(index, resolutionIndex) {
      var id = resolutionIndex + '-' + index;
      document.getElementById("o-revision--" + id).classList.add('is-active');
      document.getElementById("c-panel--" + resolutionIndex).classList.add('is-active');
      setTimeout(() => {
        this.selectedIndex = index;
        this.isRevised = true;
        this.results.button[resolutionIndex] = document.getElementById("o-revision--" + id).dataset.button;
        this.results.value[resolutionIndex] = document.getElementById("o-revision--" + id).dataset.value;
        this.results.gif[resolutionIndex] = document.getElementById("o-revision--" + id).dataset.gif;
        this.results.random[resolutionIndex] = document.getElementById("o-revision--" + id).dataset.random;
      }, 1000)
    },
    screenshot() {
      var cardSquare = document.getElementById("card-square");
      html2canvas(cardSquare, {
        width: 600,
        height: 600,
        scrollX: 0,
        scrollY: -window.scrollY
      }).then(function(canvas) {
        canvas.toBlob(function(blob) {
          saveAs(blob, "Tiger-Fortune-Teller.png");
        });
      });
    },
    reload() {
      location.reload();
    },
  }
}
</script>