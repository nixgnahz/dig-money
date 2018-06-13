<template>
  <div class="explain wrap">
    <div class="header">
      <div class="close" @click="hide">×</div>
      <div class="subscribe_title">
          <div>按照如下步骤完成关注微信公众号</div>
          <div>即可领取<span class="strong">2</span>个原力</div>
      </div>
      <div class="subscribe_content">
          <div>1.在微信公众号中搜索“<span>{{subscribe.name}}</span>”并关注</div>
          <div>2.在网易星球公众号中输入“<span>{{subscribe.password}}</span>”获得验证码</div>
          <div>3.在下方输入验证码，验证成功后即可领取原力</div>
      </div>
      <div class="subscribe_footer">
          说明：每个帐号仅有一次领取机会
      </div>
    </div>
    <div class="form_ctn">
      <div>请输入验证码</div>
      <input class="subscribe_code" type="text" v-model.trim="code"/>
      <div :class="['btn', btnStatus]" @click="checkCode">确定</div>
    </div>
    <Modal v-show="modal" :modal="modal" @sure="sureModal"/>
    <Toast :toast="toast" v-show="toast"/>
  </div>
</template>

<script>
  import {getTaskOneExplain, checkCode} from '@/api/task'
  import Toast from './Toast.vue'
  import Modal from './Modal.vue'

  export default {
    data () {
      return {
        subscribe: {},
        code: '',
        toast: '',
        modal: ''
      }
    },
    components: {
      Toast,
      Modal
    },
    computed: {
      btnStatus () {
        return this.code ? '' : 'disabled'
      }
    },
    created () {
      this._getExplain()
    },
    methods: {
      _getExplain () {
        getTaskOneExplain({
          'token': this.$store.state.userToken
        }).then((res)=> {
          this.subscribe = res.data
        }).catch(()=> {})
      },
      checkCode () {
        if(!this.code) return
        checkCode({
          'token': this.$store.state.userToken,
          'password': this.code
        }).then((res)=> {
          if(res.code === 200) {
            this._showModal({
              title: '任务完成',
              desc: '您获得了2个原力',
              showCancel: false
            })
          } else{
            this._showToast(res.error)
          }
        }).catch(()=> {})
      },
      hide () {
        this.$emit('hideExplain')
      },
      sureModal () {
        this.modal = ''
        this.hide()
      },
      _showToast (value) {
        this.toast = value
        setTimeout(()=> {
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
  .explain {
    line-height: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: #fff;
    .header {
      background: linear-gradient(to right, #6a57f7, #b444ef);
      padding: 0.60rem 0.30rem 0;
      font-size: 0.26rem;
      font-weight: 300;
      .subscribe_title {
        font-size: 0.34rem;
        text-align: center;
        div {
          margin-bottom: 0.40rem;
        }
      }
      .subscribe_content {
        div {
          margin-bottom: 0.35rem;
        }
      }
      .subscribe_footer {
        padding: 0.26rem 0;
        border-top: 2px dashed;
        opacity: 0.7;
      }
    }
    .form_ctn {
      color: #000;
      width: 6.56rem;
      text-align: center;
      margin: 0.66rem auto 0px;
      .subscribe_code {
        margin-top: 0.70rem;
        width: 100%;
        border-bottom: 1px solid #ccc;
        border-radius: 0;
        margin-bottom: 1.00rem;
        color: #333;
      }
      .btn {
        color: #fff;
        &.disabled {
          background: #ccc;
        }
      }
    }
    .close {
      font-size: 0.60rem;
      color: #fff;
      position: absolute;
      top: 0.20rem;
      right: 0.20rem;
      padding: 0.20rem;
      color: #fff;
    }
  }
</style>
