import config from './config'

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data, header = {}, login = Boolean) {
  return new Promise((resolve, reject) => {
    wx.request({
      login,
      data,
      method,
      header,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data)
          console.log(res.data)
        } else if (res.data.code === -1) {
          resolve(res.data)
        } else if (res.data.code === -2) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (title) {
  wx.showToast({
    title
  })
}
export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
