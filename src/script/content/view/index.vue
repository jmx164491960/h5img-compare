<template>
  <div class="h5img-compare-border" :style="borderStyle">
    <vue-draggable-resizable :w="w" height="auto" @dragging="onDrag" @resizing="onResize">
      <!-- <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p> -->
      <img style="width: 100%;" :src="imgSrc" />
    </vue-draggable-resizable>
  </div>
</template>
<script>
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
export default {
  data () {
    return {
      imgSrc: '',
      w: window.screen.width,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      zIndex: 0,
      opacity: 0.8
    }
  },
  computed: {
    borderStyle () {
      return {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        'min-height': '100%',
        zIndex: this.zIndex,
        opacity: this.opacity
      }
    }
  },
  methods: {
    start (imgSrc) {
      console.log('start')
      this.imgSrc = imgSrc
    },
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
  }
}
</script>
<style scoped>