<template>
  <div>
  <div>
	        <nav id="nav" class="top1">  
   
        <ul class="top2">
            <a href="#"><li class="top3" style="color: #EF3445;font-size: 24px;margin-right: 50px;">Cooca</li></a>
            <a href="#home"><li class="top3">首页</li></a>
	            <a href="#tech"><li class="top3">新闻资讯</li></a>
	            <a href="#gao"><li class="top3">高校阵营</li></a>
	            <a><li class="top3" @click="tabchange">俱乐部夏令营</li></a>
				<a href="#shi"><li class="top3">实践空间站</li></a>
				<a href="#link"><li class="top3">线上课堂</li></a>
				<a href="#guan"><li class="top3">关于我们</li></a>
				<a href="#"><li class="top3">登录注册</li></a>
        </ul>
        </nav>
			
	   </div>
     
  <bodyContainer>
    <div v-show="show">
      <topbox></topbox>
      <word></word>
      <carousel></carousel>
      <try1></try1>
      <onlineclass></onlineclass>
      <about></about>
    </div>
    <div v-show="!show">
      <gallery></gallery>
    </div>
  </bodyContainer>
  </div>
</template>

<script>
import headBox from './head.vue'
import topbox from './top.vue'
import word from './slide_w.vue'
import carousel from './carousel.vue'
import try1 from './try1.vue'
import onlineclass from './onlineclass.vue'
import about from './about.vue'
import gallery from '../../gallery/gallery/gallery'

    export default {
        name: 'home',
        data () {
          return {
            newslist: [],
          show: true
          }
        },
        // name: 'topbox',
        components: {
           headBox,
           topbox,
           word,
           carousel,
           try1,
           onlineclass,
           about,
           gallery
        },
        methods: {
          get (){
            let that = this
            axios({
              method: 'get',
              url: 'cbctp.top:8080/category/showAll'
            }).then(function(result){
              if(result.data.status === '200'){
                that.nsewslist = result.categoryName
                console.log()
              } else {
                console.log('sss')
              }
            }).catch(function(err){
              console.log(err)
            })
          },
          tabchange() {
            this.show=!this.show
            console.log(this.show)
          }
        }
    }      
</script>

<style scoped>
  html,
body {
	background-color: white;
	height: 100%;
	align-items: center;
	text-align: center;
	justify-content: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
*{margin:0px;}
    a{text-decoration:none;}
    header,section,footer{width:1200px;margin:auto;}
    .top1{
        width:100%;
        height:38px;
        line-height:38px;
        background-color:white;
        color:white;   
		 z-index: 4;
    }
    .top1 div{
        width:1200px;
		margin-left: -1%;/*导航栏位置*/
    }
    .top1 ul li{
		
		list-style-type:none;
        display:inline;
        padding:6px 30px;      
    }
    .top1 a{color:darkgrey;}
    .top1 li:hover
	{
	position: relative;
    font-size: 16px;
    transition: 0s all linear;
    cursor: pointer;
	}
	.top3::before {
		margin-left: 2px;
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    width: 0;
    height: 32px;
    border-bottom: 2.5px solid #f36533;
	}

.top3:hover::before {
    width: 100%;
    top: 0;
    left: 0;
    transition-delay: 0s;
    border-bottom-color: #f36533;
    z-index: -1;
}

.top3:hover ~ li::before {
    left: 0;
}

.top3:active {
    background: #fff;
    color: #f36533;
}
</style>
