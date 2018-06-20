<template>
  <div class="digMoney wrap">
    <audio ref="audio"></audio>
    <div class="game_ctn">
      <div class="bubble_ctn bubble_reminder" v-if="!bubbleArr.length && showBubble">
        <img class="bubble" src="http://wx.wpart.cn/uploads/k/kvqese1523955909/0/8/f/4/5ad816e799534.png"/>
        <div style="color: #7d67df">正在生长中</div>
      </div>
      <div v-if="bubbleArr.length && showBubble">
        <div :class="['bubble_ctn', item.class ? item.class : '']" v-for="(item, index) in bubbleArr" :key="item.key" :style="{top: item.top + 'px', left: item.left + 'px'}" @click="gainBubble(index)">
          <div class="ani_ctn">
            <div class="ani">
              <img class="bubble" src="http://wx.wpart.cn/uploads/k/kvqese1523955909/0/8/f/4/5ad816e799534.png" />
              <div>{{item.amount}}</div>
            </div>
          </div>
        </div>
      </div>
      <img src="http://wx.wpart.cn/uploads/k/kvqese1523955909/6/a/7/3/5ad82cd949e98.png" class="game_bg"/>
      <div class="info_ctn">
        <div class="info_li">
          <div class="info_icon power"></div>
          <div>原力值 <span class="user_power">{{userPower}}</span></div>
        </div>
      </div>
      <div class="menu_btn_ctn">
        <div class="menu_btn" @click="showAsset">
          <div class="menu_icon my_asset"></div>
          <div>我的资产</div>
        </div>
        <div class="menu_btn" @click="showTask">
          <div class="menu_icon my_power"></div>
          <div>提升算力</div>
        </div>
        <div class="menu_btn" @click="showInvite">
          <div class="menu_icon my_invite"></div>
          <div>邀请好友</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="rank_title">最新纪录</div>
      <div class="rank_list" v-for="item in gainArr">
        <div class="rank_li">
          <div class="ranking">获得</div>
          <div class="point">
            <span>{{item.amount}}</span>
          </div>
          <div class="power">{{item.time}}</div>
        </div>
      </div>
      <div class="empty no_rank_status" v-if="!gainArr.length">暂无纪录</div>
      <div class="btn2" id="showPointRecord" @click="showGain" v-if="gainArr.length">查看更多纪录</div>
    </div>
    <div style="height:1.16rem" v-if="!userToken"></div>
    <div class="bottom" v-if="!userToken" @click="showSign">
      <div class="btn">注册，查看领取金额</div>
    </div>
    <Modal :modal="modal" v-show="modal" @sure="sureModal" @cancel="cancelModal"/>
  </div>
</template>

