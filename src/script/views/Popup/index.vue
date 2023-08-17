<template>
  <div class="popup">
    <div>选择图片</div>
    <input type="file" id="imgUpload" accept="image/*" />
    <button class="btn1">测试</button>
    <a-slider v-model="opacity" :min="0.01" :max="1" :default-value="30" />
    <a-switch v-model="enable" />
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
const updateSlider = debounce((callback) => {
  callback()
}, 300)
export default {
  data () {
    return {
      opacity: 0.8,
      enable: false
    }
  },
  watch: {
    opacity (val) {
      const that = this
      updateSlider(async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.tabs.sendMessage(tab.id, {action:'opacity' , payload: that.opacity})
      })
    }
  },
  mounted () {
    document.getElementById('imgUpload').addEventListener('change', (event) => {
      const file = event.target.files[0]
      if (file) {
        console.log('file:', file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          const img = document.createElement('img')
          img.src = e.target.result
          console.log('img:', img)
          img.style.width = '100px'
          document.documentElement.appendChild(img)
          // chrome.runtime.sendMessage({ greeting: "Hello from default_popup!" });

          sendImg(e.target.result)
        }
      }
    })

    const sendImg = async (imgSrc) => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.tabs.sendMessage(tab.id, {action:'imgSrc' , payload: imgSrc})
    }

  }
}
</script>