import $ from 'jquery'

let post_data={
  "a": "1",
  "v": 1,
  "os": "1",
  "c": "0",
  "s": "0"
}

export default function jsonp(param) {
  let data = Object.assign(param, post_data)
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://www.komaro.cn/api/v2',
      type: "GET",
      data: {
        data: data
      },
      jsonp: "callback",
      jsonpCallback: "callback",
      dataType: "jsonp",
      contentType: "application/x-www-form-urlencoded"
    }).then((data)=> {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
}
