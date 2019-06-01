<template>
  <div class="commentContainer">
    <h2 style="padding: 20px 40px;">言论管理</h2>
    <hr style="background: #F3F6F8;border: none; height: 2px;">
    <!--首部内容-->
    <div class="commentTop">
      <div :class="{'commentItem':'true'=='true',active:commentStatus=='0'}"
           data-id="0"
           @click="commentChange">留言管理</div>
      <div :class="{'commentItem':'true'=='true',active:commentStatus=='1'}"
           data-id="1"
           @click="commentChange">评论管理</div>
    </div>
    <!--中间搜索框-->
    <div class="commentMiddle">
      <input class="searchInput" type="search"
             v-model="searchBox"
             @keyup.enter="dealSearchBtn">
      <button class="searchBtn" @click="dealSearchBtn">搜索</button>
    </div>
    <!--选择言论排列顺序-->
    <div class="dropBox">
      <select name="chooseTimeSort"
              id="chooseTimeSort"
              class="chooseTimeSort"
              v-model="selectItemContain"
              @click="getTimeSequence"
      >
        <option :value="item.value" v-for="(item,index) of selectItem" :key="index">{{item.name}}</option>
      </select>
    </div>
    <!--清除浮动-->
    <br clear="all" />
    <!--关于留言的表格-->
    <div class="commentTableInfo" v-show="this.commentStatus == 0">
      <table cellspacing=0 cellpadding=0 class="commentTableAll">
        <tr class="commentTableHead">
          <th class="commentInfo">留言</th>
          <th class="userInfo">用户</th>
          <th class="timeInfo">时间</th>
          <th class="operationInfo">操作</th>
        </tr>
        <tr class="commentTableBody" v-for="(item,index) of messageList"
            :key="item.id">
          <th>{{item.content}}</th>
          <th>{{item.user}}</th>
          <th>{{item.time}}</th>
          <th><button class="operationBtn" :data-id="item.id">删除</button></th>
        </tr>
      </table>
    </div>
    <!--关于评论列表-->
    <div class="commentTableInfo" v-show="this.commentStatus == 1">
      <table cellspacing=0 cellpadding=0 class="commentTableAll">
        <tr class="commentTableHead">
          <th class="commentInfo">评论</th>
          <th class="userInfo">用户</th>
          <th class="timeInfo">时间</th>
          <th class="operationInfo">操作</th>
        </tr>
        <tr class="commentTableBody" v-for="(item,index) of commentList"
        :key="item.id">
          <th>{{item.content}}</th>
          <th>{{item.user}}</th>
          <th>{{item.time}}</th>
          <th><button class="operationBtn" :data-id="item.id">删除</button></th>
        </tr>
      </table>
    </div>
  </div>

</template>

