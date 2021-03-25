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
                What does a future at Clemson hold for you?<br />
                <span class="u-font--secondary">You’re just five questions away from finding out.</span>
              </h1>
            </div>
            <footer class="c-panel__content-footer">
              <button v-on:click="isHidden = false" class="o-button--primary animate__animated animate__fade-in-up animate__delay-1s">Look into the crystal ball!</button>
              <Branding />
            </footer>
          </div>
        </article>

        <article
          v-if="!isHidden && resolutionIndex < quiz.resolutions.length"
          class="c-panel c-panel--resolutions"
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
              <h2 class="o-heading--xl" v-if="isRevised">
                <span class="o-statement animate__animated animate__fadeIn" v-html="quiz.resolutions[resolutionIndex].statement + ' '"></span>
                <span class="o-habit" v-html="results.value[resolutionIndex]"></span>
              </h2>
            </div>
          </header>
          <div class="c-panel__content">
            <div class="c-panel__content-body">
              <div class="c-panel__options u-spacing--half u-animation__delay" v-if="!isRevised">
                <button
                  class="o-button--secondary animate__animated animate__fadeInUp"
                  v-bind:key="revision.id"
                  v-for="(revision, index) in quiz.resolutions[resolutionIndex].revisions"
                  v-on:click="revise(index, resolutionIndex)"
                  role="button"
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
                class="o-button--secondary animate__animated animate__fadeInUp animate__delay-1s"
                v-if="isRevised"
                v-on:click="next"
              >{{ quiz.resolutions[resolutionIndex].button_text }}</button>
            </footer>
          </div>
        </article>

        <article
          v-if="resolutionIndex >= quiz.resolutions.length && resultIsHidden"
          class="c-panel c-panel--complete"
        >
          <header class="c-panel__hero">
            <h2 class="o-heading--xl animate__animated animate__fade-in-up">Your future<br/>looks bright.</h2>
            <Scribble />
          </header>
          <div class="c-panel__content">
            <div class="c-panel__content-body animate__animated animate__fadeIn">
              <h3 class="o-heading--m">
                Way to take things from bad to good! We're making your revisions now.<br/><br/>In the meantime, Team Ashton would like to wish you a happier, healthier year ahead.
              </h3>
            </div>
            <footer class="c-panel__content-footer">
              <button class="o-button--tertiary animate__animated animate__fade-in-up" v-on:click="resultIsHidden = !resultIsHidden">See your masterpiece</button>
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
                <a target="_blank" :href="'https://facebook.com/sharer/sharer.php?u=' + pageUrl">
                  <span class="o-icon"><img src="./assets/icon-facebook.png" alt="Facebook" /></span>Facebook
                </a>
                <a target="_blank" :href="'https://twitter.com/intent/tweet/?text=' + pageTitle + ' @ashtondesignllc&amp;url=' + pageUrl">
                  <span class="o-icon"><img src="./assets/icon-twitter.png" alt="Twitter" /></span>Twitter
                </a>
                <a target="_blank" :href="'https://www.addtoany.com/add_to/sms?linkurl=' + pageUrl + '&linkname=' + pageTitle">
                  <span class="o-icon"><img src="./assets/icon-sms.png" alt="Message" /></span>Message
                </a>
                <a v-on:click="screenshot()" class="o-button__screenshot">
                  <span class="o-icon"><img src="./assets/icon-instagram.png" alt="Instagram" /></span>
                  <font>Instagram<br /><span class="o-small">(Download Your Results)</span></font>
                </a>
              </div>
              <button class="o-button animate__animated animate__fade-in-up" v-on:click="addClass()">Share with your friends</button>
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
          value: "get to class early",
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
import Scribble from './components/Scribble.vue'
import ResultsCard from './components/ResultsCard.vue'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

export default {
  name: "App",
  components: {
    Logo,
    Branding,
    Scribble,
    ResultsCard,
  },
  data() {
    return {
      quiz: quiz,
      resolutionIndex: 0,
      resultIsHidden: true,
      isHidden: true,
      isRevised: false,
      pageUrl: 'https://ashton-design.com/2020Revised/',
      pageTitle: "Revise your 2020!",
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
      setTimeout(() => {
        this.selectedIndex = index;
        this.isRevised = true;
        this.results.button[resolutionIndex] = document.getElementById("o-revision--" + id).dataset.button;
        this.results.value[resolutionIndex] = document.getElementById("o-revision--" + id).dataset.value;
        this.results.gif[resolutionIndex] = document.getElementById("o-revision--" + id).dataset.gif;
        this.results.random[resolutionIndex] = document.getElementById("o-revision--" + id).dataset.random;
      }, 300)
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
          saveAs(blob, "2020Revised.png");
        });
      });
    },
  }
}
</script>