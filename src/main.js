import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import './assets/reset-variable.scss'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { zhLocale, size: 'mini', zIndex: 3000 })
Vue.config.productionTip = false
new Vue({
  el: '#app',
  render: h => h(App)
})
