<template>
    <div class="container">
      <div class="menu">
          <div class="slogan">Coocaa Admin</div>
          <ul class="menu-items" @click="menuChange">
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='0'}" data-id="0"><i class="iconfont">&#xe613;</i>Dashboard</li>
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='1'}" data-id="1"><i class="iconfont">&#xe630;</i>个人资料</li>
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='2'}" data-id="2"><i class="iconfont">&#xe665;</i>人员管理</li>
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='3'}" data-id="3"><i class="iconfont">&#xe628;</i>文章管理</li>
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='4'}" data-id="4"><i class="iconfont">&#xe60f;</i>栏目管理</li>
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='5'}" data-id="5"><i class="iconfont">&#xe618;</i>项目管理</li>
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='6'}" data-id="6"><i class="iconfont">&#xe607;</i>报表统计</li>
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='7'}" data-id="7"><i class="iconfont">&#xe644;</i>图册管理</li>
              <li :class="{'menu-item':'true'=='true',active:menuStatus=='8'}" data-id="8"><i class="iconfont">&#xe664;</i>言论管理</li>
          </ul>
      </div>
      <div class="main">
          <header class="header">
              <img class="avatar" src="http://www.gokisun.top/avatar.jpg" alt="avatar">
          </header>
<!--          组件切换-->
          <div class="content">
            <aritcle-manage v-if="menuStatus == 3"></aritcle-manage>
            <user-manage v-if="menuStatus == 2"></user-manage>
            <galleryManage v-if="menuStatus == 7"></galleryManage>
            <commentManage v-if="menuStatus == 8"></commentManage>
          </div>
      </div>
    </div>
</template>

<script>
  import aritcleManage from '../articleManage/article'
  import galleryManage from '../galleryManage/gallery'
  import commentManage from '../commentManage/comment'
  import userManage from '../userManage/user'
    export default {
      name: "topBackstageIndex",
      components: {
        aritcleManage,
        galleryManage,
        commentManage,
        userManage
      },
      data () {
        return {
          menuStatus: 8
        }
      },
      methods: {
        menuChange (e) {
          var newStatus = e.target.dataset.id
          this.menuStatus = newStatus ? newStatus : this.menuStatus
        }
      }
    }
</script>

<style scoped>
.container{
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 100%;
}
.slogan{
  text-align: center;
  padding: 20px;
  margin-bottom: 30px;
}
.menu{
  user-select: none;
  width: 15%;
  height: 100%;
  background: #001529;
  color: #fff;
  font-size: 24px;
}
.menu-items{
  color: #A6A8A9;
}
.menu-item{
  padding: 15px 35px;
  font-size: 16px;
}
.active{
  background: #3788EE;
  color: #fff;
}
.menu-item:hover{
  background: #3788EE;
  color: #fff;
  cursor: pointer;
  transition: .5s;
}
.main{
  position: relative;
  width: 85%;
  height: 100%;
  overflow: hidden;
  background: #F3F6F8;
}
.header{
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0 0 5px rgba(214, 214, 214, .8);
  text-align: right;
}
.avatar{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 10px;
  margin-right: 50px;
  cursor: pointer;
}
.content{
  height: calc(100% - 50px);
  margin-top: 2px;
  overflow-y: scroll;
}
</style>
