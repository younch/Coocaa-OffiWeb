<template>
<div>
    <div>
		<div class="frame4">
				<span class="news" id="guan">关于我们</span>
			</div>
   <hr style="height:1px;border:none;border-top:4px solid tomato;margin-top:-35px;width:90%;margin-left: 6%;" />
</div>
<div>
		<div class="video4"></div>
		<span style="position:absolute;margin-top: 60px;margin-left: 39%;font-size: 40px;color: tomato;">{{p}}</span>
		<span style="position:absolute;margin-top: 115px;margin-left: 39%;font-size: 20px;color: rgb(134, 131, 131);">{{p2}}</span>
	</div>
	<div>
			<div class="video6"></div>
			<span style="position:absolute;margin-top:258px;margin-left: 58%;font-size: 40px;color: tomato;">{{p3}}</span>
			<span style="position: absolute;margin-top: 311px;margin-left: 58%;font-size: 20px;color: rgb(134, 131, 131);">{{p4}}</span>
		</div>
   <div class="footer" style="width: 100%;">
		<iframe frameborder="0"  scrolling="no" style="position:absolute;margin-left:-50%;"></iframe>
		<footer style="background-color: #F45031; text-align: center; margin-top:800px;width: 100%;margin-bottom:50px;">
		<p>Posted by: Cooca</p>
		<p>Contact information: <a href="mailto:someone@example.com">{{p1}}</a>.</p>
   </footer>
		</div>
		
        </div>
</template>
<script>
export default {
	name: 'about',
	data () {
		return {
			p: 'putin',
			p2: 'welcome',
			p3: 'putin',
			p4: 'welcome',
			p1: '121@163.com'
		}
	}
}
</script>
<style>
.news {
	position: relative;
	top: 10%;
	font-size: 40px;
	color: #f46130;
	margin-left: 22%;
}
    .frame4 {
	position: relative;
	border: 3px solid #f46130;
	width: 292px;
	height: 65px;
	margin-left: 40.97%;
	margin-top: 400px;
	background: white;
}
.video4 {
	position: absolute;
	border: 1.5px solid #ef3445;
	height: 160px;
	width: 320px;
	margin-top: 60px;
	margin-left: 10%;
}
.video6 {
	position: absolute;
	border: 1.5px solid #ef3445;
	height: 160px;
	width: 320px;
	margin-top: 260px;
	margin-left: 68%;
}
</style>
