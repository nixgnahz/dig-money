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
  @import "../../static/gainSuccess.scss"
</style>
