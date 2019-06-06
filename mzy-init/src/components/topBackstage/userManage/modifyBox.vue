<template>
  <div class="modifyBoxContain" ref="showForm">
    <div class="formContainer">
      <form action="">
        序号：<input type="text" :value="clickMemberInfo.index" class="dealInputCss" disabled>
        <br>
        昵称：<input type="text" :value="clickMemberInfo.name" class="dealInputCss" disabled>
        <br>
        大学：<input type="text" :value="clickMemberInfo.university" class="dealInputCss" disabled>
        <br>
        时间：<input type="text" :value="clickMemberInfo.time" class="dealInputCss" disabled>
        <br>
        状态：<select name="chooseState" id="chooseState" class="dealSelectCss" v-model="chooseStatus">
          <option value="待处理">待处理</option>
          <option value="正式会员">正式会员</option>
          <option value="高校管理员">高校管理员</option>
        </select>
        <br>
      </form>
      <button class="confirmAndCancelBtn" @click="dealConfirmBtn">确认</button>
      <button class="confirmAndCancelBtn" @click="dealCancelBtn">取消</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "modifyBox",
    props: {
      "clickMemberInfo" : Object,
      "showPopBox" : Boolean
    },
    data () {
      return {
        chooseStatus : this.clickMemberInfo.state
      }
    },
    methods:{
      dealConfirmBtn(){
      //  子组件向父组件传值，把那个showBox的状态改变即可
        if(this.clickMemberInfo.state != this.chooseStatus){
          this.clickMemberInfo.state = this.chooseStatus;
        //  传给后端响应的内容
          axios({
            methods: "get",
            url:"",
            params:{
              //将id和新的state进行修改
              id : this.clickMemberInfo.id,
              state : this.chooseStatus
            }
          }).then((res)=>{
          //  更改成功

          }).catch((error)=>{
            alert("error");
          });
        }
        this.dealCancelBtn();
      },
      dealCancelBtn(){
        this.$refs.showForm.style.display = "none";
        //将新的信息传过去，那边进行页面修改
        this.$emit('dealShowPopBox',false,this.clickMemberInfo);
      }
    }
  }
</script>

<style scoped>
.modifyBoxContain{
  width: 50%;
  position: absolute;
  top: 25%;
  left: 20%;
  border-radius: 10px;
  background-color: rgba(55,136,238,0.6);
}
  .formContainer{
    padding: 5%;
    font-size: 18px;
  }
  .dealInputCss{
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:0;
    height: 30px;
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px rgb(55,136,238) solid;
    font-size: 16px;
    padding-left: 10px;
    margin: 2%;
  }
  .dealSelectCss{
    height: 30px;
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    border: 1px rgb(55,136,238) solid;
    font-size: 16px;
    padding-left: 10px;
    margin: 2%;
  }
  .confirmAndCancelBtn{
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:0;
    height: 40px;
    width: 80px;
    margin-left: 10%;
    margin-top: 3%;
    border-radius: 5px;
    background-color: #FFFFFF;
    color: #3788EE;
    border: 2px solid #3788EE;
    cursor: pointer;
  }
</style>
