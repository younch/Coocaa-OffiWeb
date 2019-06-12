<template>
    <div class="uerinfobox">
      <div class="leftbox">
        <div class="head-sculpture">
          <ul class="headlist">
            <li><img :src="userInfo.avatar"></li>
            <li class="head-item">{{ nickname }}</li>
           </ul>
           <a style="font-size:12px;" href="#">修改昵称</a>
           <a style="font-size:12px;" href="#" @click.prevent="change = true">修改密码</a>
        </div>
        <ul class="baseinfo">
          <li><i class="iconfont">&#xe613;</i>{{ email }}</li>
          <li><i class="iconfont">&#xe613;</i>{{ school }}</li>
          <li><i class="iconfont">&#xe613;</i>{{ telphone }}</li>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="rightbox">
        <header class="header">
          <span class="header-con">基本设置</span>
          <!-- <img class="avatar" src="http://www.gokisun.top/avatar.jpg" alt="avatar"> -->
        </header>
        <form class="detailbox">
          <ul class="detail-list">
            <li class="detail-item" style="height:150px;">
              <label for="hsculpture">头像</label>
              <!-- <img id="hsculpture" name="hsculpture" src="http://www.gokisun.top/avatar.jpg" alt="头像">
              <input type="button" value="更换头像"> -->
              <div class="item_bock head_p">
                <div class="head_img">
                  <img id="hsculpture" :src="userInfo.avatar"/><!-- <--图片地址动态绑定-->
                </div>
                <div class="setting_right" @click.stop="uploadHeadImg()">
                  <div class="caption">更改头像</div>
                </div>
                <input type="file" @change.prevent="handleFile($event)" class="hiddenInput"/>
              </div>
            </li>
            <!-- <li class="detail-item necessary-item">
              <ul class="necessary">
                <li class="n-mark"><span>*</span></li>
                <li>
                  <label for="nickname">昵称</label>
                  <input v-validate="'required|max:5'" type="text" id="nickname" name="nickname" v-model="nickname" required autofocus>
                  <span v-show="errors.has('nickname')" class="help">{{ errors.first('nickname') }}</span>
                </li>
              </ul>
            </li> -->
            <!-- <li class="detail-item necessary-item">
              <ul class="necessary">
                <li class="n-mark"><span>*</span></li>
                <li>
                  <label for="pwd changepwd">密码</label>
                  <input v-validate="'required|pwd'" type="text" id="pwd" name="pwd" v-model="password">
                  <span v-show="errors.has('pwd')" class="help">{{ errors.first('pwd') }}</span>
                </li>
              </ul>
            </li> -->
            <li class="detail-item">
              <label for="realname">真实姓名</label>
              <input type="text" class="disabled" id="realname" name="realname" disabled="disabled" v-model="username">
            </li>
            <!-- <li class="detail-item">
              <label for="sign">签名</label>
              <input v-validate="'max:15'" type="text" id="sign" name="sign" v-model="autograph">
              <span v-show="errors.has('sign')" class="help">{{ errors.first('sign') }}</span>
            </li> -->
            <li class="detail-item">
              <label for="telphone">联系方式</label>
              <input type="text" id="telphone" name="telphone" v-model="telphone">
              <!-- :class="{'input': true, 'is-danger': errors.has('phone') }" -->
              <input type="button" value="修改联系方式" @click="changeTel">
              <!-- <span v-show="errors.has('telphone')" class="help">{{ errors.first('telphone') }}</span> -->
            </li>
            <!-- <li class="detail-item">
              <label for="qnum">QQ</label>
              <input type="text" id="qnum" name="qnum" v-model="Qnum">
            </li> -->
            <li class="detail-item">
              <label for="email">邮箱</label>
              <input v-validate="'email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" id="email" name="email" v-model="email">
              <input type="button" value="修改邮箱" @click="changeTel">
              <!-- <span v-show="errors.has('email')" class="help">{{ errors.first('email') }}</span> -->
            </li>
            <li class="detail-item">
              <label for="school">学校</label>
              <input type="text" class="disabled" id="school" name="school" disabled="disabled" v-model="school">
            </li>
            <li class="detail-item">
              <label for="department">部门</label>
              <input type="text" class="disabled" id="department" name="department" disabled="disabled" v-model="department">
              <!--  v-model="department" -->
            </li>
            <li class="detail-item">
              <label for="stuid">学号</label>
              <input type="text" class="disabled" id="stuid" name="stuid" disabled="disabled" v-model="stuid">
              <!--  v-model="stuid" -->
            </li>
            <!-- <li class="detail-item">
              <input type="submit" value="保存" @click.prevent="submitInfo()">
            </li> -->
          </ul>
        </form>
      </div>
      <!-- 修改密码 -->
        <div class="tab"  v-if="change">
        <ul class="tab-head">
          <li @click="cut(0)">旧密码</li>
          <li @click="cut(1)">邮箱验证</li>
          <li @click="cut(2)">手机验证</li>
        </ul>
        <!-- 修改密码内容部分 -->
        <div class="tab-content">
          <!-- 旧密码 -->
          <div class="tab-item pwdbox" v-if="current === 0">
            <ul class="verify-input">
              <li>
                <label for="oldpwd">旧密码</label>
                <input name="oldpwd" type="text">
              </li>
              <li>
                <label for="newpwd">新密码</label>
                <input name="newpwd" type="text">
              </li>
              <li>
                <label for="pwd">确认新密码</label>
                <input name="pwd" type="text">
              </li>
              <li>
                <input type="button" value="提交">
                <input type="button" style="background-color:red;" value="取消" @click="cancel">
              </li>
            </ul>
          </div>
          <!-- 邮箱 -->
          <div class="tab-item emailbox" v-if="current === 1">
            <ul>
              <!-- 发送邮件 -->
              <li v-if="checkmail">
                <ul class="verify-input" style="margin-top:15%;">
                  <li>
                    <label for="email">绑定的邮箱</label>
                    <input name="email" type="text">
                  </li>
                  <li>
                    <input type="button" style="width:90px;" value="获取验证码" @click="checkemail()">
                    <input type="button" style="background-color:red;" value="取消" @click="cancel">
                  </li>
                </ul>
              </li>
              <!-- 得到验证码 -->
              <li v-if="!checkmail">
                <ul class="verify-input">
                  <li>
                    <label for="test">验证码</label>
                    <input name="test" type="text">
                  </li>
                   <li>
                    <label for="newpwd">新密码</label>
                    <input name="newpwd" type="text">
                  </li>
                  <li>
                    <label for="pwd">确认新密码</label>
                    <input name="pwd" type="text">
                  </li>
                  <li>
                    <input type="button" value="提交">
                    <input type="button" style="background-color:red;" value="取消" @click="cancel">
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- 手机 -->
          <div class="tab-item phonebox" v-if="current === 2">
            <ul>
              <!-- 发送邮件 -->
              <li v-if="checkphone">
                <ul class="verify-input" style="margin-top:15%;">
                  <li>
                    <label for="phone">绑定的手机</label>
                    <input name="phone" type="text">
                  </li>
                  <li>
                    <input type="button" style="width:90px;" value="获取验证码" @click="checktel">
                    <input type="button" style="background-color:red;" value="取消" @click="cancel">
                  </li>
                </ul>
              </li>
              <!-- 得到验证码 -->
              <li v-if="!checkphone">
                <ul class="verify-input">
                  <li>
                    <label for="test">验证码</label>
                    <input name="test" type="text">
                  </li>
                   <li>
                    <label for="newpwd">新密码</label>
                    <input name="newpwd" type="text">
                  </li>
                  <li>
                    <label for="pwd">确认新密码</label>
                    <input name="pwd" type="text">
                  </li>
                  <li>
                    <input type="button" value="提交">
                    <input type="button" style="background-color:red;" value="取消" @click.prevent="cancel">
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
  </div>
    </div>
