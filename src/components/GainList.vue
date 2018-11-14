<template>
  <div class="dataList wrap">
    <div class="point_list">
      <div class="record_li" v-for="item in record_arr">
        <div class="left">
          <div>日常领取</div>
          <div class="time">{{item.created_at}}</div>
        </div>
        <div class="right">
          <div class="point">+{{item.amount}}</div>
          <div class="candy_name">{{item.candy_name}}</div>
        </div>
      </div>
    </div>
    <div class="loadMore" @click="loadMore">查看更多</div>
    <div class="empty"></div>
    <div class="bottom" @click="showDig">
      <div class="btn">返回</div>
    </div>
  </div>
</template>

<script>
  import getGainList from '@/api/list'
  export default {
    data () {
      return {
         record_arr: [],
         page: 1,
         pageSize: 5
      }
    },
    created () {
      this._getList()
    },
    methods: {
      showDig () {
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'GainListFlag',
            now: 'DigMoneyFlag'
          }
        })
      },
      loadMore () {
        if(this.page < 0) return
        this.page++
        this._getList()
      },
      _getList () {
        getGainList({
          'token': this.$store.state.userToken,
          'page': this.page,
          'pageSize': this.pageSize
        }).then((res)=> {
          if(res.code === 200) {
            this.record_arr = this.record_arr.concat(res.data)
          }
          if(res.data.length < this.pageSize) {
            this.page = -1
          }
        }).catch(()=> {})
      }
    }
  }
</script>

<style lang="scss">
  @import "../../static/dataList.scss";
  @import "../../static/gainList.scss";
</style>
