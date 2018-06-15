<template>
  <div class="task wrap">
    <div class="power_header">
      <div class="close" @click="showDig">×</div>
      <img src="http://wx.wpart.cn/uploads/e/exhzhh1526289964/5/b/9/1/5afa541997c61.png_p2js"/>
      <div class="power_header_title">赶紧收取原力，可以加速挖币</div>
      <div class="power_header_desc">原力越多，获取的币越多</div>
    </div>
    <div class="power_title">基础任务</div>
    <div class="box_ctn">
      <div class="box" v-for="(item, key) in power_arr" @click="showExplain(key)">
        <div :class="['box_icon', key]"></div>
        <div class="box_title">{{item.title}}</div>
        <div class="box_desc">{{item.desc}}</div>
        <div class="box_done" v-if="item.status === 1">
          <div class="done_icon"></div>
          <div>已完成</div>
        </div>
        <div class="btn" v-else>+{{item.points}}原力</div>
      </div>
    </div>
    <TaskOneExplain v-if="showExplainFlag" @hideExplain="hideExplain"/>
    <GainSuccess v-if="showSuccessFlag" @hideSuccess="hideSuccess"/>
    <Modal v-show="modal" :modal="modal" @sure="sureModal"/>
  </div>
</template>

<script>
  import TaskOneExplain from './TaskOneExplain'
  import GainSuccess from './GainSuccess.vue'
  import Modal from './baseComponent/Modal.vue'
  import {getTask} from '@/api/task'
  import {signIn} from '@/api/sign'

  export default {
    data () {
      return {
        power_arr: {},
        modal: '',
        showExplainFlag: false,
        showSuccessFlag: false
      }
    },
    components: {
      TaskOneExplain,
      GainSuccess,
      Modal
    },
    created () {
      this._getTask()
    },
    methods: {
      _getTask () {
        getTask({
          'token': this.$store.state.userToken
        }).then((res)=> {
          this.power_arr = res.data
        }).catch(()=> {})
      },
      _signIn () {
        signIn({
          'token': this.$store.state.userToken
        }).then((res)=> {
          if(res.code === 200) {
            this._showModal({
              title: '任务完成',
              desc: '您获得了2个原力',
              showCancel: false
            })
          } else{
            this._showModal({
              title: '任务失败',
              desc: res.error,
              showCancel: false
            })
          }
        }).catch(()=> {})
      },
      showDig () {
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'TaskListFlag',
            now: 'DigMoneyFlag'
          }
        })
      },
      showExplain (key) {
        if(this.power_arr[key].status) {
          this.showSuccessFlag = true
          return
        }
        if(key === 'invite') {
          this.$store.commit({
            type: 'changePageFlag',
            value: {
              last: 'TaskListFlag',
              now: 'InviteCodeFlag'
            }
          })
          return
        }
        if(key === 'user_signed') {
          this._signIn()
          return
        }
        this.showExplainFlag = true
      },
      hideExplain () {
        this.showExplainFlag = false
      },
      hideSuccess () {
        this.showSuccessFlag = false
      },
      sureModal () {
        this.modal = ''
      },
      _showModal (modal) {
        this.modal = modal
      }
    }
  }
</script>

<style lang="scss">
  @import '../../static/taskList.scss'
</style>
