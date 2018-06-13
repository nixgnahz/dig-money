<template>
  <div id="app">
    <DigMoney v-if="DigMoneyFlag"/>
    <GainList v-if="GainListFlag"/>
    <InviteCode v-if="InviteCodeFlag"/>
    <MoneyList v-if="MoneyListFlag"/>
    <Sign v-if="SignFlag"/>
    <TaskList v-if="TaskListFlag"/>
  </div>
</template>

<script>
import DigMoney from './components/DigMoney.vue'
import GainList from './components/GainList.vue'
import InviteCode from './components/InviteCode.vue'
import MoneyList from './components/MoneyList.vue'
import Sign from './components/sign.vue'
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  computed: {
    DigMoneyFlag () {
      return this.$store.state.page.DigMoneyFlag
    },
    GainListFlag () {
      return this.$store.state.page.GainListFlag
    },
    InviteCodeFlag () {
      return this.$store.state.page.InviteCodeFlag
    },
    MoneyListFlag () {
      return this.$store.state.page.MoneyListFlag
    },
    SignFlag () {
      return this.$store.state.page.SignFlag
    },
    TaskListFlag () {
      return this.$store.state.page.TaskListFlag
    }
  },
  components: {
    DigMoney,
    GainList,
    InviteCode,
    MoneyList,
    Sign,
    TaskList
  }
}
</script>

<style lang="scss">
  .icon_ctn {
    text-align: center;
    font-size: 0.28rem;
    padding-top: 0.80rem;
    margin-bottom: 1.10rem;
    img {
      width: 1.45rem;
      height: 0.86rem;
      margin-bottom: 0.32rem;
    }
  }

  .wrap {
    color: #fff;
    font-size: 0.30rem;
    font-weight: 300;
  }

  .bg {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .btn {
    padding: 0.22rem 0;
    text-align: center;
    border-radius: 0.10rem;
    background: linear-gradient(to right, #6a57f7, #b444ef);
  }

  input {
    height: 0.62rem;
    display: inline-block;
    width: 4.00rem;
    -webkit-appearance: none;
    outline: none;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 0.3rem;
  }
</style>
