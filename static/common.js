export function getCookie(name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(name + "=")
    if (c_start != -1) {
      c_start = c_start + name.length + 1
      let c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}

export function setCookie(name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export const defaultArr = [
  {
    candy_id: 1,
    amount: '???',
    candy_name: '???',
    time: '刚刚',

  },
  {
    candy_id: 2,
    amount: '???',
    candy_name: '???',
    time: '刚刚',

  },
  {
    candy_id: 3,
    amount: '???',
    candy_name: '???',
    time: '刚刚',

  },
  {
    candy_id: 4,
    amount: '???',
    candy_name: '???',
    time: '刚刚',

  },
  {
    candy_id: 5,
    amount: '???',
    candy_name: '???',
    time: '刚刚',

  }
]

export default {
  getCookie,
  setCookie,
  defaultArr
}
