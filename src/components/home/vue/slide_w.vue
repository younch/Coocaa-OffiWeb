<template>
<div>
    <div>
			<div class="Carousel1" id="tech"><!--文字轮播图-->
			<div class="frame2">
					<span class="news">新闻资讯</span>
				</div>
			<hr style="text-align:center;height:300px;border:none;border-top:3px solid tomato;width:90%;margin: auto;" />
			<img class="slide1" src="../img/slide_w.png" />
					<div class="slide_w">
						<span class="title" style="color: #EF3445; font-size: 38px;margin-left: 390px;">What's News</span>
						<hr style="margin-top:15px;height:20px;border:none;border-top:2px solid lightgrey;width:370px;margin-left: 330px;" />
								</div>
								<div class="inslide">
								<ul class="ul">
									<li>1.1111111111111111111111111111</li>
									<li>2.2222222222222222222222222222</li>
									<li>3.3333333333333333333333333333</li>
									<li>4.4444444444444444444444444444</li>
									<li>5.5555555555555555555555555555</li>
									<li>6.6666666666666666666666666666</li>
									<li>1.1111111111111111111111111111</li>
									<li>2.2222222222222222222222222222</li>
									<li>3.3333333333333333333333333333</li>
									<li>4.4444444444444444444444444444</li>
									<li>5.5555555555555555555555555555</li>
									<li>6.6666666666666666666666666666</li>
									<li>1.1111111111111111111111111111</li>
									<li>2.2222222222222222222222222222</li>
									<li>3.3333333333333333333333333333</li>
									<li>4.4444444444444444444444444444</li>
									<li>5.5555555555555555555555555555</li>
									<li>6.6666666666666666666666666666</li>
									<li>1.1111111111111111111111111111</li>
									<li>2.2222222222222222222222222222</li>
									<li>3.3333333333333333333333333333</li>
									<li>4.4444444444444444444444444444</li>
									<li>5.5555555555555555555555555555</li>
									<li>6.6666666666666666666666666666</li>
								</ul>
								</div>
</div>		
			</div>
			<div class="slide_p" style="width:1200px;height: 265px;margin: 50px auto;position: relative;margin-bottom: 200px;">
				<span class="title1" id="gao" style="position: absolute; color: white;border: 3px solid #f4551d;width: 180px;height: 50px;left: 47%;margin-top: 940px;z-index: 3; background: #f4551d;">高校阵营</span>
				<div class="pre_banner_3d">
				       
				        <div class="banner_tree">
				            
				            <div class="left_btn color_font">&lt;</div>
				            <div class="right_btn color_font">&gt;</div>
				            <ul class="show_s_ui">
				                <li>
				                    <img src="../img/test.jpg" alt="">
				                </li>
				                <li>
				                    <img src="../img/test.jpg" alt="">
				                </li>
				                <li>
				                    <img src="../img/test.jpg" alt="">
				                </li>
				                <li>
				                    <img src="../img/test.jpg" alt="">
				                </li>
				                <li>
				                    <img src="../img/test.jpg" alt="">
				                </li>
				                <li>
				                    <img src="../img/test.jpg" alt="">
				                </li>
				                <li>
				                    <img src="../img/test.jpg" alt="">
				                </li>
				                <li>
				                    <img src="../img/test.jpg" alt="">
				                </li>
				            </ul>
				        </div>
				    </div>
			</div>
			
				<div class="inner"  style="width:1200px;height: 265px;margin: 50px auto;position: relative;margin-bottom: 200px;">
					<div id="carousel">
				<hr style="height:1px;border:none;border-top:380px solid #f4551d;width:800px;margin-top: 660px;margin-left: 200px; margin-bottom: 100px;" />
				
				
					</div>
			</div>
            </div>
</template>
<script>
	
	import jquery from '../js/jquery.min.js';
	import index1 from '../js/index1';
export default {
	name: 'word'
}
</script>
<style>
.news {
	position: relative;
	top: 10%;
	font-size: 40px;
	color: #f46130;
	text-align: center;
}

.frame2 {
	position: absolute;
	border: 3px solid #f46130;
	width: 292px;
	height: 65px;
	margin-left: 40.97%;
	margin-top: -28px;
	background: white;
}

	.slide1{
	 position: relative;
	 margin-left: 22%;
	 margin-top:-200px;
	 width: 400px;
 }
