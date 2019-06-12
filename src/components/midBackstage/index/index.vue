<template>
    <div class="manager">
      <h2 class="pos" style="margin-down:10px;">人员管理</h2>
      <!-- 上传下载 -->
      <div class="up-dowm" style="padding-left:40px;height:50px;">
        <!-- 下载模板 -->
        <div class="download">
          <div class="fileBox">
            <!-- <input type="file" id="myFile" class="inputfile" @change="handlerDownload($event)"> -->
            <label @click="handlerDownload()">
              <i class="iconfont" style="margin-right:5px;">&#xe613;</i>下载模板
            </label>
          </div>
        </div>
        <!-- 上传文件 -->
        <div class="upload">
          <div class="fileBox">
            <input type="file" id="myFile" class="inputfile" @change="handlerUpload($event)">
            <label for="myFile">
              <i class="iconfont" style="margin-right:5px;">&#xe613;</i>点击上传文件
            </label>
          </div>
        </div>
        <!-- 进度 -->
        <div style="float:left;margin-left:20px;">
          <ul class="files" v-if="loadshow">
            <li>
              <div class="fileInfo">
                <div class="fileName filePart">{{ file.name }}</div>
                <div class="fileSize filePart ml10">{{ file.size }}</div>
                <!--进度条-->
                <div class="progress">
                  <span :style="{width:file.uploadPercentage,backgroundColor:file.uploadStatus==1||file.uploadStatus==2?'':'red'}"></span>
                </div>
                <div class="fileStatus">
                  <span v-if="file.uploadStatus == -1" class="uploadFail">出错啦，请重新上传</span>
                  <span v-if="file.uploadStatus == 2" class="uploadSuccess"> 已上传</span>
                  <span v-if="file.uploadStatus == 1" class="uploadSuccess"> 上传中...</span>
                  <span v-if="file.uploadStatus == -2" class="uploadFail">出错啦，文件类型不符合要求</span>
                  <span v-if="file.uploadStatus == -3" class="uploadFail">出错啦，文件大小超出限制</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <hr style="background: #F3F6F8;border: none; height: 2px;">
      <!-- 添加/搜索 -->
      <div class="fuctionbox">
        <input class="addbtn" type="button" value="添加人员" @click="addMember()">
        <input class="addbtn" type="button" value="删除人员" v-if="!moveshow" style="background-color:red" @click="moveshow = true">
        <input class="addbtn" type="button" value="取消删除" v-if="moveshow" style="background-color:grey" @click="moveshow = false;moveid=[];">
        <input class="addbtn" type="button" value="确认删除" v-if="moveshow" style="background-color:red" @click="moveMember()">
        <!-- 搜索 -->
        <div class="searchbox">
          <input class="searchtext" type="text">
          <input class="searchbtn" type="button" value="搜索" @click="search">
        </div>
      </div>
      <!-- 分隔线 -->

      <!-- 表格 -->
      <div cellspacing=0 class="tablebox">
        <table class="table">
          <tr class="tablehead">
            <th class="column-head">学校</th>
            <th class="column-head">学号</th>
            <th class="column-head">姓名</th>
            <th class="column-head">联系方式</th>
            <th class="column-head">部门</th>
            <!-- <th class="column-head">密码</th> -->
            <th class="column-head" v-if="moveshow"><input type="checkbox" @click="checkAll" v-model="checked">全选</th>
            <!-- <th colspan="3" class="value"></th> -->
          </tr>
          <tr class="tablebody row" v-for="(item,index) in stulist" :key="item.userid">
            <td class="column-item">{{ item.school }}</td>
            <td class="column-item">{{ item.stuid }}</td>
            <td class="column-item">{{ item.username }}</td>
            <td class="column-item">{{ item.telphone }}</td>
            <td class="column-item">{{ item.department }}</td>
            <!-- <td class="column-item">{{ item.password }}</td> -->
            <td>
              <input type="checkbox" class="move" v-if="moveshow" :value="item.userid" v-model="moveid">
              <button class="operationBtn" :data-id="item.id" @click="dealChangeStatus(item,index)" v-if="!moveshow">修改</button>
            </td>
          </tr>
        </table>
      </div>
      <!-- 分页 -->
      <!-- <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging> -->
      <!--添加对话框-->
      <div class="popBox" v-if="addshow">
        <div class="formContainer">
          <form>
            <ul>
              <li>
                <label for="realname">姓名</label>
                <input id="realname" name="realname" type="text" v-model="MemberInfo.username">
                <!-- <span v-show="errors.has('nickname')" class="help">{{ errors.first('nickname') }}</span> -->
              </li>
              <li>
                <label for="stuid">学号</label>
                <input id="realname" name="realname" type="text" v-model="MemberInfo.stuid">
              </li>
              <li>
                <label for="school">学校</label>
                <!-- v-model="chooseStatus" -->
                <select name="school" id="school" class="dealSelectCss" v-model="selectschool">
                  <option>长沙理工大学</option>
                  <option>华南理工大学</option>
                </select>
              </li>
              <li>
                <label for="telphone">联系方式</label>
                <input v-validate="'required|telphone'" id="telphone" name="telphone" type="text" v-model="MemberInfo.telphone">
                <span v-show="errors.has('telphone')" class="help">{{ errors.first('telphone') }}</span>
              </li>
              <li>
                <label for="pwd">密码</label>
                <input v-validate="'required|pwd'" id="pwd" name="pwd" type="text" v-model="MemberInfo.password">
                <span v-show="errors.has('pwd')" class="help">{{ errors.first('pwd') }}</span>
              </li>
              <li>
                <label for="department">部门</label>
                <!-- v-model="chooseStatus" -->
                <select name="department" id="department" class="dealSelectCss" v-model="selectdepartment">
                  <option>前端部门</option>
                  <option>后台部门</option>
                  <option>安卓部门</option>
                  <option>运营部门</option>
                </select>
              </li>
            </ul>
          </form>
          <button class="confirmBtn" style="margin-left:30%;" @click="AddConfirmBtn">确认</button>
          <button class="cancelBtn" @click="CancelBtn">取消</button>
    </div>
      </div>
      <!--修改对话框-->
      <div class="popBox" v-if="popshow">
        <div class="formContainer">
          <form action="">
            <ul>
              <li>
                <label for="realname">姓名</label>
                <input id="realname" name="realname" type="text" v-model="clickMemberInfo.username">
              </li>
              <li>
                <label for="stuid">学号</label>
                <input id="realname" name="realname" type="text" v-model="clickMemberInfo.stuid">
              </li>
              <li>
                <label for="school">学校</label>
                <!-- v-model="chooseStatus" -->
                <select name="school" id="school" class="dealSelectCss" v-model="selectschool">
                  <option>长沙理工大学</option>
                  <option>华南理工大学</option>
                </select>
              </li>
              <li>
                <label for="telphone">联系方式</label>
                <input id="telphone" name="telphone" type="text" v-model="clickMemberInfo.telphone">
              </li>
              <!-- <li>
                <label for="password">密码</label>
                <input id="password" name="password" type="text" :value="clickMemberInfo.password">
              </li> -->
              <li>
                <label for="department">部门</label>
                <!-- v-model="chooseStatus" -->
                <select name="department" id="department" class="dealSelectCss" v-model="selectdepartment">
                  <option>前端部门</option>
                  <option>后台部门</option>
                  <option>安卓部门</option>
                  <option>运营部门</option>
                </select>
              </li>
            </ul>
          </form>
          <button class="confirmBtn" style="margin-left:30%;" @click="ConfirmBtn()">确认</button>
          <button class="cancelBtn" @click="CancelBtn">取消</button>
    </div>
  </div>
    </div>