<script>
  import Modal from './baseComponent/Modal.vue'

  import getBubbleData from '@/api/bubble'
  import saveBubble from '@/api/save'
  import {getCookie, defaultArr} from '../../static/common'

  const music = 'http://wx.wpart.cn/uploads/S/Spj7wTNMSj8kDeysSrET/3/b/f/1/5ab4a5d1ebbe8.mp3'

  export default {
    data () {
      return {
        userPower: '???',
        showBubble: false,
        bubbleIndex: 0,
        bubbleArr: [],
        gainArr: [],
        modal: ''
      }
    },
    components: {
      Modal
    },
    computed: {
      userToken () {
        return this.$store.state.userToken
      }
    },
    created () {
      this._getUserToken()
    },
    methods: {
      _getUserToken () {
        let userToken = getCookie('userTokenCookie')
        if(!userToken) {
          this._setBubblePosition(defaultArr)
          return
        }
        getBubbleData({
          'token': userToken
        }).then((res)=> {
          if(res.code === 200) {
            if(userToken != this.$store.state.userToken) {
              this.$store.commit('setUserToken', userToken)
            }
            this.userPower = res.data.power
            this._setBubblePosition(res.data.candy_list)
            let history = res.data.history
            let len = Math.min(3, history.length)
            for(let i = 0; i < len; i++) {
              history[i].time = this._parseTime(history[i].created_at)
            }
            this.gainArr = history
          } else {
            this._setBubblePosition(defaultArr)
          }
        }).catch((error)=> {
          this._setBubblePosition(defaultArr)
        })
      },
      _setBubblePosition (bubbleArr) {
        let [limit, index] = [9, 0]
        let [x1, y1, w] = [0, 40, 70]
        let [posArr, x, y, randX, randY] = [[], 0, 0, 34, 20]
        let num = bubbleArr.length > limit ? limit : bubbleArr.length
        let x2 = document.documentElement.clientWidth - 80, y2 = document.documentElement.clientHeight * 0.45
        let xNum = Math.floor((x2 - x1) / w), yNum = Math.floor((y2 - y1) / w)
        let ww = (x2 - x1) / xNum, hh = (y2 - y1) / yNum
        for (var j = 0; j < yNum; j++) {
          for (var i = 0; i < xNum; i++) {
            x = x1 + i * ww + randX * Math.random(0, 1)
            y = y1 + j * hh + randY * Math.random(0, 1)
            x = x < x1 ? x1 : x
            x = x > x2 - 70 ? x2 - 70 : x
            posArr.push({ x: x, y: y })
          }
        }
        let arr = this._getArrayItem(posArr, num)
        let len = Math.min((index + 1) * limit, bubbleArr.length)
        let candyArr = bubbleArr.slice(index * limit, len)
        len = Math.min(arr.length, candyArr.length)
        for (var i = 0; i < len; i++) {
          candyArr[i].left = arr[i].x
          candyArr[i].top = arr[i].y
          if (Number(candyArr[i].amount)) {
            candyArr[i].amount = Number(candyArr[i].amount).toFixed(2)
          }
        }
        this.bubbleArr = candyArr
        this.showBubble = true
      },
      _getArrayItem (arr, num) {
        let tempArray = new Array()
        for (let index in arr) {
          arr[index].index = Number(index)
          tempArray.push(arr[index])
        }
        let returnArray = new Array()
        for (let i = 0; i < num; i++) {
          if (tempArray.length > 0) {
            var arrIndex = Math.floor(Math.random() * tempArray.length)
            returnArray[i] = tempArray[arrIndex]
            tempArray.splice(arrIndex, 1)
          } else {
            break
          }
        }
        return returnArray
      },
      _parseTime (str) {
        let time = new Date(str.replace(/-/g, "/"))
        let now = new Date()
        let gap = parseInt((now - time) * 0.001 / 60, 10)
        let minute_arr = [365 * 24 * 60, 30 * 24 * 60, 7 * 24 * 60, 24 * 60, 60, 0]
        let str_arr = ["年前", "个月前", "周前", "天前", "小时前", "分钟前"]
        let strs = ""
        for (let i = 0; i < str_arr.length; i++) {
          if (gap >= minute_arr[i]) {
            strs = minute_arr[i] ? (parseInt(gap / minute_arr[i], 10) + str_arr[i]) : Math.max(gap, 1) + "分钟前"
            return strs
          }
        }
      },
      _showModal () {
        this.modal = {
          title: '提示',
          desc: '注册解锁该功能',
          showCancel: true
        }
      },
      gainBubble (index) {
        if(this.bubbleArr[index].class === 'gone') return
        if(this.userToken) {
          if(!this.bubbleArr[index].key) return
          this.bubbleArr[index] = Object.assign({}, this.bubbleArr[index], {class: 'gone', time: '刚刚'})
          this._playAudio()
          saveBubble({
            'token': this.userToken,
            'candy_key': this.bubbleArr[index].key
          }).then((res)=> {
            if(res.code === 200) {
              this._hideBubble(index)
            }
          }).catch(()=> {})
        } else{
          this.bubbleArr[index] = Object.assign({}, this.bubbleArr[index], {class: 'gone'})
          this._playAudio()
          this._hideBubble(index)
        }
      },
      _hideBubble (index) {
        this.gainArr.unshift(this.bubbleArr[index])
        this.gainArr.pop()
        setTimeout(()=> {
          this.bubbleArr.splice(index, 1)
        }, 300)
      },
      _playAudio () {
        this.$refs.audio.src = music
        this.$refs.audio.play()
      },
      sureModal () {
        this.modal = ''
        this.showSign()
      },
      cancelModal () {
        this.modal = ''
      },
      showSign () {
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'DigMoneyFlag',
            now: 'SignFlag'
          }
        })
      },
      showGain () {
        if(!this.userToken) {
          this._showModal()
          return
        }
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'DigMoneyFlag',
            now: 'GainListFlag'
          }
        })
      },
      showAsset () {
        if(!this.userToken) {
          this._showModal()
          return
        }
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'DigMoneyFlag',
            now: 'MoneyListFlag'
          }
        })
      },
      showTask () {
        if(!this.userToken) {
          this._showModal()
          return
        }
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'DigMoneyFlag',
            now: 'TaskListFlag'
          }
        })
      },
      showInvite () {
        if(!this.userToken) {
          this._showModal()
          return
        }
        this.$store.commit({
          type: 'changePageFlag',
          value: {
            last: 'DigMoneyFlag',
            now: 'InviteCodeFlag'
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../static/digMoney.scss'
</style>
