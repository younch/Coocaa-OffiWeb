<template>
    <div id="main">
      <div id="message-show">
        <div class="mes">
            <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
            <span>这是评论这是评论这是评论</span>
          </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
        <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
        <span>这是评论这是评论这是评论</span>
      </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
        <div class="mes">
          <img src="https://dymonelewis.github.io/images/me.jpg" alt="DymoneLewis">
          <span>这是评论这是评论这是评论</span>
        </div>
      </div>
      <div id="leave-word">
        <label>
          <input type="text" placeholder="输入留言" name="word">
          <br>
          <button type="submit">提交</button>
        </label>

      </div>
    </div>
</template>

<script>
    export default {
        name: "messageBoard",
        methods: {
          Barrage: function (){
            let mes = document.getElementsByClassName('mes');
            console.log(mes);
            for(let i = 0;i<mes.length;i++){
              let top = Math.random()*90;
              // let left = Math.random()*100;
              let time = Math.random()*7;
              console.log(top);
              mes[i].style.top = top + '%';
              mes[i].style.left = '100%';
              mes[i].style.animationDelay = time + 's';
            }
          },
          // Insert: function(){
          //   let word = document.getElementsByName('word');
          //   let mess =
          // }
        },
      mounted() {
          this.Barrage();
      }
    }
</script>

<style scoped>
  #main{
    background-color: #0b97c4;
    padding:2%;
  }
  #message-show{
    width:90%;
    height:580px;
    margin: auto;
    padding:2%;
    background-color: white;
    border-radius: 5px;
    position:relative;
    overflow: hidden;
  }
  .mes {
    min-height: 5%;
    min-width: 20%;
    max-width: 30%;
    position: absolute;
    display: flex;
    align-items: center;
    margin:1%;
    background-color: #8ee4f8;
    border-radius: 5px;
    animation: moving 10s linear infinite;
    opacity: 0.8;
  }
  .mes:hover{
    opacity: 1;
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
  }
  .mes img{
    width: 25px;
    height:25px;
    margin:2%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border:1px solid whitesmoke;
  }

  #leave-word{
    width:70%;
    margin:5% auto;
    padding: 3%;
    background-color: white;
    box-shadow: 0 0 5px #dddddd;
  }
  #leave-word input {
    font-size: 1em;
    width:80%;
    padding:1%;
  }
  #leave-word button {
    width:10%;
    height:40px;
    margin:2% 0 0 0;
    background-color: white;
    border: 1px solid #dddddd;
    color: #22859d;
  }
  #leave-word button:hover {
    border: 1px solid #dddddd;
    box-shadow: 0 0 5px #22859d;
    transition: .3s;
  }
  @keyframes moving {
    from {left:100%;}
    to {left:-30%;}

  }
</style>
