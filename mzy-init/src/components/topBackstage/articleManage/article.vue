<template>
  <div class="article-container">
    <h2 class="pos">文章管理</h2>
    <hr style="background: #F3F6F8;border: none; height: 2px;">
    <div class="type-list">
        <span
          v-for="item of typeList"
          :class="{'article-type': true, 'typeActive': currentType === item}"
          @click="typeChange(item)"
        >{{item}}</span>
    </div>
    <div class="article-list">
      <table class="article-table">
        <thead>
        <th>序号</th>
        <th>标题</th>
        <th>类型</th>
        <th>作者</th>
        <th>日期</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr class="article-items" v-for="(item, index) of currentList" :key="item.id">
          <td>{{index+1}}</td>
          <td style="width: 40%;text-align: left">{{item.title}}</td>
          <td width="10%">{{item.type}}</td>
          <td width="10%">{{item.author}}</td>
          <td width="10%">{{item.date}}</td>
          <td width="20%">
            <button data-id="item.id" @click="publishEdit">发布</button>
            <button data-id="item.id" @click="contentEdit">编辑</button>
            <button data-id="item.id" @click="deleteEdit">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "aritcleManage",
    data () {
      return {
        typeList: ["全部"],
        articleList: [],
        currentType: "全部",
        currentList: []
      }
    },
    methods: {
      getArticle() {
        axios.get('/api/article.json').then((res) => {
          this.dealArticle(res.data.data)
        })
      },
      dealArticle(data) {
        this.articleList = this.currentList = data;
        for (let i = 0; i < data.length; i++) {
          const typeTemp = data[i].type
          if (!this.typeList.includes(typeTemp)) {
            this.typeList.push(typeTemp)
          }
        }
      },
      typeChange(type) {
        this.currentList = []
        this.currentType = type
        if (type === '全部') this.currentList = this.articleList
        else {
          for (let i = 0; i < this.articleList.length; i++) {
            const articleTemp = this.articleList[i]
            if(articleTemp.type === type) {
              this.currentList.push(articleTemp)
            }
          }
        }
      },
      publishEdit() {},
      contentEdit() {},
      deleteEdit() {}
    },
    mounted() {
      this.getArticle()
      console.log('a'+'b')
    }
  }
</script>

<style scoped>
  .article-container{
    height: 100%;
    margin: 30px;
    background: #fff;
    border-radius: 4px;
  }
  .pos{
    padding: 20px 40px;
  }
  .type-list{
    padding: 30px;
  }
  .article-type{
    position: relative;
    display: inline-block;
    width: 100px;
    height: 60px;
    border-radius: 4px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    transition: all .5s;
    background: #fff;
    overflow: hidden;
  }
  .article-type:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 25px;
    width: 50px;
    height: 3px;
    background: #3788EE;
    transform: translateY(4px);
    transition: all .5s;
  }
  .article-type:hover{
    color: #3788EE;
    transform: scale(1.1) translateY(-4px);
    transition: all .5s;
  }
  .article-type:hover:after{
    transform: translateY(0);
    transition: all .5s;
  }
  .typeActive{
    transform: scale(1.1) translateY(-4px);
    color: #3788EE;
  }
  .article-list{
    padding: 0 30px;
  }
  .article-table{
    width: 100%;
  }
  .article-items{
    text-align: center;
    font-size: 14px;
  }
  thead>th{
    padding-bottom: 15px;
  }
  tbody>tr>td{
    padding: 5px;
  }
</style>
