import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/pages/Home.vue';
import Login from '../components/pages/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

