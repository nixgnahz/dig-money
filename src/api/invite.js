import jsonp from './jsonp'

export default function getInviteCode(param) {
  const time = Date.parse(new Date())
  const data = {
    "m": "blockchain.user.invite-code",
    "t": time,
    "p": param
  }
  return jsonp(data)
}
