<template>
  <div>
    <!--    <header-box></header-box>-->
    <div class="container">
      <div class="banner">
        <img src="../../../assets/banner.jpg">
        <p>{{title}}</p>
      </div>
      <div class="search">
        <input type="text"/>
        <button type="button">search</button>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in tabs" :key="index" :class="{active:index == num}" @click="tab(index)">{{item}}</li>
        </ul>
        <div class="tabCon">
          <div v-for='(itemCon,index) in tabContents' v-show=" index == num" :key="index">
            <li v-for="title in itemCon.subtitle" :key="title.id" @click="goDetail(title.id)">
              <div class="img">
                <img src="../../../assets/banner.jpg"/>
              </div>
              <div class="desc">
                <h4 class="subTitle">{{title.heading}}</h4>
                <p class="time">{{title.time}}</p>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
    <!--    <footer-box></footer-box>-->
  </div>
</template>

<script>
  export default {
    name: 'list',
    data () {
      return {
        title: '新闻资讯',
        tabs: ['标题一', '标题二', '标题三'],
        tabContents: [{
          subtitle: [{
            'id': 1,
            'heading': '1追风筝的人追风筝的人追风筝的人追风筝的人追风筝的人',
            'time': '2019-5-1'
          }, {
            'id': 2,
            'heading': '2追风筝的人追风筝的人追风筝的人追风筝的人追风筝的人',
            'time': '2019-5-1'
          }, {
            'id': 3,
            'heading': '3追风筝的人追风筝的人追风筝的人追风筝的人追风筝的人',
            'time': '2019-5-1'
          }, {
            'id': 4,
            'heading': '4追风筝的人追风筝的人追风筝的人追风筝的人追风筝的人',
            'time': '2019-5-1'
          }, {
            'id': 5,
            'heading': '5追风筝的人追风筝的人追风筝的人追风筝的人追风筝的人',
            'time': '2019-5-1'
          }]
        }, {
          subtitle: [{
            'id': 6,
            'heading': '6复活复活复活复活复活复活复活复活复活复活复活复活复活',
            'time': '2019-5-1'
          }, {
            'id': 7,
            'heading': '7复活复活复活复活复活复活复活复活复活复活复活复活复活',
            'time': '2019-5-1'
          }, {
            'id': 8,
            'heading': '8复活复活复活复活复活复活复活复活复活复活复活复活复活',
            'time': '2019-5-1'
          }]
        }, {
          subtitle: [{
            'id': 9,
            'heading': '9结网结网结网结网结网结网结网结网结网结网结网结网结网',
            'time': '2019-5-1'
          }, {
            'id': 10,
            'heading': '10结网结网结网结网结网结网结网结网结网结网结网结网结网',
            'time': '2019-5-1'
          }, {
            'id': 11,
            'heading': '11结网结网结网结网结网结网结网结网结网结网结网结网结网',
            'time': '2019-5-1'
          }]
        }
        ],
        num: 0
      }
    },
    methods: {
      tab (index) {
        this.num = index
      },
      goDetail (itemId) {
        this.$router.push({
          path: '/detail',
          query: { itemId: itemId }
        })
      }
    }
  }
</script>

<style scoped>
  .list> ul {
    margin-left: 5%;
  }
  .img {
    float: left;
    width: 5rem;
    height: 5rem;
    background: #000;
  }
  .img > img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .desc {
    margin-left: 8rem;
  }
  .time {
    margin-top: 2rem;
  }
  .banner {
    height: 25rem;
  }
  .banner > img {
    display: block;
    width: 100%;
    height: 23rem;
    overflow: hidden;
  }
  .banner > p {
    margin: -12.5rem auto;
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: 2rem;
    letter-spacing: .3rem;
  }

  .search {
    /*display: block;*/
    width: 60%;
    margin-left: 20%;
    display: flex;
    justify-content: space-between;
  }
  .search > input {
    padding: .7rem;
    width: 68%;
    border-radius: 10px;
    background: #e5e5e5;
    border: 1px #bfbfbf solid;
  }
  button {
    padding: .8rem;
    color: #fff;
    background: #F96E3E;
    width: 10%;
    margin-left: 2%;
    border-radius: 20px;
    border: none;
  }
  .list {
    width: 77rem;
    height: 40rem;
    margin: 2rem auto;
    border-top: 0;
    border-bottom: 1px solid #f5f5f5;
    border-left: 1px solid #f5f5f5;
    border-right: 1px solid #f5f5f5;
    box-shadow: 0 5px 1rem 5px #f5f5f5;
  }
  .list > ul {
    list-style: none;
    float: left;
    width: 10rem;
    height: 30rem;
  }
  .list > ul > li {
    height: 3rem;
    line-height: 3rem;
    background: #f2f2f2;
    text-align: center;
    margin-top: 10px;
  }
  .tabCon {
    float: left;
    margin: 2rem 3rem 2rem 4rem;
    width: 55rem;
    /*height: 30rem;*/
  }
  .tabCon > div > li {
    list-style: none;
    height: 6rem;
    color: #666;
  }
  .tabCon > div > li:hover {
    color: #F96E3E;
  }
  .active {
    color: #F96E3E;
  }
</style>
