<template>
    <div class="uerinfobox">
      <div class="leftbox">
        <div class="head-sculpture">
          <ul class="headlist">
            <li><img src="http://www.gokisun.top/avatar.jpg"></li>
            <li class="head-item">曾会</li>
            <li class="head-item">执着于追求，纯粹于当下</li>
          </ul>
        </div>
        <ul class="baseinfo">
          <li><i class="iconfont">&#xe613;</i>Example@eamil.com</li>
          <li><i class="iconfont">&#xe613;</i>长沙理工大学</li>
          <li><i class="iconfont">&#xe613;</i>这里是联系方式</li>
        </ul>
      </div>
      <div class="rightbox">
        <header class="header">
          <span class="header-con">基本设置</span>
          <!-- <img class="avatar" src="http://www.gokisun.top/avatar.jpg" alt="avatar"> -->
        </header>
        <form class="detailbox">
          <ul class="detail-list">
            <li class="detail-item" style="height:150px;">
              <label for="hsculpture">头像</label>
              <img id="hsculpture" name="hsculpture" src="http://www.gokisun.top/avatar.jpg" alt="头像">
            </li>
            <li class="detail-item necessary-item">
              <ul class="necessary">
                <li class="n-mark"><span>*</span></li>
                <li>
                  <label for="name">昵称</label>
                  <input type="text" id="name" name="name" required autofocus>
                  <!-- placeholder="请输入用户名" -->
                </li>
              </ul>
            </li>
            <li class="detail-item necessary-item">
              <ul class="necessary">
                <li class="n-mark"><span>*</span></li>
                <li>
                  <label for="pwd changepwd">密码</label>
                  <input type="text" id="pwd" name="pwd">
                  <input type="button" id="changepwd" name="changepwd" value="修改密码">
                </li>
              </ul>
            </li>
            <li class="detail-item">
              <label for="realname">真实姓名</label>
              <input type="text" id="realname" name="realname">
            </li>
            <li class="detail-item">
              <label for="sign">签名</label>
              <input type="text" id="sign" name="sign">
            </li>
            <li class="detail-item">
              <label for="telphone">手机</label>
              <input type="text" id="telphone" name="telphone">
            </li>
            <li class="detail-item">
              <label for="qnum">QQ</label>
              <input type="text" id="qnum" name="qnum">
            </li>
            <li class="detail-item">
              <label for="school">学校</label>
              <input type="text" id="school" name="school">
            </li>
            <li class="detail-item">
              <label for="department">部门</label>
              <input type="text" id="department" name="department">
            </li>
            <li class="detail-item">
              <label for="stuid">学号</label>
              <input type="text" id="stuid" name="stuid">
            </li>
          </ul>
        </form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "userInfo"
    }
</script>

<style scoped>
.uerinfobox{
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
  margin-bottom: 30px;
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
.uerinfobox .detailbox .detail-item{
  position: relative;
  width: 500px;
  height: 70px;
  margin-left: 50px;
}
.uerinfobox .detailbox .necessary-item{
  position: relative;
  margin-left: 35px;
}
.uerinfobox .detailbox .necessary .n-mark{
  line-height: 30px;
  color: #ff0000;
  width: 15px;
}
.uerinfobox .detailbox .detail-item li{
  float: left;
}
.uerinfobox li label{
  color: #747474;
  font-size: 20px;
  float: left;
  width: 100px;
}
.uerinfobox li input[type=text]{
  border: 1px solid #f3f3f3;
  height: 30px;
  width: 250px;
  border-radius: 3px;
}
.uerinfobox li input[type=button]{
  border: none;
  height: 35px;
  width: 100px;
  border-radius: 3px;
  background-color: #3088FE;
  color: #FFF;
  margin-left: 20px;
}
.uerinfobox li input[type=button]:hover{
  background-color: #747474;
  transition: all ease 0.4s;
}
</style>
