import { getStorageNameById } from "../../helper";

class TabController {
  data = null
  constructor () {
    
  }
  async getCurTab () {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab
  }
  async setStorage (key, value) {
    const res = {}
    res[key] = value
    console.log('setStorage:', res)
    // const {id} = await this.getCurTab(key, value)
    chrome.storage.session.set(res)
  }
  async getStorage (key) {
    const {id} = await this.getCurTab()
    const name = getStorageNameById(id)
    return new Promise((resolve) => {
      chrome.storage.session.get(key, (res) => resolve(res[name]))
    })
  }
  async set (key, value) {
    const {id} = await this.getCurTab()
    const name = getStorageNameById(id)
    // if (!this.data) {
      const res = await this.getStorage(name) || {}
      this.data = res
    // }
    this.data[key] = value
    this.setStorage(name, this.data)
  }
  async get (key) {
    const {id} = await this.getCurTab()
    const name = getStorageNameById(id)
    // if (!this.data) {
      const res = await this.getStorage(name) || {}
      console.log('get', res)
      this.data = res
    // }
    return this.data[key]
  }
}
const tabController = new TabController()
export default tabController