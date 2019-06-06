<template>
  <div class="article-container">
    <h2 class="pos">文章管理</h2>
    <hr style="background: #F3F6F8;border: none; height: 2px;">
    <transition name="articleShowCon">
      <div v-show="flag" class="article-showCon">
        <div class="type-list">
        <span
          v-for="item of typeList"
          :class="{'article-type': true, 'typeActive': currentType === item}"
          @click="typeChange(item)"
        >{{item}}</span>
          <input v-model="searchId" name="article-search" type="text" placeholder="search">
          <button class="article-new" @click="contentEdit">新增</button>
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
                <button @click="publishEdit(item.id)">{{item.publish?'撤回':'发布'}}</button>
                <button @click="contentEdit(item.id)">编辑</button>
                <button @click="deleteEdit(item.id)">删除</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
      </div>
    </transition>
    <transition name="articleEditCon">
      <div v-show="!flag" class="article-editCon">
        <div>
          <button @click="flag = true">返回</button>
          <button @click="saveEdit">保存</button>
          <label for="title">标题</label>
          <input id="title" type="text" v-model="currentArticle.title">
          <label for="type">类型</label>
          <select id="type" v-model="currentArticle.type">
            <option v-for="item of typeList" :value="item" v-if="item !== '全部'">{{item}}</option>
          </select>
          <label for="author">作者</label>
          <input id="author" type="text" v-model="currentArticle.author">
          <label for="date">日期</label>
          <input id="date" type="date" v-model="currentArticle.date ">
        </div>
        <mavon-editor
          class="md-edit"
          v-model="currentArticle.content"
          ref=md
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
          @save="saveEdit"
        ></mavon-editor>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import axios from 'axios'
  import paging from '../../paging/paging'
  export default {
    name: "aritcleManage",
    components: {
      mavonEditor,
      paging
    },
    data () {
      return {
        flag: true,
        typeList: ["全部"],
        articleList: [],
        currentType: "全部",
        currentList: [],
        currentArticle: {
          "id": "",
          "title": "",
          "date": "",
          "type": "",
          "author": "",
          "publish": false,
          "content": ""
        },
        timer: null,
        searchId: '',
        perSize: 2,
        allSize: 0,
        hackReset: true
      }
    },
    computed: {
    },
    methods: {
      getArticle() {
        axios.get('/api/article.json').then((res) => {
          this.dealArticle(res.data.data)
        })
      },
      dealArticle(data) {
        this.articleList = this.currentList = data;
        this.allSize = this.currentList.length
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
        if (type === '全部') {
          this.currentList = this.articleList
        }
        else {
          for (let i = 0; i < this.articleList.length; i++) {
            const articleTemp = this.articleList[i]
            if(articleTemp.type === type) {
              this.currentList.push(articleTemp)
            }
          }
        }
        this.allSize = this.currentList.length
        this.currentList = this.currentList.slice(0, this.perSize)
      },
      publishEdit(id) {
        for (let i = 0; i < this.currentList.length; i++) {
          if(this.currentList[i].id === id){
            this.currentList[i].publish = !this.currentList[i].publish
          }
        }
      },
      contentEdit(id) {
        this.flag = false
        if(typeof id === "object"){
          for(let i in this.currentArticle){
            this.currentArticle[i] = ''
          }
        }
        else{
          for (let i = 0; i < this.currentList.length; i++) {
            const temp = this.currentList[i]
            if(temp.id === id){
              this.currentArticle = JSON.parse(JSON.stringify(temp))
              break
            }
          }
        }
      },
      deleteEdit(id) {
        for (let i = 0; i < this.articleList.length; i++) {
          const temp = this.articleList[i]
          if(temp.id === id){
            if(confirm('确认删除？')){
              this.articleList.splice(i, 1)
            }
            break
          }
        }
      },
      saveEdit(){
        for (let i in this.currentArticle) {
          if(this.currentArticle[i] === '' && i !== 'id' && i !== 'publish' && i !== 'content'){
            console.log(i)
            alert('请填写必填项')
            return
          }
        }
        if(this.currentArticle.id === ''){
          this.articleList.push(this.currentArticle)
          alert('保存成功')
        } else {
          for (let i = 0; i < this.articleList.length; i++) {
            const temp = this.articleList[i]
            if(temp.id === this.currentArticle.id){
              this.articleList[i] = JSON.parse(JSON.stringify(this.currentArticle))
              this.typeChange(this.currentType)
              alert('保存成功')
              break
            }
          }
        }
      },
      pageChange(start, end){
        this.currentList = []
        if (this.currentType === '全部') {
          this.currentList = this.articleList
        }else{
          for (let i = 0; i < this.articleList.length; i++) {
            if(this.articleList[i].type === this.currentType){
              this.currentList.push(this.articleList[i])
            }
          }
        }
        this.currentList = this.currentList.slice(start, end)
      },
      $imgAdd(pos, $file){
        //   // 第一步.将图片上传到服务器.
        //   var formdata = new FormData();
        //   formdata.append('image', $file);
        //   axios({
        //     url: 'server url',
        //     method: 'post',
        //     data: formdata,
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //   }).then((url) => {
        //     // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        //     // $vm.$img2Url 详情见本页末尾
        //     $vm.$img2Url(pos, url);
        //   })
      },
      $imgDel(pos){
        // axios({
        //   url: 'server url',
        //   method: 'post',
        //   data: pos,
        // })
      }
    },
    watch: {
      searchId: function () {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const searchid = this.searchId
          var arr = []
          if (!searchid) {
            if (this.currentType === '全部') arr = this.articleList
            else {
              for (let i = 0; i < this.articleList.length; i++) {
                const articleTemp = this.articleList[i]
                if(articleTemp.type === this.currentType) {
                  arr.push(articleTemp)
                }
              }
            }
          }else {
            for (let i = 0; i < this.articleList.length; i++) {
              const temp = this.articleList[i]
              if((this.currentType === '全部' || this.currentType === temp.type) && temp.title.includes(searchid)) {
                arr.push(temp)
              }
            }
          }
          this.currentList = arr
        }, 300)
      }
    },
    mounted() {
      this.getArticle()
    }
  }
</script>

<style scoped>
  .article-container{
    height: 100%;
    margin: 30px;
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
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
  input[name='article-search']{
    float: right;
    padding: 10px;
    border-radius: 10px;
    border: none;
    margin: 15px 20px;
  }
  .article-new{
    float: right;
    outline: none;
    margin: 20px;
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
  .article-showCon, .article-editCon{
    height: 100%;
  }
  .md-edit{
    height: calc(100% - 100px);
  }
  .articleShowCon-leave-to, .articleShowCon-enter{
    transform: translateX(-400px);
    opacity: 0;
    transition: all 1.5s ease;
  }
  .articleShowCon-enter-to{
    transform: translateX(0);
    opacity: 1;
    transition: all 1.5s ease;
  }
  .articleEditCon-leave{
    opacity: 0;
  }
  .articleEditCon-enter{
    opacity: 0;
    transition: opacity .5s;
  }
  .articleEditCon-enter-to{
    opacity: 1;
    transition: opacity .5s;
    transition-delay: 1.5s;
  }
</style>
