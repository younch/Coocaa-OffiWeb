<template>
    <div class="mainUser">
      <h2 class="pos">人员管理</h2>
      <hr style="background: #F3F6F8;border: none; height: 2px;">
      <!--导入按钮-->
      <div class="addUserInfo">
        <button class="addUserInfoBtn" @click="downTemplate" style="height: 44px;">下载模板</button>
        <div class="upload" style="display: inline-block;">
          <div class="fileBox">
            <input type="file" id="myFile" v-show="false" @change="handlerUpload($event)">
            <label for="myFile" class="addUserInfoBtn" style="display: inline-block;width: 100px;height:40px;line-height: 40px">点击上传文件</label>
          </div>
        </div>

        <!--<button class="addUserInfoBtn" @click="submitTemplate">提交表格</button>-->
      </div>
      <!--清除浮动-->
      <br clear="all" />
      <!--中间人员列表-->
      <div class="userTableInfo">
        <table cellspacing=0 cellpadding=0 class="userTableAll">
          <tr class="userTableHead">
            <th class="orderInfo">ID</th>
            <!--<th class="nameInfo">昵称</th>-->
            <!--<th class="schoolInfo">所属大学</th>-->
            <!--<th class="timeInfo">时间</th>-->
            <th class="statusInfo">状态</th>
            <th class="operationInfo">更改身份</th>
            <th class="operationDel">删除</th>
          </tr>
          <tr class="userTableBody"
          v-for="item of dataList"
              :key="item.id"
          >
            <th>{{item.id}}</th>
            <!--<th>{{item.name}}</th>-->
            <!--<th>{{item.university}}</th>-->
            <!--<th>{{item.time}}</th>-->
            <th>{{stateShow[item.state]}}</th>
            <!--按钮点击事件，进行信息的更改-->
            <th><button class="operationBtn"
                        :data-id="item.id"
                        @click="dealChangeStatus(item)"
            >操作</button></th>
            <th><button class="operationBtn"
                        :data-id="item.id"
                        @click="deleteUser(item)"
            >删除</button></th>
          </tr>
        </table>
      </div>
      <!--分页-->
      <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange" v-show="existInfo"></paging>
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
        existInfo: true,
      //  上传文件代码
        file: new Object(),
      //  根据状态来改变显示字段
        stateShow:["成员","高校管理员","酷开管理员"]
      }
    },
    components: {
      modifyBox:modifyBox,
      paging:paging
    },
    methods:{
      getInfo() {
        //改变接口位置
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
      dealChangeStatus(info){
      //  根据ID来确定用户点击的信息，根据后台需要的字段修改
        this.clickMemberInfo.id = info.id;
        this.clickMemberInfo.state = info.state;
        //其实可以写在一个页面里面，但是既然用了Vue，还是得做做组件传值哈
        //  在定义一个弹出框组件
        this.showPopBox = true;
      },
      dealShowPopBox(showBox,newInfo){
        console.log(newInfo)
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
          // let permissionId;
          // if(info.state == "成员"){
          //   permissionId = 0;
          // }else if(info.state == "高校管理员"){
          //   permissionId = 1;
          // }else if(info.state == "酷开管理员"){
          //   permissionId = 2;
          // }
          //处理删除人员操作
          axios({
            methods: "post",
            url:"/api/rolePermission/deleteRolePermission",
            data:{
              //将id和新的state进行修改
              roleId : info.id,
              permissionId : info.state,

            }
          });
          this.allSize = this.dataListAc.length;
        }
      },
      //下载模板
      downTemplate(){

      },
      //上传模板
      handlerUpload (e) {
        // 获取选定的文件
        var $target = e.target || e.srcElement
        let tFiles = $target.files[0]
        let supportedTypes = ['xls', 'xlsx']
        if( $target && supportedTypes.lastIndexOf(tFiles.name.split('.')[1]) >= 0 ){ // 判断文件类型
          //判断文件大小
          if( tFiles.size <= 2097152 ){
            this.file.name = tFiles.name
            this.file.uploadPercentage =  1
            this.file.size = this.formatFileSize(tFiles.size,0)
            this.file.uploadStatus = 0
            let param = new FormData()
            param.append("file",tFiles)
            console.log(param.get("file"))
            // 配置文件头
            let config = {
              headers: {
                "Content-Type" : "multipart/form-data"
              }
            };
            // 通过axios上传文件
            let that = this
            this.file.uploadStatus = 1
            axios.post('url',param,config).then(function(result){
              that.file.uploadStatus = 2
              alert("上传成功");
            }).catch(function(err){
              console.log(err)
              that.file.uploadStatus = -1
            })
          } else {
            console.log('上传的文件不能超过 2M ！')
            this.file.uploadStatus = -3
            return false
          }
        } else {
          console.log ('只支持 xls、xlsx 格式的文件 ')
          this.file.uploadStatus = -2
          return false
        }
      },
      // 获得文件大小
      formatFileSize (fileSize,idx) {
        var units = ["B", "KB", "MB", "GB"];
        idx = idx || 0;
        if (fileSize < 1024 || idx === units.length - 1) {
          return fileSize.toFixed(1) + units[idx];
        }
        return this.formatFileSize(fileSize / 1024, ++idx);
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
    width: 50%;
    height: 40px;
    color: white;
    font-size: 16px;
    background-color: #3788EE;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
