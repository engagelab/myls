import Vue from 'vue'
import VueI18n from 'vue-i18n'
import './assets/css/tailwind.css'
import App from './App.vue'

Vue.use(VueI18n);
// eslint-disable-next-line
const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en'
})

// eslint-disable-next-line
new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
