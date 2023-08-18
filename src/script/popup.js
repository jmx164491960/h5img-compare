import Vue from 'vue'
import Popup from './views/Popup'
import { Slider, Switch, Upload, Button } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(Slider)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Button)

new Vue({
  render: h => h(Popup),
  mounted () {
  }
}).$mount('#app')