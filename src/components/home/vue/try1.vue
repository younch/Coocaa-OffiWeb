<template>
    <div class="form">
		<div class="frame3">
				<span class="news2" id="shi">实践空间站</span>
			</div>
		<hr style="height:1px;border:none;border-top:4px solid tomato;width:90%;margin: auto;margin-top: 450px;" />
		<nav class="projects1">
			<ul class="project"><li class="detail"></li><span class="proname">Project Title</span><span class="proIn">Intorduction</span></ul>
			<ul class="project"><li class="detail"></li><span class="proname">Project Title</span><span class="proIn">Intorduction</span></ul>
			<ul class="project"><li class="detail"></li><span class="proname">Project Title</span><span class="proIn">Intorduction</span></ul>
			<ul class="project"><li class="detail"></li><span class="proname">Project Title</span><span class="proIn">Intorduction</span></ul>
		</nav>
		<nav class="projects2">
			<ul class="project"><li class="detail"></li><span class="proname">Project Title</span><span class="proIn">Intorduction</span></ul>
			<ul class="project"><li class="detail"></li><span class="proname">Project Title</span><span class="proIn">Intorduction</span></ul>
			<ul class="project"><li class="detail"></li><span class="proname">Project Title</span><span class="proIn">Intorduction</span></ul>
			<ul class="project"><li class="detail"></li><span class="proname">Project Title</span><span class="proIn">Intorduction</span></ul>
		</nav>
	   </div>
</template>
<script>
export default {
    name: 'try1'
}
</script>
<style>
.news2 {
	position: relative;
	top: 9%;
	font-size: 40px;
	color: #f46130;
	margin-left: 15%;
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
    nav .project {
	padding: 0;
	list-style-type: none;
}


nav .project:hover {
	transform: translate(0.3rem, 0.3rem);
	color: white;
}

nav .project:hover::before {
	background-color: #f4551d;
	/*鼠标停靠切换颜色*/
}

nav .project:hover .proname {
	color: #FFBE76;
	
	margin-bottom: 100px;
}

.projects1 {
	border: 1.2px solid rgb(192, 191, 191);
	border-radius: 15px;
	width: 492px;
	height: 485px;
	margin-left: 14.97%;
	margin-top: 70px;
}

.projects2 {
	border: 1.2px solid rgb(192, 191, 191);
	border-radius: 8px;
	width: 492px;
	height: 485px;
	margin-left: 54.97%;
	margin-top: -487px;
}

.project {
	border: 1.1px solid rgb(192, 191, 191);
	border-radius: 8px;
	width: 93%;
	height: 96px;
	margin-left: 3.5%;
	margin-top: 20px;
}

.detail {
	border: 1.2px solid #ef3445;
	width: 80px;
	height: 80px;
	margin-left: 3.5%;
	margin-top: 7px;
}

.proname {
	color: tomato;
	position: absolute;
	margin-top: -83px;
	margin-left: 110px;
	font-size: 25px;
}

.proIn {
	color: rgb(192, 191, 191);
	position: absolute;
	margin-top: -50px;
	margin-left: 110px;
	font-size: 20px;
}
</style>

