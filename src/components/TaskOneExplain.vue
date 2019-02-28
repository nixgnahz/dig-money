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
  import Toast from './baseComponent/Toast.vue'
  import Modal from './baseComponent/Modal.vue'
  export default {
    data () {
      return {
        subscribe: {},
        code: '',
        toast: '',
        modal: '',
        timer: null
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
    beforeDestroy () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    methods: {
      async _getExplain () {
        const res = await getTaskOneExplain({ 'token': this.$store.state.userToken })
        this.subscribe = res.data
      },
      async checkCode () {
        if(!this.code) return
        const res = await checkCode({
          'token': this.$store.state.userToken,
          'password': this.code
        })
        if (res.code === 200) {
          this._showModal({
            title: '任务完成',
            desc: '您获得了2个原力',
            showCancel: false
          })
        } else {
          this._showToast(res.error)
        }
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
        this.timer = setTimeout(()=> {
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
  @import "../../static/taskOneExplain.scss"
</style>
