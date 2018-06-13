<template>
  <div class="inputPage bg wrap">
    <div class="icon_ctn">
      <img src="http://wx.wpart.cn/uploads/l/lxnkub1478500252/7/8/f/b/5aab7ff4e0423.png_p2js"/>
      <div>为保证您的资产安全，需要填写您的身份信息</div>
    </div>
    <div class="form_ctn">
      <div class="li">
        <input bindinput="getValue" id="name" value="" type="text" placeholder="姓名"/>
      </div>
      <div class="li">
        <input bindinput="getValue" id="id" value="" type="idcard" placeholder="身份证号码"/>
      </div>
      <div class="btn" bindtap="sign" style="margin-top:0.9rem;">登陆</div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
  @import '../../static/inputPage.scss'
</style>