</template>

<script>
import axios from 'axios'
// import paging from '../../paging/paging'
import { connect } from 'net';
import { fail } from 'assert';
import { fips } from 'crypto';
    export default {
        name: "index",
        // components: {
        //   paging
        // },
        data () {
          return {
            // excel
            moveid: [],
            file: {
              name: '',
              size: '',
              uploadPercentage: 0,
              uploadStatus: 0
            },
            changeid: 0,
            uploadSuccess: 0,
            MemberInfo: new Object(),
            selectdepartment: '',
            selectschool: '',
            stulist: [
              { userid: '0', school: '长沙理工大学', stuid: '201616080202', username: '曾会', telphone: '18613998347', department: '前端部门' },
              { userid: '1', school: '长沙理工大学', stuid: '201616080203', username: '曾会', telphone: '18613998347', department: '前端部门' },
              { userid: '2', school: '长沙理工大学', stuid: '201616080204', username: '曾会', telphone: '18613998347', department: '前端部门' },
              { userid: '3', school: '长沙理工大学', stuid: '201616080204', username: '曾会', telphone: '18613998347', department: '前端部门' }
            ],
            // department: this.clickMemberInfo,
            // itemid = 0,
            checked: false,
            addshow: false,
            moveshow: false,
            popshow: false,
            loadshow: false,
            clickMemberInfo: new Object()
          }
        },
        watch:{
          checkModel(){
            if(this.moveid.length == this.list.length){
              this.checked=true;
            }else{
              this.checked=false;
            }
          }
        },
        methods: {
          // 上传文件
          handlerUpload (e) {
            // 获取选定的文件
            var $target = e.target || e.srcElement
            let tFiles = $target.files[0]
            let supportedTypes = ['xls', 'xlsx']
            console.log($target)
            // if( typeof($target) === 'undefined' ) {
            //   console.log ('只支持 xls、xlsx 格式的文件 ')
            //   this.file.uploadStatus = -2
            //   return false
            // } else
            this.loadshow = true
            if( $target && supportedTypes.indexOf(tFiles.name.split('.')[1]) >= 0 ){ // 判断文件类型
              //判断文件大小
              if( tFiles.size <= 2097152 ){
                this.file.name = tFiles.name
                this.file.uploadPercentage =  1
                this.file.size = this.formatFileSize(tFiles.size,0)
                this.file.uploadStatus = 0
                // 开始上传文件，新建一个formData
                let param = new FormData()
                // param.append("name","wiiiiiiiiiinney")
                // 通过append 向form 对象添加数据
                param.append("file",tFiles)
                // formdata 私有类对象，访问不到，可以通过 get 判断值是否传进去
                console.log(param.get("file"))
                // 配置
                let config = {
                  headers: {
                    "Content-Type" : "multipart/form-data"
                  },
                  // 添加上传进度监听事件
                  onUploadProgress: e => {
                    var completeProgress = ((e.loaded / e.total * 100) | 0) + "%"
                    console.log(this.file)
                    this.file.uploadPercentage = completeProgress;
                  }
                }
                // 通过axios上传文件
                let that = this
                this.file.uploadStatus = 1
                axios.post('url',param,config).then(function(result){
                  console.log(result)
                  that.file.uploadStatus = 2
                  that.loadshow = false
                }).catch(function(err){
                  console.log(err)
                  // console.log('xixi')
                  that.file.uploadStatus = -1
                  // console.log('xixi')
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
          // 下载文件
          handlerDownload () {
            axios({
              method: 'get',
              url: 'cbctp.top:8080/excel/downloadRegisterTemplate',
              headers: {
                userid: '',
                token: ''
              },
              // data: {
              //   firstName: 'Fred',
              //   lastName: 'Flintstone'
              // },
              responseType: 'blob'
            }).then(response => {
              this.download(response)
            }).catch((error) => {
              console.log(error)
            })
          },
          download (data) {
            if (!data) {
              return
            }
            let url = window.URL.createObjectURL(new Blob([data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', 'excel.xlsx')
            document.body.appendChild(link)
            link.click()
          },
          // 显示添加对话框
          addMember () {
            this.addshow = true
          },
          // 增加会员函数
          AddConfirmBtn () {
            // console.log('xixi')
            let that = this
            this.$validator.validateAll().then(function(result) {
              if (result) {
            that.MemberInfo.department = that.selectdepartment
            that.MemberInfo.school = that.selectschool
            console.log(that.MemberInfo)
            axios({
              method: 'post',
              url: 'cbctp.top:8080/addClubMember',
              headers: {
                userId:'',
                token:''
              },
              data: that.MemberInfo
            }).then(function(result){
              if (result.code === '200') {
                alert('添加成功！')
              }
            }).catch(function(err){
              console.log(err)
            })
            // console.log('xixi')
            that.selectdepartment = ''
            that.selectschool = ''
            that.MemberInfo = {}
            that.addshow = false
                alert('修改成功！')
              } else {
                alert('请重新核对信息！')
              }
            })
          },
          //
          //
          // 显示修改对话框
          dealChangeStatus (item,index) {
            this.selectdepartment = item.department
            this.selectschool = item.school
            this.itemid = item.id
            this.clickMemberInfo.id = item.id
            this.clickMemberInfo.index = index + 1
            this.clickMemberInfo.username = item.username
            this.clickMemberInfo.stuid = item.stuid
            this.clickMemberInfo.telphone = item.telphone
            this.popshow = true
            this.changeid = item.id
          },
          // 修改会员信息
          ConfirmBtn () {
            let that = this
            for(let i = 0; i<this.stulist.length; i++){
              if(this.stulist[i].id === this.changeid){
                this.stulist[i].school = this.selectschool
                this.stulist[i].department = this.selectdepartment
                this.stulist[i].stuid = this.clickMemberInfo.stuid
                this.stulist[i].username = this.clickMemberInfo.username
                this.stulist[i].telphone = this.clickMemberInfo.telphone
                console.log(this.stulist[i])
              }
            }
            // axios({
            //   methods: "post",
            //   url:"",
            //   params:{
            //     //将id和新的state进行修改
            //     id : this.changeid,
            //     // state : this.chooseStatus
            //   }
            // }).then((res)=>{
            //   //  更改成功

            // }).catch((error)=>{
            //   alert("error");
            // })
            this.changeid = 0
            this.clickMemberInfo = {}
            this.selectdepartment = ''
            this.selectschool = ''
            this.popshow = false
          },
          // 取消按钮
          CancelBtn () {
            this.selectdepartment = ''
            this.selectschool = ''
            this.addshow = false
            this.popshow = false
          },
          // 全选
          checkAll(){
            if(this.checked){
              this.moveid=[];
            } else {
              this.stulist.forEach((item)=>{
                if(this.moveid.indexOf(item.userid)==-1){
                  this.moveid.push(item.userid)
                }
              })
            }
          },
          // 删除函数
          moveMember() {
            console.log(this.moveid)
            // 没有选择人员
            if (this.moveid.length === 0){
              alert('请选择要删除的人员！')
            } else {
              let that = this
              axios({
                methods: "post",
                url:"cbctp.top:8080/userManager/deleteUsers",
                headers: {
                  userid: '',
                  token: ''
                },
                // params:{
                //   //将id和新的state进行修改
                //   id : this.moveid,
                //   // state : this.chooseStatus
                // }
                data: that.moveid
              }).then((res)=>{
              // 删除成功
                if (res.code === '200') {
                  alert('删除成功')
                }
              }).catch((error)=>{
                alert(error);
              })
            }
          },
          // 查找
          search () {
            alert('xixi')
          }
        }
    }
</script>

<style scoped>
.manager{
    -webkit-text-size-adjust:none;
    margin: 30px;
    background: #fff;
    border-radius: 4px;
  }
  /*顶层样式*/
  .pos{
    padding: 20px 0 10px 40px;
    margin: 0;
  }
  /* .up-down{
    height: 60px;
  } */
  .inputfile{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .download,.upload{
    margin-left: 2px;
    float: left;
    width: 140px;
    height: 30px;
    border: 1px solid #ccc;
  }
  .fileBox label{
    color: #3e97df;
    padding-left:10px;
    line-height: 30px;
  }
  .filePart{
    line-height: 30px;
    overflow: hidden;
    float: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    height: 20px;
  }
  .fileStatus {
    overflow: hidden;
    float: left;
    height: 20px;
    font-size: 10px;
    line-height: 20px;
  }
  .ml10 {
    margin-left: 10px;
  }
  .fileName {
    margin: 0 50px 5px 0;
    width: 200px;
  }
  .fileSize {
    text-align: center;
  }
  .uploadFail {
    color: #ff0800d3;
  }
  .uploadSuccess {
    color: #2c832c;
  }
  /*对应CSS*/
  .progress {
    position: relative;
    width: 95%;
    height: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    /*注意这里*/
    box-shadow: 0 0 1px 0px #ddd inset;
  }
  .progress span {
    position: absolute;
    display: inline-block;
    width: 1%;
    height: 100%;
    background-color: #3e97df;
  }
  /* 功能样式 */
  .fuctionbox{
    height: 50px;
    margin: 10px 0 10px 30px;
  }
  .fuctionbox .addbtn,.searchbtn{
    border: none;
    outline: none;
    width: 100px;
    height: 40px;
    background-color: #3788EE;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .fuctionbox .searchbox{
    float: right;
    margin-right: 50px;
  }
  .fuctionbox .searchtext{
    outline: none;
    padding-left: 10px;
    border: 1px solid #f3f3f3;
    background-color: #fff;
    border-radius: 3px;
    height: 35px;
    width: 200px;
  }
  .fuctionbox .searchtext:focus{
    border: 1px solid #3788EE;
  }
  /*列表样式*/
  .tablebox{
    width: 95%;
    padding: 0 2%;
  }
  .table{
    width: 100%;
    border: 1px solid #F5F5F5;
  }
  .tablehead{
    height: 50px;
    background-color: #F5F5F5;
  }
  .column-head{
    width:18%;
  }
  .tablebody{
    height: 50px;
    font-size: 16px;
  }
  .operationBtn{
    border: none;
    outline: none;
    width: 80%;
    height: 30px;
    color: white;
    font-size: 16px;
    background-color: #3788EE;
    border-radius: 5px;
    margin-bottom: 2px;
    cursor: pointer;
  }
  .popBox{
    width: 50%;
    position: absolute;
    top: 10%;
    left: 20%;
    border: 1px solid #868585;
    border-radius: 10px;
    background-color: #f3f3f3;
  }
  .formContainer{
    padding: 5%;
    font-size: 18px;
  }
  .popBox li{
    height: 70px;
    margin-left: 15%;
  }
  .popBox li label{
    float: left;
    padding-right: 20px;
    display: block;
    width: 75px;
  }
  .popBox li span{
    display: block;
    color:#ff0000;
    font-size: 12px;
    text-align: center;
  }
  .popBox li select{
    padding-left: 10px;
    border: 1px solid #f3f3f3;
    background-color: #fff;
    border-radius: 3px;
    height: 30px;
    width: 60%;
  }
  .popBox li input[type="text"]{
    padding-left: 10px;
    border: 1px solid #f3f3f3;
    background-color: #fff;
    border-radius: 3px;
    height: 30px;
    width: 57%;
  }
  .popBox li input[type="text"]:focus{
    outline: none;
    border: 1px solid #3788EE;
  }
  .confirmBtn,.cancelBtn{
    border: none;
    outline: none;
    width: 100px;
    height: 40px;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  .confirmBtn{
    background-color: #3788EE;
  }
  .cancelBtn{
    background-color: #727272;
  }
</style>
