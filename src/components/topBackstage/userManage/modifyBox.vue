<template>
  <div class="modifyBoxContain" ref="showForm">
    <div class="formContainer">
      <form action="">
        ID：<input type="text" :value="clickMemberInfo.id" class="dealInputCss" disabled>
        <br>
        状态：<select name="chooseState" id="chooseState" class="dealSelectCss" v-model="chooseStatus">
          <option value="0">成员</option>
          <option value="1">高校管理员</option>
          <option value="2">酷开管理员</option>
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
        chooseStatus : this.clickMemberInfo.state,
        stateShow:["成员","高校管理员","酷开管理员"]
      }
    },
    methods:{
      dealConfirmBtn(){
      //  子组件向父组件传值，把那个showBox的状态改变即可
        if(this.clickMemberInfo.state != this.chooseStatus){
          this.clickMemberInfo.state = this.chooseStatus;
          // let permissionId,changePermission;
          // if(this.clickMemberInfo.state == "成员"){
          //   permissionId = 0;
          // }else if(this.clickMemberInfo.state == "高校管理员"){
          //   permissionId = 1;
          // }else if(this.clickMemberInfo.state == "酷开管理员"){
          //   permissionId = 2;
          // }
          // if(this.chooseStatus == "成员"){
          //   changePermission = 0;
          // }else if(this.chooseStatus == "高校管理员"){
          //   changePermission = 1;
          // }else if(this.chooseStatus == "酷开管理员"){
          //   changePermission = 2;
          // }
        //  传给后端响应的内容
          axios({
            methods: "post",
            url:"/api/userRole/updateUserRole",
            data:{
              //将id和新的state进行修改
              roleId : this.clickMemberInfo.id,
              permissionId : this.clickMemberInfo.state,
              changePermission : this.chooseStatus
            }
          }).then((res)=>{
            if (res.status == 200){
              //  更改成功
              alert("修改成功");
            }
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
  background-color: rgb(135,206,250);
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
