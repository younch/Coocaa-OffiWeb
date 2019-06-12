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
        <tr class="commentTableBody" v-for="item of commentList[0]"
            :key="item.id">
          <th>{{item.content}}</th>
          <th>{{item.user}}</th>
          <th>{{item.time}}</th>
          <th><button class="operationBtn" :data-id="item.id" @click="deleteInfo(item)">删除</button></th>
        </tr>
      </table>
      <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
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
        <tr class="commentTableBody" v-for="item of commentList[1]"
            :key="item.id">
          <th>{{item.content}}</th>
          <th>{{item.user}}</th>
          <th>{{item.time}}</th>
          <th><button class="operationBtn" :data-id="item.id" @click="deleteInfo(item)">删除</button></th>
        </tr>
      </table>
      <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
    </div>
    <div class="hidden" v-show="freshPage"></div>
  </div>

</template>

<script>
  import axios from "axios"
  import paging from '../../paging/paging'
  export default {
    name: "comment",
    components: {
      paging:paging
    },
    data () {
      return {
        commentStatus: 0,
        commentList: [[],[]],
        originCommentList:[[],[]],
        selectItem:[{
          "value":"back",
          "name":"更新时间倒叙"
        },{
          "value":"order",
          "name":"更新时间顺序"
        }],
        //两个参数，代表着两个分开页面选择框里面的值
        selectItemContain:"back",
        selectItemSepared:["back","back"],
        //  搜索框里面的内容
        searchBoxSepared:["",""],
        searchBox:"",
        //分页信息
        allSize:0,
        perSize:10,
        pageAc: 0,
        pageEn:0,
        //  Vue重载加载
        freshPage:false,
        token:"",
      }
    },
    methods: {
      //点击上方按钮，用户调整言论还是留言
      commentChange (e){
        if(e.target.dataset.id == "0"){
          this.commentStatus = 0;
          //  更改选择框里面的值
          this.selectItemContain = this.selectItemSepared[1];
          this.searchBox = this.searchBoxSepared[1];
        }
        if(e.target.dataset.id == "1"){
          this.commentStatus = 1;
          this.selectItemContain = this.selectItemSepared[0];
          this.searchBox = this.searchBoxSepared[0];
        }
        this.allSize = this.originCommentList[this.commentStatus].length;
      },
      getInfo(){
        //发两次请求
        axios({
          methods: "get",
          url:"/api/LeaveMessage/getAll",
          headers: {
            "token" : this.token,
            "userId":3
          }
        }).then((res)=>{
          //评论接口
          if(res.data.code == 200){
            this.dealComment(res.data);
          }
          console.log("info",res.data)
        });
      },
      dealComment(data) {
        //  根据不同的类型放入不同的数组里面
        for (let i = 0;i<data.length;i++){
          const dataInfo = data[i];
          if(dataInfo.type == "message"){
            this.commentList[0].push(dataInfo);
          }
          else if(dataInfo.type == "comment"){
            this.commentList[1].push(dataInfo);
          }
        }
        //时间排序
        let info = new Object();
        info.target = new Object();
        info.target.value = this.selectItemContain;
        this.getTimeSequence(info);
        //保存原始数据
        for (let i = 0;i < this.commentList[0].length;i++){
          this.originCommentList[0][i] = this.commentList[0][i];
        }
        for (let i = 0;i < this.commentList[1].length;i++){
          this.originCommentList[1][i] = this.commentList[1][i];
        }
        this.sortDataArray(this.commentList[0],"back");
        this.sortDataArray(this.commentList[1],"back");
        //  分页信息
        let index = this.commentStatus;
        this.allSize = this.commentList[index].length;
      },
      //让下拉框里面的内容随着页面的调整而调整
      //  获得用户选择的事件排序，默认是倒叙，如果是顺序就得重新颠倒
      getTimeSequence(e){
        let index = this.commentStatus;
        if(e.target.value == "order"){
          if(index == 0){
            this.selectItemSepared[1] = "order";
            this.sortDataArray(this.commentList[0],"order");
            //更改一下选择框里面选择的值
          }else if(index == 1){
            this.selectItemSepared[0] = "order";
            this.sortDataArray(this.commentList[1],"order");
          }
        }else if(e.target.value == "back"){
          if(index == 0){
            this.selectItemSepared[1] = "back";
            this.sortDataArray(this.commentList[0],"back");
            //更改一下选择框里面选择的值
          }else if(index == 1){
            this.selectItemSepared[0] = "back";
            this.sortDataArray(this.commentList[1],"back");
          }
        }
        // let index = this.commentStatus;
        // this.pageChange(this.pageAc,this.pageEn);
        //  获取到当前用户的所在的是留言还是评论
        /**
         * 有个问题就是，这个select选择框需要不要做两个，一个在留言管理，一个在评论管理，两个是分离的，还是选择使用在data数据里面进行绑定？？？
         * 其实自己还是知道需要分开，那么就采用使用data进行绑定吧~实现一下，不行就换
         */
      },
      //对数组根据日期进行排序
      sortDataArray(dataArray,way){
        if(way == "order"){
          return dataArray.sort(function(a,b) {
            return Date.parse(a.time.replace(/-/g,"/"))-Date.parse(b.time.replace(/-/g,"/"));
          });
        }else if(way == "back"){
          return dataArray.sort(function(a,b) {
            return Date.parse(b.time.replace(/-/g,"/"))-Date.parse(a.time.replace(/-/g,"/"));
          });
        }
      },
      //处理搜索框
      dealSearchBtn(){
        if(this.searchBox != ""){
          let index = this.commentStatus;
          let searchContain = this.searchBox;
          //获取到输入框里面的内容，进行模糊匹配
          let containInfo = [];
          let userWTF = [];
          for (let i = 0;i<this.originCommentList[index].length;i++){
            if(this.originCommentList[index][i].id == searchContain || this.originCommentList[index][i].content == searchContain || this.originCommentList[index][i].user == searchContain || this.originCommentList[index][i].time == searchContain){
              userWTF.push(this.originCommentList[index][i]);
            }
            else if(this.originCommentList[index][i].id.indexOf(searchContain) != -1 || this.originCommentList[index][i].content.indexOf(searchContain) != -1 ||this.originCommentList[index][i].user.indexOf(searchContain) != -1 || this.originCommentList[index][i].time.indexOf(searchContain) != -1){
              containInfo.unshift(this.originCommentList[index][i]);
            }else {
              containInfo.push(this.originCommentList[index][i]);
            }
          }
          //将完全匹配的内容放到数组的最前面
          this.sortDataArray(userWTF,this.selectItemContain);
          this.sortDataArray(containInfo,this.selectItemContain);
          for (let i = userWTF.length -1 ;i >= 0;i--){
            containInfo.unshift(userWTF[i]);
          }
          this.originCommentList[index] = [];
          for (let i = 0;i < containInfo.length;i++){
            this.originCommentList[index].push(containInfo[i]);
          }
          this.commentList[index] = containInfo.splice(0,this.perSize);
          let info = new Object();
          info.target = new Object();
          info.target.value = this.selectItemContain;
          // this.getTimeSequence(info);
        }else if(this.searchBox == ""){
          //  展示全部内容
          if(this.commentStatus == 1){
            this.commentList[0] = this.originCommentList[0];
          }else if(this.commentStatus == 0){
            this.commentList[1] = this.originCommentList[1];
          }
        }
        // //需不需要默认在按回车的时候进入的页面是第一页，如果需要就要加
        // this.pageChange(0,this.perSize);
        //但是显示是第一页，下面对应的页码数没有改变
        this.freshPageFc();
        console.log("搜索之后的显示："+this.pageAc,this.pageEn);
        this.pageChange(this.pageAc,this.pageEn);
      },
      //  处理删除事件
      deleteInfo(item){
        let index = this.commentStatus;
        if(confirm("确定删除？")){
          for (let i = 0;i < this.originCommentList[index].length;i++){
            if(this.originCommentList[index][i] == item){
              this.originCommentList[index].splice(i,1);
            }
            if(this.commentList[index][i] == item){
              this.commentList[index].splice(i,1);
            }
          }
          this.allSize = this.originCommentList[index].length;
          this.pageChange(this.pageAc,this.pageEn);
          this.freshPageFc();
        }
      },
      pageChange(start, end){
        console.log(start,end);
        this.pageAc = start;
        this.pageEn = end;
        let index = this.commentStatus;
        let info = [];
        for (let i = 0; i < this.originCommentList[index].length;i++){
          info.push(this.originCommentList[index][i]);
        }
        this.commentList[index] = info.slice(start, end);
        this.freshPageFc();
      },
      freshPageFc(){
        if(this.freshPage){
          this.freshPage = false;
        }else{
          this.freshPage = true;
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
          this.searchBoxSepared[1] = this.searchBox;
          if(this.searchBoxSepared[1] == ""){
            this.commentList[0] = this.originCommentList[0];
          }
        }else if(this.commentStatus == 1){
          this.searchBoxSepared[0] = this.searchBox;
          if(this.searchBoxSepared[0] == ""){
            this.commentList[1] = this.originCommentList[1];
          }
        }
        this.pageChange(this.pageAc,this.pageEn);
      }
    }
  }
</script>

<style scoped>
  .commentContainer{
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
    padding-left: 10px;
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
