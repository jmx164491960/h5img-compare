console.log('init content!', !!chrome.runtime.onMessage, !!chrome.extension)

import Vue from 'vue'
import Content from './views/Content'
import VueDraggableResizable from 'vue-draggable-resizable'

class ContentController {
  $img = undefined
  $root = undefined
  $vm = undefined
  zIndex = 999
  opacity = 0.8
  constructor () {

  }

  /**
   * 挂在使用Vue的根节点
   */
  buildApp ({imgSrc}) {
    if (this.$root) return
    const that = this
    const $root = document.createElement('div')
    this.$root = $root
    $root.id = 'h5img-compare'
    document.documentElement.appendChild($root)
    Vue.component('vue-draggable-resizable', VueDraggableResizable)
    new Vue({
      render: h => h(Content),
      mounted () {
        that.$vm = this.$children[0]
        that.$vm.zIndex = that.zIndex
        that.$vm.opacity = that.opacity
        console.log('mount done', this.$children[0].start(imgSrc))
        // this.start(imgSrc)
      }
    }).$mount('#h5img-compare')
  }

  $set (key, value) {
    if (!this.$vm) {
      this.$vm[key] = value
    } else {
      this[key] = value
    }
  }

  add (src) {
    if (this.$img) {
      this.$img.src = src
    } else {
      this.$img = document.createElement('img')
      this.$img.src = src
      this.$img.classname = 'rr-block rr-ignore'
      this.$img.style.opacity = '0.5'
      this.$img.style.position = 'fixed'
      document.documentElement.appendChild(this.$img)
    }
  }
}
const contentController = new ContentController()

chrome.runtime.onMessage.addListener((request , sender , sendResponse) => {
  const { action, payload } = request;
  // console.log(request);
  // contentController.add(payload)
  if (action === 'imgSrc') {
    contentController.buildApp({imgSrc:payload})
  } else if (action === 'zIndex') {
    console.log('zIndex', payload)
    this.$set('zIndex', payload)
  } else if (action === 'opacity') {
    this.$set('opacity', payload)
  }
  // sendResponse("content got!")
})