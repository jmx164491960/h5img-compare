console.log('init content!', !!chrome.runtime.onMessage, !!chrome.extension)

class ImgController {
  $img = undefined
  constructor () {

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
const imgController = new ImgController()

chrome.runtime.onMessage.addListener((request , sender , sendResponse) => {
  const { action, payload } = request;
  console.log(request);
  imgController.add(payload)
  // sendResponse("content got!")
})