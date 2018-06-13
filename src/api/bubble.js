import jsonp from './jsonp'

export default function getBubbleData(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.user.index",
    "t": time,
    "p": param
  }
  return jsonp(data)
}
