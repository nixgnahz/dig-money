import jsonp from './jsonp'

export function getTask(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.task.status",
    "t": time,
    "p": param
  }
  return jsonp(data)
}

export function getTaskOneExplain(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.task.official",
    "t": time,
    "p": param
  }
  return jsonp(data)
}

export function checkCode(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.task.password-validate",
    "t": time,
    "p": param
  }
  return jsonp(data)
}

export default {
  getTask,
  getTaskOneExplain,
  checkCode
}
