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
          <img class="upload-img" v-if="config && config.imgSrc" :src="config.imgSrc" alt="avatar" />
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
      <div><a-slider v-model="config.opacity" :min="0" :max="100" /></div>
    </div>
    <div class="p-row">
      <div class="label">z-index</div>
      <div><a-slider v-model="config.zIndex" :min="-10" :max="999" /></div>
    </div>
    <div class="p-row">
      <div class="label">是否启用</div>
      <div><a-switch v-model="config.enable" /></div>
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
import { getConfigInitState } from '../../helper'
const updateSlider = debounce((callback) => {
  callback()
}, 300)
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const sendToContent = async (action, payload) => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.tabs.sendMessage(tab.id, {action, payload})
    }
export default {
  data () {
    return {
      config: getConfigInitState(),
      loading: false
    }
  },
  watch: {
    'config.opacity': function (val) {
      const that = this
      updateSlider(async () => {
        if (chrome && chrome.tabs) {
          sendToContent('config', that.config)
          tabController.set('config', that.config)
        }
      })
    },
    'config.zIndex': function (val) {
      const that = this
      updateSlider(async () => {
        if (chrome && chrome.tabs) {
          let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          sendToContent('config', that.config)
          tabController.set('config', that.config)
        }
      })
    }
  },
  mounted () {
    this.revertValue()
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
          this.config.imgSrc = imageUrl;
          sendToContent('config', this.config)
          tabController.set('config', this.config)
          this.loading = false;
        });
      }
    },
    beforeUpload () {
      return true
    },
    async revertValue () {
      const config = await tabController.get('config') || getConfigInitState()
      this.config = config
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