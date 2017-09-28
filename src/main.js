// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import './styles/app.scss';
import router from './router'

import 'animate.css/animate.css'

// export const socket = io.connect("https://bddi-chat2017.herokuapp.com/");
export const socket = io.connect("http://localhost:3000");

export const EventBus = new Vue();

Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
