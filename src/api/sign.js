import jsonp from './jsonp'

export function sendVerifyCode(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.system.send-sms",
    "t": time,
    "p": param
  }
  return jsonp(data)
}

export function login(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.user.login",
    "t": time,
    "p": param
  }
  return jsonp(data)
}

export function signIn(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.task.signed",
    "t": time,
    "p": param
  }
  return jsonp(data)
}

export default {
  sendVerifyCode,
  login,
  signIn
}
