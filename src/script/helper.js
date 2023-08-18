const NAMESPACE = 'h5img-compare'
export const getStorageNameById = (id) => {
  return `${NAMESPACE}_${id}`
}

export const getConfigInitState = () => {
  return {
    opacity: 80,
    zIndex: 10,
    enable: false,
    imgSrc: '',
  }
}

export const getSizeInitState = () => {
  return {
    x: 0,
    y: 0,
    w: '100px',
  }
}

export const getCurTab = async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab
}

export const getStorageKey = async function (key) {
  const {id} = await getCurTab()
  return `${key}_${getStorageNameById(id)}`
}

export const setStorageByBg = (key, value) => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "setStorage", payload: {key, value} }, function(response) {
      resolve(response)
      console.log("setStorageByBg", response);
    });
  })
}

export const getStorageByBg = (key) => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getStorage", payload: {key} }, function(response) {
      resolve(response)
      console.log("getStorageByBg", response);
    });
  })
}