<script>
  import axios from "axios"
    export default {
      name: "comment",
      data () {
        return {
          commentStatus: 0,
          commentList: [],
          messageList: [],
          selectItem:[{
            "value":"back",
            "name":"更新时间倒叙"
          },{
            "value":"order",
            "name":"更新时间顺序"
          }],
          //两个参数，代表着两个分开页面选择框里面的值
          selectItemContain:"back",
          selectItemContainMessage: "back",
          selectItemContainComment: "back",
        //  搜索框里面的内容
          searchBoxMessage:"",
          searchBoxComment:"",
          searchBox:""
        }
      },
      methods: {
        //点击上方按钮，用户调整言论还是留言
        commentChange (e){
          if(e.target.dataset.id == "0"){
            this.commentStatus = 0;
          //  更改选择框里面的值
            this.selectItemContain = this.selectItemContainComment;
            this.searchBox = this.searchBoxComment;
          }

          if(e.target.dataset.id == "1"){
            this.commentStatus = 1;
            this.selectItemContain = this.selectItemContainMessage;
            this.searchBox = this.searchBoxMessage;
          }
        },
        getInfo(){
          axios.get('api/comment.json').then((res)=>{
            this.dealComment(res.data.data);
          })
        },
        dealComment(data) {
        //  根据不同的类型放入不同的数组里面
          for (let i = 0;i<data.length;i++){
            const dataInfo = data[i];
            if(dataInfo.type == "message"){
              this.messageList.push(dataInfo);
            }
            else if(dataInfo.type == "comment"){
              this.commentList.push(dataInfo);
            }
          }
        },
        //让下拉框里面的内容随着页面的调整而调整
        getTimeSequence(e){
        //  获得用户选择的事件排序，默认是倒叙，如果是顺序就得重新颠倒
          if(e.target.value == "order"){
            if(this.commentStatus == 0){
              this.selectItemContainComment = "order";
              //更改一下选择框里面选择的值
            }else if(this.commentStatus == 1){
              this.selectItemContainMessage = "order";
            }
          }else if(e.target.value == "back"){
            if(this.commentStatus == 0){
              this.selectItemContainComment = "back";
              //更改一下选择框里面选择的值
            }else if(this.commentStatus == 1){
              this.selectItemContainMessage = "back";
            }
          }
        //  获取到当前用户的所在的是留言还是评论
          /**
           * 有个问题就是，这个select选择框需要不要做两个，一个在留言管理，一个在评论管理，两个是分离的，还是选择使用在data数据里面进行绑定？？？
           * 其实自己还是知道需要分开，那么就采用使用data进行绑定吧~实现一下，不行就换
           */
        },
        dealSearchBtn(){
          if(this.searchBox != ""){
            let searchContain = this.searchBox;
            //获取到输入框里面的内容
            console.log(searchContain);
          }
        }
      },
      mounted() {
        this.getInfo();
      },
      watch: {
        searchBox:function () {
          //监听搜索框里面值的不断变化
          if(this.commentStatus == 0){
            this.searchBoxComment = this.searchBox;
          }else if(this.commentStatus == 1){
            this.searchBoxMessage = this.searchBox;
          }
        }
      }
    }
</script>

<style scoped>
  .commentContainer{
    height: 100%;
    margin: 30px;
    background: #fff;
    border-radius: 4px;
  }
  /*首部样式*/
  .commentTop{
    color: #9E9E9E;
    padding :10px;
    height: 40px;
  }
  .active{
    color: #3788EE;
    border-bottom: 1px solid #3788EE;
  }
  .commentItem{
    padding: 2px;
    height: 30px;
    display: inline-block;
    margin: 15px;
    font-size: 18px;
  }
  .commentItem:hover{
    cursor: pointer;
  }
  /*搜索框样式*/
  .commentMiddle{
    height: 40px;
    margin-left: 20%;
    margin-top: 3%;
  }
  .searchInput{
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:0;
    height: 40px;
    width: 450px;
    /*设置输入框字体颜色*/
    color: 	#696969;
    font-size: 18px;
    border-radius: 5px;
    border-style: none;
    border: 1px solid #9E9E9E;
  }
  .searchBtn{
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:0;
    font-size: 16px;
    height: 40px;
    width: 80px;
    margin-left: 30px;
    border-radius: 5px;
    background-color: #FFFFFF;
    color: #3788EE;
    border: 2px solid #3788EE;
    cursor: pointer;
  }
  /*下拉框样式*/
  .dropBox{
    height: 40px;
    width: 200px;
    float: right;
    margin-right: 5%;
    margin-top: 3%;
  }
  .chooseTimeSort{
    outline:0;
    height: 40px;
    width: 200px;
    border-radius: 5px;
    font-size: 16px;
    background-color: #F5F5F5;
    color: #6D6D6D;
    border-style: none;
  }
  /*表格信息*/
  .commentTableInfo{
    width: 98%;
    border-radius: 5px;
    padding: 2%;
  }
  .commentTableAll{
    width: 98%;
    border: 1px solid #F5F5F5;
  }
  .commentTableHead{
    height: 50px;
    background-color: #F5F5F5;
  }
  .commentTableBody{
    height: 50px;
    font-size: 16px;
  }
  .commentInfo{
    width: 50%;
  }
  .userInfo,
  .timeInfo,
  .operationInfo{
    width: 15%;
  }
  .tableBody > th{
    height: 50px;
    border-bottom: 1px solid #F5F5F5;
  }
  .operationBtn{
    border: none;
    outline: none;
    outline:0;
    width: 80%;
    height: 40px;
    color: white;
    font-size: 16px;
    background-color: #3788EE;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
