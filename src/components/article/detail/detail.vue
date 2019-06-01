<template>
  <div>
    <h2>{{articleId}}--{{articleTitle}}</h2>
    <div class="desc">
      <p>{{desc}}</p>
      <p class="time">{{time}}</p>
    </div>
    <div class="detail">
      <hr/>
      <div class="wide">
        <div class="aside">
          <div class="sign">
            <li><i class="iconfont" @mouseover="goUp">&#xe658;</i></li>
            <li><i class="iconfont"  v-if="btnFlag" src="图片url" @click="backTop">&#xe609;</i></li>
            <li><i class="iconfont" @mouseover="goDown">&#xe659;</i></li>
            <li><i class="iconfont">&#xe69c;</i></li>
            <li><i class="iconfont">&#xe63e;</i></li>
          </div>
        </div>
        <div class="content" id="content">
          {{content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    data () {
      return {
        articleId: '',
        btnFlag: false,
        // scrollTop: '',
        pos: '',
        articleTitle: '追风筝的人',
        desc: 'Dyhunjc view',
        time: '2019.5.23',
        content: '小说以第一人称的角度讲述了阿米尔的故事。阿米尔生于1963年喀布尔的一个富人社区中的一个富裕家庭。其父亲“爸爸”是普什图人，一名法官的儿子，成功的地毯商人。阿米尔家的仆人阿里的儿子哈桑则出身哈扎拉人。阿米尔和哈桑是好玩伴，哈桑是一个特别忠实，正直，一心只为阿米尔少爷着想的人，两个人经常一起玩耍、游戏。阿米尔是出色的“风筝斗士”，即善于用自己的风筝切断别人的风筝的线；哈桑也是杰出的“风筝追逐者”，因为阿富汗斯坦的传统是线被切断而落下的风筝归追到它的人所有。爸爸对两个孩子都很喜爱，但嫌阿米尔过于怯懦。两个孩子和人打架时总是哈桑出头。阿米尔展露出写作的才华，但爸爸并不看重。爸爸的朋友拉辛汗成了阿米尔的忘年知己。1973年穆罕默德·达乌德·汗等发动政变，在阿富汗斯坦推翻帝制建立共和国。\n' +
          '社区中一个仰慕纳粹的普什图族孩子阿塞夫和阿米尔、哈桑发生冲突。哈桑用弹弓维护了阿米尔。1975年，在一次风筝比赛中，阿米尔为了赢得爸爸的好感而勇夺冠军，哈桑则保证去追到第二名的风筝以证明阿米尔的战绩。但在哈桑的归途被阿塞夫等人截住。阿塞夫要哈桑把风筝给他，但哈桑不肯，于是他强暴了哈桑。这一切被阿米尔看到，但由于怯懦阿米尔没有挺身而出。\n' +
          '之后的日子里阿米尔由于无法面对哈桑而希望爸爸把阿里、哈桑解雇，被严词拒绝。于是阿米尔在13岁生日的晚上陷害哈桑，说他偷了自己的生日礼物。哈桑洞悉一切，而承认了偷窃。阿里和哈桑不顾爸爸的反对搬到了哈扎拉族聚居的哈扎拉贾特山区。\n' +
          '1979年苏联入侵阿富汗斯坦，1981年爸爸带着阿米尔逃往到巴基斯坦白沙瓦，把家留给拉辛汗照看。后来阿米尔父子又迁到美国旧金山湾区的费利蒙居住。阿米尔在美国上大学，毕业之后成了作家，还在圣何塞的跳蚤市场认识了同样来自阿富汗的一个将军塔赫里的女儿索拉雅，并和她结婚。爸爸在此期间因肺癌去世。阿米尔和索拉雅搬到了旧金山。他们想有一个孩子，但始终没能如愿。\n' +
          '2001年，罹患绝症的拉辛汗从巴基斯坦给阿米尔打电话，让他去巴基斯坦，因为“那儿有再次成为好人的路”。原来拉辛汗在阿米尔父子走后, 去哈扎拉贾特找到了哈桑及其妻子，他们一起回到喀布尔管理阿米尔家的大房子，哈桑还有了一个儿子索拉博。然而1996年塔利班占领喀布尔之后，强占了这个房子，还因为种族歧视当街枪毙了哈桑及其妻子。索拉博进了孤儿院。拉辛汗希望阿米尔回去喀布尔救索拉博，但阿米尔不愿意。拉辛汗于是告诉阿米尔，哈桑其实是阿米尔爸爸的私生子。\n' +
          '追风筝的人\n' +
          '追风筝的人(4张)\n' +
          '阿米尔在出租车司机法里德的帮助下回到塔利班控制的喀布尔。在找到了索拉博所在的孤儿院之后，发现索拉博已经被一个塔利班头目带走，而这个头目会出现足球赛上。阿米尔在球赛中约了这个头目，并在之后其住所见到了他。原来这个塔利班头目就是阿塞夫。阿塞夫在被苏联人扶植的共产党政权的监狱中受尽折磨之后加入塔利班，和苏军作战，成了一个头目。索拉博已经成了一个被性侵犯的舞童。阿塞夫告诉阿米尔可以带走索拉博，但必须和他先处理一些陈年烂账。在屏蔽左右之后，阿塞夫戴上不锈钢拳套，轻松毒打毫无搏击经验的阿米尔，但不料索拉博用形影不离的弹弓打瞎了其左眼。阿米尔和索拉博这才趁机逃出。\n' +
          '在巴基斯坦首都伊斯兰堡，因为阿米尔无法证明索拉博是孤儿，而无法取得美国签证，从而收养索拉博。索拉博需要暂时入住孤儿院。出于对孤儿院的惧怕，索拉博割腕自杀，之后被救起。在阿米尔带着索拉博回到美国之后，索拉博因为感情受到伤害不再和任何人交流。在2001年九一一事件之后的一个周末，在一个公园里，索拉博终于因为追风筝对阿米尔微笑。'
      }
    },

    mounted () {
      this.getDetail()
      console.log(this.articleId)
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      getDetail () {
        let itemId = this.$router.history.current.query.itemId
        this.articleId = itemId
      },
      // 点击图片回到顶部方法，加计时器是为了过渡顺滑
      backTop () {
        let that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      },

      // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
      scrollToTop () {
        let that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 60) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },
      goUp () {
        document.documentElement.scrollTop -= 50
      },
      goDown () {
        document.documentElement.scrollTop += 50
      }
    }
  }
