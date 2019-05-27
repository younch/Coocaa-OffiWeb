<template>
    <div class="container">
      <div class="menu">
          <div class="slogan">Coocaa Admin</div>
          <ul class="menu-items" @click="menuChange">
              <li class="menu-item" data-id="0"><i class="iconfont">&#xe613;</i><span class="text">Dashboard</span></li>
              <li class="menu-item" data-id="1"><i class="iconfont">&#xe630;</i><span class="text">个人资料</span></li>
              <li class="menu-item" data-id="2"><i class="iconfont">&#xe665;</i><span class="text">人员管理</span></li>
              <li class="menu-item" data-id="3"><i class="iconfont">&#xe628;</i><span class="text">文章管理</span></li>
              <li class="menu-item" data-id="4"><i class="iconfont">&#xe60f;</i><span class="text">栏目管理</span></li>
              <li class="menu-item" data-id="5"><i class="iconfont">&#xe618;</i><span class="text">项目管理</span></li>
              <li class="menu-item" data-id="6"><i class="iconfont">&#xe607;</i><span class="text">报表统计</span></li>
              <li class="menu-item" data-id="7"><i class="iconfont">&#xe644;</i><span class="text">图册管理</span></li>
              <li class="menu-item" data-id="8"><i class="iconfont">&#xe664;</i><span class="text">言论管理</span></li>
          </ul>
      </div>
      <div class="content">
          <header class="header">
              <img class="avatar" src="http://www.gokisun.top/avatar.jpg" alt="avatar">
          </header>
<!--          组件切换-->
          <aritcle-manage v-if="menuStatus == 3"></aritcle-manage>
      </div>
    </div>
</template>

<script>
  import aritcleManage from '../articleManage/article'
    export default {
      name: "topBackstageIndex",
      components: {
        aritcleManage
      },
      data () {
        return {
          menuStatus: 0
        }
      },
      methods: {
        menuChange (e) {
          this.menuStatus = e.target.dataset.id
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
  min-width: 1260px;
}
.slogan{
  text-align: center;
  padding: 20px;
  margin-bottom: 30px;
}
.menu{
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
}
.text {
  font-size: 16px;
  padding:0 25px;
}
.menu-item:hover{
  background: #3788EE;
  color: #fff;
  cursor: pointer;
  transition: .5s;
}
.content{
  width: 85%;
  background: #F3F6F8;
}
.header{
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0 0 5px rgba(214, 214, 214, .8);
}
.avatar{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 10px;
  float: right;
  margin-right: 50px;
  cursor: pointer;
}
</style>