</template>

<script>
import { connect } from 'net';
// import test from './test';
  // import axios from 'axios'
    export default {
        name: "userInfo",
        // components: {
        //   test
        // },
        data() {
          return {
            userInfo: {
              avatar: 'http://www.gokisun.top/avatar.jpg'
            },
            // changed: true,
            current: 0,
      change: false,
      checkmail: true,
      checkphone: true,
            // 控制修改密码的tab
            // current: 0,
            // 用户信息
            username: '曾会',
            email: '963233308@qq.com',
            school: '长沙理工大学',
            telphone: '18613998347',
            nickname: '蒲公英的雪',
            password: '123456',
            // Qnum: '963233308',
            department: '前端部门',
            stuid: '201616080202'
          }
        },
        methods: {
          checkemail(){
      this.checkmail = false
    },
    // 发送短信
    checktel (){
      this.checkphone = false
    },
    // 修改密码的取消按钮
    cancel (){
      this.change = false
      this.current = 0
      this.checkmail = true
      this.checkphone = true
    },
    // 修改密码的切换
    cut(index){
      this.current = index
      this.checkmail = true
      this.checkphone = true
    },
          // 打开图片上传
          uploadHeadImg () {
            this.$el.querySelector('.hiddenInput').click()
          },
          // 显示头像
          handleFile (e) {
            var $target = e.target || e.srcElement
            let file = $target.files[0]
            let supportedTypes = ['image/jpg', 'image/jpeg', 'image/png']
            let imageSize = file.size
            if( imageSize <= 256000 ){
              if( $target && supportedTypes.indexOf($target.files[0].type) >= 0 ){
                var reader = new FileReader()
                reader.onload = (data) => {
                  let res = data.target || data.srcElement
                  this.userInfo.avatar = res.result
                }
                reader.readAsDataURL(file)
              } else {
                alert ('只支持 jpg、jpeg、png 格式的图片 ')
              }
            } else {
              alert('上传的文件不能超过 250 KB ！')
            }
          },
          // 修改联系方式
          changeTel (){
            //
          },
          // 保存按钮
          // submitInfo(){
          //   console.log('xixi')
          //   this.$validator.validateAll().then(function(result) {
          //     if (result) {
          //       alert('修改成功！')
          //     } else {
          //       alert('请重新核对信息！')
          //     }
          //   })
          // }
        }
        // mounted () {
        // },
        // methods: {
        //   loadUserInfo () {
        //     let that = this
        //     axios ({
        //       method: 'get',
        //       url: 'http://203.195.133.72:8080/',
        //     }).then(function (result){
        //       if (result.data.status === '200'){
        //         console.log('成功获取数据')
        //       } else {
        //         console.log('Nothing')
        //       }
        //     }).catch(function (err){
        //       console.log(err)
        //     })
        //     return false
        //   }
        // }
    }
