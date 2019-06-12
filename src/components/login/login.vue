<template>
  <div>
    <div class ="header">
      <h1 style="font-size: 3em;">CooCaa</h1>
      <h3>Login</h3>
      <canvas></canvas>
    </div>
    <div id="container">
      <label>
        <input type="text" placeholder="输入邮箱/手机号(新用户输入即注册)"></input>
      </label>
      <br>
      <label>
        <input type="text" placeholder="输入密码"></input>
      </label>
      <br>
      <label>
        <input type="text" placeholder="输入验证码"></input>
      </label>
      <router-link to="/"> <button type="submit" @click="">登录</button></router-link>
    </div>

    <div class ="canvas-wrap">
      <canvas id ="canvas"></canvas>
    </div>
  </div>

</template>

<script>
  // const canvas = require('../../../static/assets/js/canvas');
  // location.reload();
  let cvs,ctx;
  let waves = [];
  let waveHeight = 200;
  let colours = ["#f2531c","#ffffff","#ff4f00"];
  export default {
    name: "login",
    methods: {
      canvasBg: function() {
        this.init(colours);
        this.randomColour();
        document.addEventListener("DOMContentLoaded",init,false);
      },
      init: function (colours) {
          cvs = document.getElementById("canvas");
          ctx = cvs.getContext("2d");
          ctx.rotate(120*Math.PI/180);
          this.resizeCanvas(cvs);//重置
          for (let i = 0; i < 3; i++) {
            let temp = new this.wave(colours[i],1,5);
          }
          setInterval(this.update,16);
        },
      randomColour: function () {
          // body...
          var h = Math.round(Math.random()*360);
          return "hsl("+h+",100%,50%)";
        },
      update: function (array) {
          // body...
          //ctx.clearRect(0, 0, cvs.width, cvs.height);
          var fill = window.getComputedStyle(document.querySelector(".header"),null).getPropertyValue("background-color");
          ctx.fillStyle = fill;
          ctx.globalCompositeOperation = "source-over";
          ctx.fillRect(0,0,cvs.width,cvs.height);
          ctx.globalCompositeOperation = "screen";
          for (var i = 0; i < waves.length; i++) {
            for (var j = 0; j < waves[i].nodes.length; j++) {
              this.bounce(waves[i].nodes[j]);
            }
            this.drawWave(waves[i]);
            this.drawLine(waves[i].nodes);
            this.drawNodes(waves[i].nodes);
          }
          ctx.globalCompositeOperation = "hue";
          ctx.fillStyle = fill;
          //ctx.fillRect(0,0,cvs.width,cvs.height);
        },
      wave: function (colour,lambda,nodes) {
          // body...
          this.colour = colour;
          this.lambda = lambda;
          this.nodes = [];
          var tick = 1;
          for (var i = 0; i <= nodes+2; i++) {
            var temp = [(i-1)*cvs.width/nodes,0,Math.random()*200,.3];//this.speed*plusOrMinus
            this.nodes.push(temp);
            console.log(temp);
          }
          console.log(this.nodes);
          waves.push(this);
        },
      bounce: function (node) {
          node[1] = waveHeight/2*Math.sin(node[2]/20)+cvs.height/2;
          node[2] = node[2] + node[3];

        },
      drawWave: function  (obj) {
          var diff = function(a,b) {
            return (b - a)/2 + a;
          };
          ctx.fillStyle = obj.colour;
          ctx.beginPath();
          ctx.moveTo(0,cvs.height);
          ctx.lineTo(obj.nodes[0][0],obj.nodes[0][1]);
          for (var i = 0; i < obj.nodes.length; i++) {
            if (obj.nodes[i+1]) {
              ctx.quadraticCurveTo(
                obj.nodes[i][0],obj.nodes[i][1],
                diff(obj.nodes[i][0],obj.nodes[i+1][0]),diff(obj.nodes[i][1],obj.nodes[i+1][1])
              );
            }else{
              ctx.lineTo(obj.nodes[i][0],obj.nodes[i][1]);
              ctx.lineTo(cvs.width,cvs.height);
            }

          }
          ctx.closePath();
          ctx.fill();
        },
      drawNodes: function  (array) {
          ctx.strokeStyle = "#888";
          for (var i = 0; i < array.length; i++) {
            ctx.beginPath();
            ctx.arc(array[i][0],array[i][1],4,0,2*Math.PI);
            ctx.closePath();
            ctx.stroke();
          }

        },
      drawLine: function  (array) {
          ctx.strokeStyle = "#888";
          for (var i = 0; i < array.length; i++) {
            if (array[i+1]) {
              ctx.lineTo(array[i+1][0],array[i+1][1]);
            }
          }
          ctx.stroke();
        },
      resizeCanvas: function (canvas,width,height) {
          if (width && height) {
            canvas.width = width;
            canvas.height = height;
          } else {
            if (window.innerHeight > 1920) {
              canvas.width = window.innerWidth;
            }
            else {
              canvas.width = 1920;
            }

            canvas.height = waveHeight;
          }

        },
    },
    mounted() {
      this.canvasBg();
    }
  };

</script>

<style scoped>
  *, *:before, *:after {
    box-sizing: border-box;
  }
  .header {
    background-color: #ff5300;
    padding: 2rem;
    color: #fff;
    text-align: center;
    position: relative;
  }

  #container{
    z-index: 10;
    color: #333333;
    width: 30%;
    background-color: #ffffff;
    border-radius:10px;
    padding:3%;
    margin: 10% 35%;
    position:absolute;
    top:10%;
    box-shadow: 0 0 5px #eeeeee;
  }
  #container input{
    padding:5%;
    height:2%;
    width:100%;
  }
  #container button:hover{
    padding:2.5%;
    height:2%;
    width:100%;
    margin-top:5%;
    border-radius: 5px;
    background-color: white;
    color: #ff5300;
    border:1px solid #ff5300;
    transition: .5s;
  }
  #container button{
    padding:2.5%;
    height:2%;
    width:100%;
    margin-top:5%;
    border-radius: 5px;
    background-color: #ff5300;
    color: #ffffff;
    border:1px solid #ffffff;
    transition: .5s;
  }
  .canvas-wrap {
    z-index: -999;
    max-width: 100%;
    overflow: hidden;
    position: relative;
    top:30%;
  }
  label{
    display: block;
    margin:3%;
  }
  canvas {
    display: block;
    height:100%;
  }
</style>
