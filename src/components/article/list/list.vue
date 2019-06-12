<template>
  <div>
    <!--    <header-box></header-box>-->
<!--      图片banner-->
      <div class="banner"><img src="https://dymonelewis.github.io/images/inaword.jpg" style="height:150px;"/><p class="title">{{title}}</p></div>
<!--      搜索-->
      <div class="search"><span class="alignSearch"><input type="text" v-model="searchArticle"/><button type="button">search</button></span></div>
<!--      文章列表-->
      <div class="articleList" v-for="item in list" :key="item.id" @click="goDetail(item.id)">
        <div class="img"><img :src='item.img'/></div>
        <div class="mask"></div>
        <div class="desc">
          <h1 class="titleList">{{item.title}}</h1>
          <h4 class="subtitle">{{item.subtitle}}</h4>
          <p class="time">{{item.time}}</p>
        </div>
      </div>
    <!--      分页-->
      <div class="page">
        <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
      </div>
    <!--    <footer-box></footer-box>-->
  </div>
</template>

<script>
import paging from '../../paging/paging'
import axios from 'axios'
export default {
  name: 'List',
  components: {
    paging
  },
  data () {
    return {
      imgUrl: '',
      list: [], // 最终循环的数组
      title: '高校阵营',
      listData: [], // 对数据分类
      allSize: 0,
      perSize: 4,
      searchArticle: ''
    }
  },
  watch: {
    searchArticle: function () {
      if (this.searchArticle === '') {
        this.getData()
      }
    }
  },
  methods: {
    goDetail (itemId) {
      this.$router.push({
        path: '/detail',
        query: { itemId: itemId }
      })
    },
    getData () {
      // let that = this
      // axios({
      //   method: 'GET',
      //   url: 'http://203.195.133.72:8080/category/getAllCategory',
      // }).then(function (result) {
      //   console.log(result.data)
      //
      // })
      axios('/static/article1.json', {methods: 'post'})
        .then(this.getSucc)
    },
    getSucc (res) {
      console.log(res.data.data.listData)
      this.listData = []
      this.listData = res.data.data.listData
      this.allSize = res.data.data.totalSize
    },
    pageChange (start, end) {
      let info = []
      let currentPage = start / this.perSize + 1
      for (let i = 0; i < this.listData.length; i++) {
        info.push(this.listData[i])
      }
      this.list = info.slice(start, end)
      console.log(currentPage)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
  .banner {
    border-top: 1px solid #000;
    border-bootom: 1px solid #000;
    width: 100%;
  }
  .banner > img {
    width: 100%;
  }
  .title {
    position: absolute;
    z-index: 100;
    left: 45%;
    margin-top: -10%;
    color: #fff;
    font-size: 160%;
    font-weight: 700;
   }
  .search {
    margin-top: 2%;
    position: relative;
    height: 5rem;
  }
  .alignSearch {
    width: 100%;
    line-height: 5rem;
    position: absolute;
    left: 20%;
    height: 5rem;
  }
  .alignSearch > input {
    padding: 1%;
    width: 48%;
    border-radius: 10px;
    border: 1px #bfbfbf solid;
  }
  .alignSearch > button {
    padding: 1%;
    color: #fff;
    background: #F96E3E;
    margin-left: 2%;
    border-radius: 20px;
    border: none;
  }
  .articleList {
    width: 80%;
    /*height: 10rem;*/
    margin: 2rem auto;
    border: 1px solid #eee;
    box-shadow: 0 0 5px #eee;
    border-radius: 1rem;
    position: relative;
  }
  .articleList:hover {
    box-shadow: 0 0 2rem #eee;
  }
  .img {
    width: 100%;
    height: 8rem;
    overflow: hidden;
    border-radius:5px;
    /*margin: 1rem auto;*/
  }
  .img > img {
    display: block;
    width: 100%;
    /*height: 100%;*/
    /*border-radius: 10px;*/
    /*opacity: 0.5;*/
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    opacity: 0.6;
    z-index: 10;
  }
  .desc {
    position: absolute;
    top: 25%;
    left: 5%;
    width:90%;
    /*bottom: 0;*/
    z-index: 20;
    color: #333;
  }
  .titleList {
    letter-spacing: 1px;
    font-weight: 400;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .subtitle{
    font-weight: normal;
    margin-left:5%;
    margin-top:1%;
    color: #666;
  }
  .time {
    float: right;
    margin-top: -1%;
  }
</style>
