<template>
    <div class="mainUser">
      <h2 class="pos">人员管理</h2>
      <hr style="background: #F3F6F8;border: none; height: 2px;">
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
          </tr>
          <tr class="userTableBody"
          v-for="(item,index) of dataList"
              :key="item.id"
          >
            <th>{{index+1}}</th>
            <th>{{item.name}}</th>
            <th>{{item.university}}</th>
            <th>{{item.time}}</th>
            <th>{{item.state}}</th>
            <!--按钮点击事件，进行信息的更改-->
            <th><button class="operationBtn"
                        :data-id="item.id"
                        @click="dealChangeStatus(item)"
            >操作</button></th>
          </tr>
        </table>
      </div>
      <!--对话框-->
      <!--<modify-box></modify-box>-->
    </div>
</template>

<script>
  import axios from 'axios'
  // import modifyBox from "modifyBox"
  export default {
    name: "user",
    data () {
      return {
        dataList : []
      }
    },
    components:{
      // modifyBox
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
        }
      },
      dealChangeStatus(info){
      //  根据ID来确定用户点击的信息
        let ID = info.id;
      //  在定义一个弹出框组件
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
    height: 100%;
    margin: 30px;
    background: #fff;
    border-radius: 4px;
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
  .operationInfo{
    width: 18.4%;
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
