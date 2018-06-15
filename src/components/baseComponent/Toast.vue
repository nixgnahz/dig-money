<template>
  <div class="toastContainer">
    <div :class="['toast', type]">{{toast}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      toast: {
        required: true
      },
      type: {
        default: 'light'
      }
    }
  }
</script>

<style lang="scss">
  .toastContainer {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding-top: 50%;
    box-sizing: border-box;
    text-align: center;
    background: transparent;
    .toast {
      max-width: 60%;
      min-width: 1.20rem;
      margin: 0 auto;
      height: 0.8rem;
      line-height: 0.8rem;
      padding: 0px 0.4rem;
      border-radius: 0.10rem;
      display: inline-block;
      &.dark {
        background-color: rgba(0,0,0,0.7);
        color: #fff;
      }
      &.light {
        background-color: #fff;
        color: #000;
      }
    }
  }
</style>
