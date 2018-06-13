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
  .inviteCode {
    background-image: url(http://wx.wpart.cn/uploads/k/kvqese1523955909/9/c/3/b/5ad82bf26dafc.png);
    color: #7d67df;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .close {
      font-size: 0.60rem;
      color: #fff;
      position: absolute;
      top: 0.20rem;
      right: 0.20rem;
      padding: 0.20rem;
    }
    .icon_ctn {
      text-align: center;
      font-size: 0.28rem;
      padding-top: 1.3rem;
      margin-bottom: 0.70rem;
      color: #fff;
    }
    .invite_ctn {
      width: 6.30rem;
      margin: 0.40rem auto;
      background: #fff;
      padding: 0.70rem 0.40rem;
      box-sizing: border-box;
      text-align: center;
      .invite_code {
        font-size: 0.86rem;
        font-weight: bold;
        line-height: 1.40rem;
        height: 1.40rem;
        min-height: 1.40rem;
        text-align: center;
        color: #7d67df;
      }
      .btn {
        width: 6.30rem;
        margin: 0.40rem auto;
        color: #fff;
        &.copy {
          min-width: 3em;
          width: auto;
          padding: 0.14rem 0.40rem;
          color: #fff;
          margin: 0 auto 0.40rem;
          display: inline-block;
        }
      }
      .invite_rule {
        text-align: left;
        color: #666;
        padding-top: 0.40rem;
        span {
          color: #7d67df;
        }
      }
    }
  }
</style>
