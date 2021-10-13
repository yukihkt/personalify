// Import Page Transition Barba
import barba from '@barba/core'

// Import Vue Typed.JS
import Vue from 'vue'
import VueTypedJs from 'vue-typed-js'
Vue.use(VueTypedJs)

// Import Vuesax
import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)
Vue.config.productionTip = false
// new Vue({
//   render: h => h(App)
// }).$mount('#main')

// Import Vue Carousel 3D
import Carousel3d from 'vue-carousel-3d';
Vue.use(Carousel3d);

// Page Transition
barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});

charArr = []
for (var i=1; i<=30; i++) {
  charArr[i] = "images/random_standing/" + i + ".png"
}
console.log(charArr)

const main = Vue.createApp({
  data() {
    return {
      inputName: "",

      charArr = charArr
    }
  },

  methods: {
    

  },

  components: {
    'carousel-3d': window['carousel-3d'].Carousel3d,
    'slide': window['carousel-3d'].Slide
  }
})
main.mount('#main')