let url = 'https://www.wumeili.top'

// GET
function get(path, data, cb){
  wx.request({
    url: url+path,
    method:'GET',
    data:data,
    success:res => {
      return cb(res)
    }
  })
}

// POST
function post(path, data, cb){
  wx.request({
    url: url+path,
    method: 'POST',
    data:data,
    header: {
      "Content-Type": "application/json;charset=UTF-8",
      "cache-control": "no-cache"
    },
    success: res => {
      return cb(res)
    }
  })
}

module.exports={
  httpGet: get,
  httpPost: post
}