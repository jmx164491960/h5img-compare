<template>
  <div class="popup">
    <!-- <div>选择图片</div>
    <input type="file" id="imgUpload" accept="image/*" />
    <img :style="{width: '100px'}" :src="imgSrc" />
    <button class="btn1">测试</button> -->
    <div class="p-row">
      <div class="label">图片</div>
      <div>
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img class="upload-img" v-if="imgSrc" :src="imgSrc" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </div>
    </div>
    <div class="p-row">
      <div class="label">不透明度</div>
      <div><a-slider v-model="opacity" :min="0" :max="100" /></div>
    </div>
    <div class="p-row">
      <div class="label">z-index</div>
      <div><a-slider v-model="zIndex" :min="-10" :max="999" /></div>
    </div>
    <div class="p-row">
      <div class="label">是否启用</div>
      <div><a-switch v-model="enable" /></div>
    </div>
    <div class="p-bottom">
      <a-button>确定</a-button>
    </div>
    <!-- <button @click="testRead">测试读</button> -->
    <!-- <button @click="testWrite">测试写</button> -->
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
import tabController from './tabController'
const updateSlider = debounce((callback) => {
  callback()
}, 300)
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const sendImg = async (imgSrc) => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.tabs.sendMessage(tab.id, {action:'imgSrc' , payload: imgSrc})
    }
export default {
  data () {
    return {
      opacity: 80,
      zIndex: 10,
      enable: false,
      imgSrc: '',
      loading: false
    }
  },
  watch: {
    opacity (val) {
      const that = this
      updateSlider(async () => {
        if (chrome && chrome.tabs) {
          let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          chrome.tabs.sendMessage(tab.id, {action:'opacity' , payload: that.opacity})
          tabController.set('opacity', that.opacity)
        }
      })
    },
    zIndex (val) {
      const that = this
      updateSlider(async () => {
        if (chrome && chrome.tabs) {
          // let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          // chrome.tabs.sendMessage(tab.id, {action:'zIndex' , payload: that.zIndex})
          tabController.set('zIndex', that.zIndex)
        }
      })
    }
  },
  mounted () {
    this.revertValue()
    // document.getElementById('imgUpload').addEventListener('change', (event) => {
    //   const file = event.target.files[0]
    //   if (file) {
    //     console.log('file:', file)
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = (e) => {
    //       const img = document.createElement('img')
    //       img.src = e.target.result
    //       console.log('img:', img)
    //       img.style.width = '100px'
    //       document.documentElement.appendChild(img)
    //       // chrome.runtime.sendMessage({ greeting: "Hello from default_popup!" });

    //       sendImg(e.target.result)
    //       this.imgSrc = e.target.result
    //       tabController.set('imgSrc', e.target.result)
    //     }
    //   }
    // })

    // const sendImg = async (imgSrc) => {
    //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    //   chrome.tabs.sendMessage(tab.id, {action:'imgSrc' , payload: imgSrc})
    // }

  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imgSrc = imageUrl;
          sendImg(imageUrl)
          tabController.set('imgSrc', this.imgSrc)
          this.loading = false;
        });
      }
    },
    beforeUpload () {
      return true
    },
    async revertValue () {
      const opacity = await tabController.get('opacity')
      const zIndex = await tabController.get('zIndex')
      const imgSrc = await tabController.get('imgSrc')
      if (opacity) this.opacity = opacity
      if (zIndex) this.zIndex = zIndex
      if (imgSrc) this.imgSrc = imgSrc
    },
    async testRead () {
      const opacity = await tabController.get('opacity')
      const zIndex = await tabController.get('zIndex')
      console.log('testClick:', {opacity, zIndex})
    },
    testWrite () {
      tabController.set('opacity', 0.8)
    },
  }
}
</script>
<style lang="scss">
.popup {
  min-width: 300px;
  padding: 20px;
}
.p-row {
  .label {
    padding: 10px 0;
  }
}
.upload-img {
  max-width: 90px;
  max-width: 90px;
}
.p-bottom {
  padding: 10px 0;
}
</style>