<template>
    <div class="sea" id="home">
                <span class="wave"></span>
                <span class="wave"></span>
                <span class="wave"></span>
                <div class="wavestyle">
                        <p class="coocaa">{{top1}}</p>
						<p class="club"></p>
				</div>
				<div class="more">
						<span class="news3">
							<a href="http://www.coocaa.com/" style="text-decoration: none;cursor: pointer;color:#ffbe76;font-size:25px;">Know More</a>
							</span>
				</div>
			</div>
</template>
<script>
	
export default {
    name: 'topbox',
    data () {
        return{
        top1: 'coocaa    CLUB'
        }
    }
}
</script>
<style>
    .sea {
	/*背景图*/
	width: 1500px;
	height: 800px;
	text-align: center;
	border-radius: 5px;
	position: relative;
	overflow: hidden;
	z-index: 0;
}
.sea .wave {
	/*动效幅度*/
	position: absolute;
	width: 1480px;
	height: 1480px;
	border-radius: 43%;
	top: -970px;
	left: calc((-300px - 400px) / 2);
	animation: drift linear infinite;
	transform-origin: 53% 50%;
}
.sea .wave:nth-of-type(1) {
	/*第三层*/
	background: #f4551d;
	filter: opacity(0.7);
	animation-duration: 7.5s;
}
.sea .wave:nth-of-type(2) {
	/*第二层*/
	background: #f4551d;
	filter: opacity(0.7);
	animation-duration: 8.5s;
}
.sea .wave:nth-of-type(3) {
	/*第一层*/
	background-color: #f4551d;
	filter: opacity(0.7);
	animation-duration: 8s;
}
@keyframes drift {
	from {
		transform: rotate(1turn);
	}
}
.wavestyle {
	position: relative;
	float: left;
	margin-top: 80px;
	font-size: 80px;
	font-family: Caviar Dreams;
	margin-left: 32.6%;
	font-weight: 100;
	color: white;
}
.crossing1 {
	height: 1px;
	margin-top: 1000px;
	border: none;
	border-top: 2px solid #e42424;
}
.more {
	position: absolute;
	border: 5px solid #ffbe76;
	border-radius: 17px;
	width: 200px;
	height: 35px;
	margin-left: 40%;
	margin-top: 29%;
}
</style>
