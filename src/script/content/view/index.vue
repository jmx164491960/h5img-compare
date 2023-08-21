<template>
  <div class="h5-differ-border" :style="borderStyle">
    <vue-draggable-resizable :w="sizes.w" h="auto" :x="sizes.x" :y="sizes.y" @dragging="onDrag" @resizing="onResize">
      <!-- <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p> -->
      <img style="width: 100%;" :src="config.imgSrc" />
    </vue-draggable-resizable>
  </div>
</template>
<script>
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import { getConfigInitState, getSizeInitState, NAMESPACE } from '../../helper'
import debounce from 'lodash/debounce'
const saveSize = debounce((value) => {
  localStorage.setItem(`${NAMESPACE}_sizes`, value)
}, 300)

export default {
  data () {
    return {
      config: getConfigInitState(),
      sizes: getSizeInitState()
    }
  },
  computed: {
    borderStyle () {
      return {
        position: 'fixed',
        left: this.sizes.x,
        top: this.sizes.y,
        width: this.sizes.width,
        'min-height': '100%',
        zIndex: this.config.zIndex,
        opacity: this.config.opacity / 100
      }
    }
  },
  methods: {
    start (config) {
      if (config) this.config = config
      console.log('start', config, this.config)
    },
    onResize: function (x, y, width, height) {
      this.sizes.x = x
      this.sizes.y = y
      this.sizes.w = width
      this.sizes.h = height
      console.log('onResize:', x, y, width, height)
      saveSize(JSON.stringify(this.sizes))
    },
    onDrag: function (x, y) {
      this.sizes.x = x
      this.sizes.y = y
      console.log('onDrag:', x, y)
      saveSize(JSON.stringify(this.sizes))
    }
  }
}
</script>
<style scoped></style>