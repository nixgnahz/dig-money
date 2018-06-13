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
  </div>
</template>

<script>
  import TaskOneExplain from './TaskOneExplain'
  import GainSuccess from './GainSuccess.vue'
  import {getTask} from '@/api/task'

  export default {
    data () {
      return {
        power_arr: {},
        showExplainFlag: false,
        showSuccessFlag: false
      }
    },
    components: {
      TaskOneExplain,
      GainSuccess
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
          this._showModal({
            title: '任务提示',
            desc: '每日签到即可获得',
            showCancel: false
          })
          return
        }
        this.showExplainFlag = true
      },
      hideExplain () {
        this.showExplainFlag = false
      },
      hideSuccess () {
        this.showSuccessFlag = false
      }
    }
  }
</script>

<style lang="scss">
.task {
  color: #000;
  background: #f8f8f8;
  .power_header {
    position: relative;
    margin-bottom: 0.20rem;
    .close {
      font-size: 0.60rem;
      top: 0;
      right: 0;
      padding: 0.10rem;
    }
    div {
      color: #fff;
      position: absolute;
      text-align: center;
    }
    img {
      width: 100%;
      height: 2.40rem;
    }
    .power_header_title {
      width: 100%;
      left: 0;
      top: 0.70rem;
      font-size: 0.40rem;
    }
    .power_header_desc {
      top: 1.40rem;
      font-size: 0.24rem;
      padding: 0.06rem 0;
      width: 60%;
      left: 20%;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.36rem;
    }
  }
  .power_title {
    font-size: 0.30rem;
    padding: 0.30rem;
    background: #fff;
  }
  .box_ctn {
    text-align: center;
    overflow: hidden;
    background: #fff;
    border-top: 1px solid #eee;
    .box {
      padding: 0.28rem 0.1rem;
      width: 33.3%;
      box-sizing: border-box;
      border-right: 1px solid #eee;
      float: left;
      border-bottom: 1px solid #eee;
      height: 3rem;
      .box_icon {
        height: 0.52rem;
        width: 0.54rem;
        margin: 0 auto;
        background: url(http://wx.wpart.cn/uploads/e/exhzhh1526289964/3/8/d/e/5afa4a6109a84.png) no-repeat;
        background-size: auto 100%;
        margin-bottom: 0.20rem;
        &.invite {
          background-position: 0 center;
        }
        &.subscribe {
          background-position: 49% center;
        }
        &.user_signed {
          background-position: 100% center;
        }
      }
      .box_title {
        font-size: 0.26rem;
        font-weight: 400;
        margin-bottom: 0.20rem;
      }
      .box_desc {
        font-size: 0.22rem;
        color: #6c6c6c;
        margin-bottom: 0.20rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .box_done {
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          &.done_icon {
            background: url(http://wx.wpart.cn/uploads/e/exhzhh1526289964/3/0/5/6/5afa8785d9731.png_p2js) no-repeat;
            background-size: auto 100%;
            border-radius: 50%;
            width: 0.3rem;
             height: 0.3rem;
            margin-right: 0.05rem;
          }
          &:last-child {
            font-size: 0.3rem;
            transform: scale(0.9);
          }
        }
      }
      .btn {
        color: #fff;
        padding: 0.06rem 0;
        font-size: 0.22rem;
        font-weight: 400;
        width: 1.70rem;
        margin: 0 auto;
        border-radius: 0.4rem;
      }
      &:nth-child(3n) {
        border-right: none;
      }
    }
  }
}
</style>
