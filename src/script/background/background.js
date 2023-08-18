import { getStorageNameById } from "../helper"

export const setStorage = (key, value) => {
  const res = {}
  res[key] = value
  return chrome.storage.session.set(res)
}

export const getStorage = (key, id) => {
  const name = `${key}_${getStorageNameById(id)}`
  return new Promise((resolve) => {
    hrome.storage.session.get(name, (res) => resolve(res))
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getCurrentTabId") {
    var currentTabId = sender.tab.id
    sendResponse({ tabId: currentTabId })
  }
  return true
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "setStorage") {
    const {key,value} = payload
    const currentTabId = sender.tab.id
    setStorage(key, value)
    sendResponse({ currentTabId })
  }
  return true
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getStorage") {
    const {key} = payload
    const id = sender.tab.id
    const value = getStorage(key, id)
    sendResponse({ value })
  }
  return true
})