<template>
  <div class="success wrap">
    <div class="header2">
      <div class="close" @click="hide">×</div>
      <div class="done_icon"></div>
      <div>任务完成</div>
      <div>您已成功领取过奖励</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      hide () {
        this.$emit('hideSuccess')
      }
    }
  }
</script>

<style lang="scss">
  .success {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .header2 {
      padding: 0.90rem 0 0;
      color: #000;
      height: 4.10rem;
      background: #f8f8f8;
      box-sizing: border-box;
      text-align: center;
      position: absolute;
      width: 100%;
      height: 100%;
      div {
        margin-bottom: 0.30rem;
      }
      .close {
        font-size: 0.60rem;
        color: #fff;
        position: absolute;
        top: 0.20rem;
        right: 0.20rem;
        padding: 0.20rem;
        color: #000;
      }
    }
    .done_icon {
      background: url(http://wx.wpart.cn/uploads/e/exhzhh1526289964/3/0/5/6/5afa8785d9731.png_p2js) no-repeat;
      background-size: auto 100%;
      border-radius: 50%;
      width: 1.10rem;
      height: 1.10rem;
      margin: 0 auto 0.48rem;
    }
  }
</style>
