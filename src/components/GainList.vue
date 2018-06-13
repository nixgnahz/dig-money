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
  @import '../../static/dataList.scss';
  .loadMore {
    text-decoration: underline;
    text-align: center;
    background-color: #fff;
    padding-top: 0.25rem;
  }
  .empty {
    height: 1.4rem;
    background-color: #fff;
  }
  .record_li {
    padding: 0.20rem;
    border: 1px solid #ebebeb;
    display: flex;
    align-items: center;
    > div {
      width: 50%;
      display: inline-block;
      vertical-align: middle;
      color: #000;
      font-size: 0.32rem;
    }
    .right {
      text-align: right;
      > div {
        display: inline-block;
      }
    }
    .time {
      font-size: 0.26rem;
      color: #999;
      margin-top: 0.10rem;
    }
    .point {
      margin-right: 0.06rem;
      color: #7d67df;
      font-weight: 500;
      font-size: 0.34rem;
    }
    .candy_name {
      font-size: 0.26rem;
      color: #666;
    }
  }
</style>