.slide_w{
	margin-top: -354px;;
	margin-left: 28.2%;
	width:730px;
	height: 346.8px;
	border: 1px solid lightgrey;
	overflow: hidden;
	margin-bottom: 100px;
	box-shadow: 0 0 7px lightgrey;
	border-left: none;
			}
			.inslide{
				margin-top: -354px;;
				margin-left: 34.2%;
				width:630px;
				height: 236.8px;
				overflow: hidden;
				margin-bottom: 130px;
			}
			.ul li{
				margin-left: 295px;
				list-style:none;
				width: 300px;
				height: 42px;
			}
			.ul {
				position: relative;
				width: 20px;
				height:220px;
				transition: all 3s;
				margin-top: -3px;
				animation:aaa 20s infinite 3s running;
			}
			@keyframes aaa {
				0% {
				transform:translatey(0px);
			}
			35% {
				transform:translateY(-250px);
			}
			70% {
				transform:translateY(-500px);
			}
			100% {
				transform:translateY(-750px);
			}
			}
			.ul:hover {
				animation-play-state:paused;
				cursor:pointer;
			}
			#box{
    width: 79px;
    height: 34px;
    /*background-color: red;*/
    margin: 0 auto;
    position: relative;
}
.pre_banner_3d a{
    text-decoration: none;
    border:none;
}
body{
	
    overflow-x: hidden;
}
.pre_banner_3d{
    margin:auto;
    width:1000px;
    height:1380px;
    position:relative;
	top: 1000px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.contrves{
    width:100%;
    height:auto;
    position:absolute;
    
}
.nav_banners{
    width:100%;
    height:auto;
    border-bottom: 1px solid #f2f2f2;
    display:-webkit-box;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content:space-between;
}
.nav_banners>li{
    display:inline-block;
    padding:5px 16px;
    margin:12px 0;
    border-radius: 5px;
    font-size:14px;
    cursor: pointer;
}

.blue_nav{
    background:#63B504;
    color:#000;
}

.color_font{
    background:#f4551d;
    color:#fff;
    width: 45px;
    height: 100px;
    font-size:24px;
    text-align: center;
    line-height: 100px;
    border-radius: 5px;
    font-weight: 700;
    position:absolute;
    top:0;bottom:0;
    margin:auto;
	margin-top: 60px;
	margin-left: 10%;
    z-index: 3;
    cursor: pointer;
}

.left_btn{
    left:0;
}
.right_btn{
	position: absolute;
    right:10%;
}
.show_s_ui{
    width:100%;
    height:100%;
    position:relative;
	margin-top: -1010px;
}
.show_s_ui>li{
    width:215px;
    height:202px;
    position:absolute;
    top:0;
    bottom:0;
    margin:auto;
    z-index: 3;
    cursor: pointer;
	margin-top: 10px;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);
    opacity: 0;
    font-size:40px;
}
.show_s_ui>li>div{
    position: absolute;
    top:0;
    width:100%;
    height:100%;
    background:#fff;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=90);
    opacity: 0.9;
    display:none;
}
.show_s_ui>li>img{
    width:100%;
    height:100%;
}
#middel_shows{
    width:200px;
    height:250px;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=100);
    left:38.4%;
    opacity:1;
}
#left_shows{
    left:16%;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);
    opacity: 0.6;
}
#right_shows{
    left:59%;
    opacity: 0.6;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);
}
#small_left,#small_right{
    width:154px;
    height:249px;
    opacity: 0;
    filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);
}
#small_left{
    left:-15%;
}
#small_right{
    left:100.5%;
}
@media screen and (max-width:1200px){
    .pre_banner_3d {width:1024px;height:763px;}
    #middel_shows {left: 35.5%;}
    .show_s_ui>li { width: 175px;height: 282px;}
    #small_left, #small_right {width: 131px;height: 194px;}
}
@media screen and (max-width:1024px){
    .pre_banner_3d {width: 875px;height: 765px;}
    .show_phone_s {width: 375px;height: 667px;}
    #middel_shows {left: 34.8%;}
    #middel_shows {width: 267px;height: 457px;}
}
@media screen and (max-width:879px){
    .pre_banner_3d {width: 746px;height: 735px;}
    #middel_shows {left: 31.8%;}
    #middel_shows {width: 269px;height: 457px;}
    .show_s_ui>li {width: 145px;height: 232px;}
}
@media screen and (max-width:768px){
    .pre_banner_3d {width: 675px;height: 586px;}
    .show_phone_s {width: 320px;height: 568px;}
    #middel_shows {left: 33.1%;}
    #middel_shows {width: 227px;height: 389px;}
    .show_s_ui>li {width: 138px;height: 215px;}
    #right_shows {left: 72%;}
    .banner_tree {height: 539px;}
}
@media screen and (max-width:685px){
    .color_font{display:none}
    #small_left {left: -55%;}
    .pre_banner_3d {width: 520px;}
    #small_right {left: 109.5%;}
    .show_phone_s {width: 300px;height: 496px;}
    #middel_shows {left: 29.7%;}
    #middel_shows {width: 213px;height: 340px;}
    #left_shows {left: 0%;}.show_s_ui>li {width: 106px;height: 190px;}
    #right_shows {left: 79.5%;}
}
@media screen and (max-width:521px){
    .pre_banner_3d {width: 359px;}
    #left_shows {left: -41%;}
    #right_shows {left: 107.5%;}
    #middel_shows {left: 20.4%;}
    #middel_shows {width: 214px;height: 340px;}
    .show_phone_s {width: 349px;height: 568px;}
    #middel_shows {left: 15.5%;}
    #middel_shows {width: 246px;height: 390px;}
}
@media screen and (max-width:359px){
    .pre_banner_3d {width: 320px;}
    .show_phone_s {width: 320px;height: 520px;}
    #middel_shows {left: 14.5%;}
    #middel_shows {width: 228px;height: 356px;}
}
</style>
