export const set = (key, val) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(val))
    return true
  } catch (e) {
    return false
  }
}

export const get = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch(e) {
    return null
  }
}

export const remove = (key) => {
  try {
    window.localStorage.removeItem(key)
    return true
  } catch(e) {
    return null
  }
}
