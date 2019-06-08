<template>
    <div class="mainUser">
      <h2 class="pos">人员管理</h2>
      <hr style="background: #F3F6F8;border: none; height: 2px;">
      <!--导入按钮-->
      <div class="addUserInfo">
        <button class="addUserInfoBtn" @click="downTemplate">下载模板</button>
        <button class="addUserInfoBtn" @click="submitTemplate">提交表格</button>
      </div>
      <!--清除浮动-->
      <br clear="all" />
      <!--中间人员列表-->
      <div class="userTableInfo">
        <table cellspacing=0 cellpadding=0 class="userTableAll">
          <tr class="userTableHead">
            <th class="orderInfo">序号</th>
            <th class="nameInfo">昵称</th>
            <th class="schoolInfo">所属大学</th>
            <th class="timeInfo">时间</th>
            <th class="statusInfo">状态</th>
            <th class="operationInfo">操作</th>
            <th class="operationDel">删除</th>
          </tr>
          <tr class="userTableBody"
          v-for="(item,index) of dataList"
              :key="item.id"
          >
            <th>{{item.id}}</th>
            <th>{{item.name}}</th>
            <th>{{item.university}}</th>
            <th>{{item.time}}</th>
            <th>{{item.state}}</th>
            <!--按钮点击事件，进行信息的更改-->
            <th><button class="operationBtn"
                        :data-id="item.id"
                        @click="dealChangeStatus(item,index)"
            >操作</button></th>
            <th><button class="operationBtn"
                        :data-id="item.id"
                        @click="deleteUser(item)"
            >删除</button></th>
          </tr>
        </table>
      </div>
      <!--分页-->
      <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
      <!--对话框-->
      <div class="popBox">
        <modifyBox v-if="showPopBox" :clickMemberInfo="clickMemberInfo" :showPopBox="showPopBox" v-on:dealShowPopBox="dealShowPopBox"></modifyBox>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import paging from '../../paging/paging'
  import modifyBox from './modifyBox'
  export default {
    name: "user",
    data () {
      return {
        //每一个分页里面的内容
        dataList : [],
        //保存原始数据
        dataListAc :[],
        showPopBox:false,
        clickMemberInfo:new Object(),
        allSize:0,
        perSize:10,
      //  分页数据
        pageAc:0,
        pageEn:0,
      }
    },
    components: {
      modifyBox:modifyBox,
      paging:paging
    },
    methods:{
      getInfo() {
        axios.get('/api/user.json').then((res)=>{
          this.dealUserInfo(res.data.data);
        })
      },
      dealUserInfo(data){
        //点击页面，需要显示有关信息
        for (let i = 0;i<data.length;i++){
          const dataInfo = data[i];
          this.dataList.push(dataInfo);
          this.dataListAc.push(dataInfo);
        }
        this.allSize = this.dataListAc.length;
      },
      dealChangeStatus(info,index){
      //  根据ID来确定用户点击的信息
        this.clickMemberInfo.id = info.id;
        this.clickMemberInfo.index = index+1;
        this.clickMemberInfo.name = info.name;
        this.clickMemberInfo.university = info.university;
        this.clickMemberInfo.time = info.time;
        this.clickMemberInfo.state = info.state;
        //其实可以写在一个页面里面，但是既然用了Vue，还是得做做组件传值哈
        //  在定义一个弹出框组件
        this.showPopBox = true;
      },
      dealShowPopBox(showBox,newInfo){
        for (let i = 0;i < this.dataList.length;i++){
          if(this.dataList[i].id == newInfo.id){
            this.dataList[i] = newInfo;
          }
          if(this.dataListAc[i].id == newInfo.id){
            this.dataListAc[i] = newInfo;
          }
        }
        this.showPopBox = showBox;
      },
      //删除管理员
      deleteUser(info){
        if(confirm("确定删除？")){
          for (let i = 0;i<this.dataList.length;i++){
            if(info == this.dataList[i]){
              this.dataList.splice(i,1);
              break;
            }
          }
          for (let i = 0;i<this.dataListAc.length;i++){
            if(info == this.dataListAc[i]){
              this.dataListAc.splice(i,1);
              break;
            }
          }
          this.allSize = this.dataListAc.length;
        }
      },
      //下载模板
      downTemplate(){

      },
      //上传模板
      submitTemplate(){

      },
      pageChange(start, end) {
        this.pageAc = start;
        this.pageEn = end;
        let info = [];
        this.dataList = [];
        for (let i = 0; i < this.dataListAc.length; i++) {
          info.push(this.dataListAc[i]);
        }
        this.dataList = info.slice(start, end);
      }
    },
    mounted() {
      //运用生命周期钩子，在进入页面的时候触发函数
      this.getInfo();
    }
  }
</script>

<style scoped>
  .mainUser{
    margin: 30px;
    background: #fff;
    border-radius: 4px;
  }
  /*导入信息主样式*/
  .addUserInfo{
    float: right;
    margin-right: 5%;
    margin-bottom: 1%;
  }
  .addUserInfoBtn{
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:0;
    font-size: 16px;
    height: 40px;
    width: 80px;
    margin-left: 30px;
    border-radius: 5px;
    background-color: #3788EE;
    color: #fff;
    border: 2px solid #fff;
    cursor: pointer;
  }
  /*顶层样式*/
  .pos{
    padding: 20px 40px;
  }
  /*列表样式*/
  .userTableInfo{
    width: 95%;
    padding: 0 2%;
  }
  .userTableAll{
    width: 100%;
    border: 1px solid #F5F5F5;
  }
  .userTableHead{
    height: 50px;
    background-color: #F5F5F5;
  }
  .orderInfo{
    width: 8%;
  }
  .nameInfo,
  .schoolInfo,
  .timeInfo,
  .statusInfo,
  .operationInfo,
  .operationDel{
    width: 15.3%;
  }
  .userTableBody{
    height: 50px;
    font-size: 16px;
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
