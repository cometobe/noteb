// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import $ from 'jquery'
import fullCalendar from './components/fullCalendar.vue'
Vue.component('full-calendar', fullCalendar)
import store from './store/index'

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.use(iView);

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
