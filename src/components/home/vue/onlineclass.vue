<template>
    <div>
        <div>
			<div class="frame3">
					<span class="news" id="link">线上课堂</span>
				</div>
	   <hr style="height:1px;border:none;border-top:4px solid tomato;margin-top:105px;width:90%;margin-left: 6%;" />
	
	</div>
   <div class="video1" id='plv_19a4574e1309f08de3109df2e0a13106_1'>
	   <video class="mp4" width="323" height="213" controls  muted="muted">
  <source src="../img/movie1.mp4" type="video/mp4">
  您的浏览器不支持 video 属性。
</video></div>
   <div class="video2" id='plv_19a4574e1309f08de3109df2e0a13106_1'>
	   <video class="mp4" width="321" height="213" controls muted="muted">
  <source src="../img/movie1.mp4" type="video/mp4">
  您的浏览器不支持 video 属性。
</video></div>
<img class="more1" src="../img/more1.png" />
<span style="position:relative;top:240px;color:#f45">know more</span>
   
    </div>
</template>
<script>
export default {
	name: 'onlineclass'
}
</script>
<style>
.mp4{
	margin-top: 0px;
}
.news {
	position: relative;
	top: 10%;
	font-size: 40px;
	color: #f46130;
	margin-left: 22%;
}
    .frame3 {
	position: absolute;
	border: 3px solid #f46130;
	width: 292px;
	height: 65px;
	margin-left: 40.97%;
	margin-top: -35px;
	background: white;
}
.video1 {
	position: absolute;
	border: 1.5px solid #ef3445;
	height: 213px;
	width: 320px;
	margin-top: 100px;
	margin-left: 10%;
}

.video2 {
	position: absolute;
	border: 1.5px solid #ef3445;
	height: 213px;
	width: 320px;
	margin-top: 100px;
	margin-left: 40.35%;
}
.more1
{
	position: relative;
	margin-left: 78%;
	top: 250px;
	width: 70px;
}
</style>

