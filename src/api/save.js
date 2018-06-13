import jsonp from './jsonp'

export default function saveBubble(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.candy.capture",
    "t": time,
    "p": param
  }
  return jsonp(data)
}
