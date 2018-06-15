<template>
  <div class="modalContainer">
    <div class="modal">
      <p class="title">{{modal.title}}</p>
      <p class="desc">{{modal.desc}}</p>
      <div class="btns">
        <p v-if="modal.showCancel" @click="makeCancel">取消</p>
        <p @click="makeSure">确认</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["modal"],
    methods: {
      makeCancel () {
        this.$emit('cancel')
      },
      makeSure () {
        this.$emit('sure')
      }
    }
  }
</script>

<style lang="scss">
  .modalContainer {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    box-sizing: border-box;
    text-align: center;
    background: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    .modal {
      background: #fff;
      border-radius: 0.1rem;
      width: 6rem;
      .title {
        color: #333;
        font-weight: 500;
        font-size: 0.4rem;
        padding-top: 0.5rem;
      }
      .desc {
        color: #666;
        font-size: 0.33rem;
        margin: 0.3rem 0px 0.4rem;
      }
      .btns {
        display: flex;
        align-items: center;
        flex-direction: row;
        color: #44b549;
        font-weight: 400;
        justify-content: center;
        border-top: 1px solid #ebebeb;
        p {
          flex: 1;
          padding: 0.25rem 0px;
          font-size: 0.35rem;
          &:last-child {
            border-left: 1px solid #ebebeb;
          }
        }
      }
    }
  }
</style>
