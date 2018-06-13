<template>
  <div class="inviteCode bg wrap">
    <div class="close" @click="showDig">×</div>
    <div class="icon_ctn">
      <img src="http://wx.wpart.cn/uploads/k/kdpyan1521629101/b/8/2/3/5aba18a428cb9.png"/>
      <div style="opacity:0.8">未来之门正在向您开启</div>
    </div>
    <div class="invite_ctn">
      <div>您的邀请码</div>
      <input type="text" disabled class="invite_code" :value="!inviteCode ? '? ? ? ?' : inviteCode"/>
      <div ref="copy" class="btn copy" @click="copyInviteCode" :data-clipboard-text="inviteCode">点击复制邀请码</div>
      <div class="invite_rule">{{inviteRule}}</div>
    </div>
    <Toast :toast="toast" type="dark" v-show="toast"/>
  </div>
</template>

<script>
  import Toast from './Toast.vue'

  import Clipboard from 'clipboard'
  import getInviteCode from '@/api/invite'

  export default {
    data () {
      return {
        copyBtn: null,
        toast: '',
        inviteCode: 0,
        inviteRule: "总共可邀请五位好友加入天宫，每邀请1位好友注册并实名后，您将获得5个原力的额外奖励"
      }
    },
    components: {
      Toast
    },
    created () {
      getInviteCode({
        'token': this.$store.state.userToken
      }).then((res)=> {
        if(res.code === 200) {
          this.inviteCode = res.data.invite_code
          this.inviteRule = res.data.rules
        } else{
          this._showToast("邀请码获取失败")
        }
      }).catch(()=> {})
    },
    mounted() {
      this.clipboard = new Clipboard(this.$refs.copy)
    },
    methods: {
      copyInviteCode () {
        if(!this.inviteCode) {
          this._showToast("邀请码获取失败")
          return
        }
        let clipboard = this.clipboard
        clipboard.on('success', (e)=>{
          this._showToast("复制成功")
        })
        clipboard.on('error', (e)=>{
          this._showToast("复制失败")
        })
      },
      showDig () {
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'InviteCodeFlag',
            now: 'DigMoneyFlag'
          }
        })
      },
      _showToast (value) {
        this.toast = value
        setTimeout(()=> {
          this.toast = ''
        }, 1500)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../static/inviteCode.scss'
</style>