</script>

<style scoped>
  h2 {
    margin-top: 3rem;
    text-align: center;
  }
  .desc {
    width: 10rem;
    position: relative;
    left: 70%;
    font-size: 1rem;
    color: #666;
  }
  .desc > p {
    margin: 0;
    float: right;
  }
  .detail {
    clear: both;
    position: relative;
    top: 1rem;
    color: #A6A8A9;
  }
  hr {
    text-align: center;
    width: 90%;
  }
  .wide {
    margin: 1rem auto;
    width: 80%;
  }
  .aside {
    float: left;
    width: 10%;
    height: 30rem;
  }

  .sign {
    width: 6%;
    border: 1px solid #eee;
    box-shadow: 0 0 1rem #eee;
    position: fixed;
    padding-bottom: 1rem;

  }
  .sign > li{
    list-style: none;
    display: inline-block;
    width: 100%;
    height: 4rem;
    background: #fff;
    margin-top: 10px;
    text-align: center;
    line-height: 4rem;
  }
  .content {
    padding: 3rem;
    width: 80%;
    margin-left: 12%;
    /*height: 50rem;*/
    border: 1px solid #eee;
    box-shadow: 0 0 1rem #eee;
    color: #666;
    font-size: 16px;
    letter-spacing: 4px;
    line-height: 2rem;
  }
</style>
