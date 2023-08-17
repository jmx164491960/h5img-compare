import Vue from 'vue'
import Popup from './views/Popup'
import { Slider, Switch } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(Slider)
Vue.use(Switch)

new Vue({
  render: h => h(Popup),
  mounted () {
  }
}).$mount('#app')