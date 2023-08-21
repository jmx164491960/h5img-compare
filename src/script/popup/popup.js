import Vue from 'vue'
import Popup from './view'
// import { Slider, Switch, Upload, Button } from 'ant-design-vue'
import Slider from 'ant-design-vue/es/slider'
import Switch from 'ant-design-vue/es/switch'
import Upload from 'ant-design-vue/es/upload'
import Button from 'ant-design-vue/es/button'
import 'ant-design-vue/dist/antd.css';
Vue.use(Slider)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Button)

console.log('process.env:', process.env)

new Vue({
  render: h => h(Popup),
  mounted () {
  }
}).$mount('#app')