</script>

<style scoped>
.uerinfobox{
  -webkit-text-size-adjust:none;
  margin: 35px;
}
.leftbox{
  float: left;
  width:300px;
  height: 970px;
  background-color: #FFF;
}
.leftbox .head-sculpture{
  color: #777;
  text-align: center;
  margin: 40px 0 30px 0;
}
.leftbox .headlist .head-item{
  margin-top: 7px;
}
.leftbox .head-sculpture img{
  width: 140px;
  height: 140px;
  padding: 4px;
  border: 2px solid #f3f3f3;
  border-radius: 2px;
}
.leftbox .baseinfo{
  margin: 10px 0 0 60px;
}
.leftbox .baseinfo li{
  color: #777;
  height: 30px;
}
.leftbox .baseinfo i{
  margin-right: 8px;
}
/*  */
.rightbox{
  margin-left: 340px;
  width:640px;
  height: 970px;
  background-color: #FFF;
}
.rightbox .header{
  height: 70px;
  border-bottom:1px solid #f3f3f3;
  /* margin-bottom: 20px; */
}
.rightbox .header .header-con{
  display: block;
  margin-left: 30px;
  color: #3788EE;
  width: 140px;
  text-align: center;
  font-size: 25px;
  padding-top: 27px;
  padding-bottom: 10px;
  border-bottom: 3px solid #3788EE;
}
#hsculpture{
  border: 1px solid #F3F3F3;
  padding: 3px;
  width: 100px;
  height: 100px;
  border-radius: 3px;
}
.item_bock {
  display: flex;
}
.setting_right{
  position: relative;
  margin: 70px 0 0 15px;
}
.hiddenInput{
  display: none;
}
.caption{
  position: absolute;
  border: none;
  height: 35px;
  width: 100px;
  line-height: 35px;
  border-radius: 3px;
  background-color: #3088FE;
  margin-bottom: 10px;
  color: #FFF;
  text-align: center;
  cursor: pointer;
}
.uerinfobox .detailbox{
  margin-top: 30px;
}
.uerinfobox .detailbox .detail-item{
  position: relative;
  width: 500px;
  height: 65px;
  margin-left: 70px;
}
.uerinfobox .detailbox .detail-item .help{
  color: #ff0000;
  font-size: 10px;
  margin-left: 6px;
}
/* .uerinfobox .detailbox .necessary-item{
  position: relative;
  margin-left: 55px;
}
.uerinfobox .detailbox .necessary .n-mark{
  line-height: 30px;
  color: #ff0000;
  width: 15px;
} */
.uerinfobox .detailbox .detail-item li{
  float: left;
}
.detail-item label{
  color: #747474;
  font-size: 20px;
  float: left;
  width: 100px;
}
.uerinfobox .detail-item .disabled{
  border: none;
  background-color:#f3f3f3;
  color: #777;
}
.detail-item input[type=text]{
  padding-left: 10px;
  border: 1px solid #f3f3f3;
  background-color: #fff;
  height: 30px;
  width: 250px;
  border-radius: 3px;
}
.detail-item input[type=text]:focus{
  outline: none;
  border: 1px solid #3088FE;
  border-radius: 3px;
}
input[type=button]{
  border: none;
  height: 35px;
  width: 100px;
  border-radius: 3px;
  background-color: #3088FE;
  color: #FFF;
  float: right;
}
.detail-item input[type=submit]{
  border: none;
  height: 35px;
  width: 100px;
  border-radius: 3px;
  background-color: #3088FE;
  color: #FFF;
  display: block;
  margin: 0 auto;
  cursor: pointer;
}
.detail-item input[type=submit]:hover{
  background-color: #747474;
  transition: all ease 0.4s;
}
/* .changebox{
} */
.tab{
  width: 300px;
  height: 200px;
  /* border: 1px solid #f3f3f3; */
  margin: auto 100px;
  position: absolute;
  top: 30%;
  left: 30%;
  border: 1px solid #868585;
  border-radius: 10px;
  background-color: #f3f3f3;
}
.tab-head{
  height: 30px;
}
.tab-head li{
  float: left;
  height: 30px;
  width: 33.3%;
  text-align: center;
  padding-top: 6px;
  border-bottom: 1px solid #f3f3f3;
}
.tab-head li:hover{
  background-color: #f3f3f3;
  border-bottom: 2px solid #3788EE;
}
.tab-content{
  margin-top: 10px;
}
.tab-item ul li{
  /* width: 90%; */
  height: 35px;
}
.tab-item ul li label{
  /* display: block; */
  width: 80px;
  float: left;
  text-align: right;
  padding-right: 10px;
}
.tab-item input[type="text"]{
  outline: none;
  border:1px solid #f3f3f3;
  border-radius: 3px;
  height: 20px;
}
.tab-item input[type="text"]:focus{
  border-color: #3788EE;
}
.tab-item input[type="button"]{
  border: none;
  height: 25px;
  width: 50px;
  border-radius: 3px;
  background-color: #3088FE;
  color: #FFF;
  /* text-align: center; */
  margin-right: 23%;
}
/* .tab-item input[type="button"]:focus{
  border-color: #3788EE;
} */
.verify-input{
  margin: 20px 0 0 20px;
}
</style>
