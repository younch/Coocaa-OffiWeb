<template>
    <div>			
			<div class="Carousel2" id="gain">
					<div class="frame1">
							<span class="news1">俱乐部夏令营</span>
						</div>
				<hr style="height:1px;border:none;border-top:4px solid tomato;width:1500px;width:90%;margin: auto;" />
			</div>

			 <div id="flash">
			    <div id="prev"></div>
			    <div id="next"></div>
				 <ul id="play">
				 	<li style="display: block;"><img src="../img/3.jpg" alt="" /></li>
				 	<li><img src="../img/2.jpg" alt="" /></li>
				 	<li><img src="../img/3.jpg" alt="" /></li>
				 	<li><img src="../img/2.jpg" alt="" /></li>
				 	<li><img src="../img/3.jpg" alt="" /></li>
					<li><img src="../img/2.jpg" alt="" /></li>
					<li><img src="../img/3.jpg" alt="" /></li>
					<li><img src="../img/2.jpg" alt="" /></li>
				 </ul>
				 <ul id="button">
				 	<li><div style="background: #A10000;"></div></li>
				 	<li><div></div></li>
				 	<li><div></div></li>
				 	<li><div></div></li>
				 	<li><div></div></li>
				 	<li><div></div></li>
				 	<li><div></div></li>
				 	<li><div></div></li>
				 </ul>
			</div>
			</div>
</template>
<script>
import slide_p from '../js/slide_p';
export default {
	name: 'carousel',
	data () {
		return{
			p1: '../img/3.jpg'
		}
	}
}
</script>
<style>
	.news1 {
	position: relative;
	top: 10%;
	font-size: 40px;
	color: #f46130;
	margin-left: 9%;
}
    .frame1 {
	position: absolute;
	border: 3px solid #f46130;
	width: 292px;
	height: 65px;
	margin-left: 40.97%;
	margin-top: -40px;
	background: white;
	align-items: center;
}
#flash{width:1200px;height: 265px;margin: 50px auto;position: relative;}
#flash #play{width:1200px;height: 535px;list-style: none;position:absolute;top:0px;left:0px;}
#flash #play li{display: none;position:absolute;top:25px;left:100px;}
#flash #play li img{float: left;}
#button{position: absolute;bottom:-300px;left:470px;list-style: none;}
#button li{margin-left: 10px;float: left;}
#button li div{width:12px;height: 12px;background:#DDDDDD;border-radius: 6px;cursor: pointer;}
#prev{width:40px;height:63px;background:url(../img/beijing.png) 0px 0px;position: absolute;top:205px;left:10px;z-index: 1;}
#next{width:40px;height:63px;background:url(../img/beijing.png) -40px 0px;position: absolute;top:205px;right:10px;z-index: 1;}
#prev:hover{background:url(../img/beijing.png) 0px -62px;}
#next:hover{background:url(../img/beijing.png) -40px -62px;}


#prev1, #next1{display:block;width:500px;height:500px;margin-top:1080px;position:absolute;top:-900px;z-index:2;}
#prev1{background:url(../img/prev1.png) no-repeat;left:194.8px;margin-left:20px;}
#next1{background:url(../img/next1.png) no-repeat;right:-244.8px;margin-right:20px;}
</style>
