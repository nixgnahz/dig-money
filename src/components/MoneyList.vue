<template>
  <div class="dataList wrap">
    <div class="point_list">
      <div class="point_li" :class="{selected: item.selected}" v-for="(item, index) in assetArr" @click="showDesc(index)">
        <div class="point_icon bg"></div>
        <div>{{item.name}}</div>
        <div class="point">{{item.amount}}</div>
        <div class="desc">{{item.description}}</div>
      </div>
    </div>
    <div class="bottom" @click="showDig">
      <div class="btn">返回</div>
    </div>
  </div>
</template>

<script>
  import getAsset from '@/api/asset'
  export default {
    data () {
      return {
        assetArr: []
      }
    },
    created () {
      this._getAssetData()
    },
    methods: {
      _getAssetData () {
        getAsset({
          'token': this.$store.state.userToken
        }).then((res)=> {
          if(res.code === 200) {
            this.assetArr = res.data
          }
        }).catch(()=> {})
      },
      showDig () {
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'MoneyListFlag',
            now: 'DigMoneyFlag'
          }
        })
      },
      showDesc (index) {
        this.$set(this.assetArr[index], 'selected', !this.assetArr[index].selected)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../static/dataList.scss"
</style>
