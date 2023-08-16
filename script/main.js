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
  chrome.tabs.sendMessage(tab.id, {action:'click' , payload: imgSrc})
}