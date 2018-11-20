<template>
  <div class="inputPage bg wrap">
    <div class="icon_ctn">
      <img src="http://wx.11babay.cn/uploads/k/kdpyan1521629101/b/8/2/3/5aba18a428cb9.png"/>
      <div style="opacity:0.8">未来之门正在向您开启</div>
    </div>
    <div class="form_ctn">
      <div class="li">
        <div class="left">+86</div>
        <input v-model.trim="telephone" type="number" placeholder="手机号码"/>
      </div>
      <div class="li">
        <input v-model.trim="verifyCode" type="number" placeholder="请输入验证码"/>
        <div class="right" @click="getVerifyCode">{{codeText}}</div>
      </div>
      <div class="li">
        <input v-model.trim="inviteCode" type="text" placeholder="请输入邀请码，选填"/>
      </div>
      <div class="agreement">
        <div class="checkbox bg"></div>
        <div>我已阅读并同意《用户服务协议》</div>
      </div>
      <div class="btn" @click="sign">开启天宫之旅</div>
    </div>
    <Modal v-show="modal" :modal="modal" @sure="sureModal"/>
    <Toast :toast="toast" v-show="toast"/>
  </div>
</template>

<script>
  import Identification from './Identification.vue'
  import Toast from './baseComponent/Toast.vue'
  import Modal from './baseComponent/Modal.vue'
  import {sendVerifyCode, login} from '@/api/sign'
  import {signIn} from '@/api/sign'
  import {setCookie} from '../../static/common'
  export default {
    data () {
      return {
        codeText: '获取验证码',
        toast: '',
        modal: '',
        telephone: '',
        verifyCode: '',
        inviteCode: '',
        timer: null,
        timer_: null
      }
    },
    components: {
      Toast,
      Modal
    },
    beforeDestroy () {
      clearInterval(this.timer)
      clearTimeout(this.timer_)
    },
    methods: {
      getVerifyCode () {
        if(this.codeText != '获取验证码') return
        if(!this._checkInput()) return
        this._sendVerifyCode()
      },
      sign () {
        if(!this._checkInput()) return
        if(!this.verifyCode) {
          this._showToast('请输入验证码')
          return
        }
        login({
          'phone': this.telephone,
          'sms_code': this.verifyCode,
          'invite_code': this.inviteCode
        })
        .then((res)=> {
          if(res.code === 200 && res.data.token) {
            this._setUserToken(res.data.token)
            this._signIn(res.data.token)
          } else {
            this._showToast(res.error)
          }
        })
        .catch((error)=> {
          this._showToast('登录失败')
        })
      },
      sureModal () {
        this.modal = ''
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'SignFlag',
            now: 'DigMoneyFlag'
          }
        })
      },
      _signIn (userToken) {
        signIn({
          'token': userToken
        }).then((res)=> {
          if(res.code === 200) {
            this._showModal({
              title: '签到任务完成',
              desc: '您获得了2个原力',
              showCancel: false
            })
          } else{
            this.$store.commit({
              type: 'changePageFlag',
              value: {
                last: 'SignFlag',
                now: 'DigMoneyFlag'
              }
            })
          }
        }).catch(()=> {})
      },
      _setUserToken (userToken) {
        setCookie('userTokenCookie', userToken, 365)
        this.$store.commit('setUserToken', userToken)
      },
      _checkInput () {
        if(!this.telephone) {
          this._showToast('请输入手机号')
          return false
        }
        let reg = /^[1][0-9]{10}$/
        if(!reg.test(this.telephone)) {
          this._showToast('请输入正确的手机号')
          return false
        }
        return true
      },
      _sendVerifyCode () {
        sendVerifyCode({
          'phone': this.telephone
        })
        .then((res)=> {
          if(res.code === 200) {
            this._showToast('验证码发送成功')
            this._countdown()
          } else {
            this._showToast(res.error)
          }
        })
        .catch((error)=> {
          this._showToast('验证码发送失败')
        })
      },
      _countdown () {
        let time = 60
        this.codeText = `${time} 秒后重新获取`
        this.timer = setInterval(()=> {
          if(time <= 1) {
            this.codeText = '获取验证码'
            clearInterval(this.timer)
            return
          }
          time--
          this.codeText = `${time} 秒后重新获取`
        }, 1000)
      },
      _showToast (value) {
        this.toast = value
        this.timer_ = setTimeout(()=> {
          this.toast = ''
        }, 1500)
      },
      _showModal (modal) {
        this.modal = modal
      }
    }
  }
</script>

<style lang="scss">
  @import "../../static/inputPage.scss"
</style>
