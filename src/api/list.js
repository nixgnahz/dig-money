import jsonp from './jsonp'

export default function getGainList(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.candy.history",
    "t": time,
    "p": param
  }
  return jsonp(data)
}
