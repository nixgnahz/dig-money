import jsonp from './jsonp'

export default function getAsset(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.user.my-candy",
    "t": time,
    "p": param
  }
  return jsonp(data)
}
