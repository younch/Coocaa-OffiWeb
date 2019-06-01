<template>
  <div class="galleryContain">
    <h2 style="padding: 20px 40px;">图册管理</h2>
    <hr style="background: #F3F6F8;border: none; height: 2px;">
    <!--首部提示框信息-->
    <div class="galleryTop" @click="galleryChange">
      <div :class="{'galleryItem':'true'=='true',active:galleryStatus=='0'}" data-id="0">图片分类1</div>
      <div :class="{'galleryItem':'true'=='true',active:galleryStatus=='1'}" data-id="1">图片分类2</div>
      <div :class="{'galleryItem':'true'=='true',active:galleryStatus=='2'}" data-id="2">图片分类3</div>
    </div>
    <!--中间小字的操作-->
    <div class="galleryMiddle">
      <div class="operation">
        <span class="operationItem">导入</span>
        <span class="operationItem">批量导入</span>
        <span class="operationItem">操作</span>
      </div>
    </div>
    <!--清除浮动-->
    <br clear="all" />
    <!--展示图片-->
    <div class="GalleryFoot">
      <!--分类1图片-->
      <div class="imgContainer"
           data-id="0"
           v-show="galleryStatus == 0"
      >
        <span class="imgItem" v-for="item of galleryListTypeFir"
              :key="item.id"><img :src="item.src" alt="" class="showImg">{{item.contain}}</span>
      </div>
      <!--分类2图片-->
      <div class="imgContainer"
           data-id="0"
           v-show="galleryStatus == 1"
      >
        <span class="imgItem" v-for="item of galleryListTypeFir"
              :key="item.id"><img :src="item.src" alt="" class="showImg">{{item.contain}}</span>
      </div>
      <!--分类3图片-->
      <div class="imgContainer"
           data-id="0"
           v-show="galleryStatus == 2"
      >
        <span class="imgItem" v-for="item of galleryListTypeFir"
              :key="item.id"><img :src="item.src" alt="" class="showImg">{{item.contain}}</span>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios"
    export default {
      name: "gallery",
      data () {
        return {
          galleryStatus:0,
          galleryListTypeFir: [],
          galleryListTypeSec:[],
          galleryListTypeThr:[]
        }
      },
      methods: {
        galleryChange (e){
          var newStatus = e.target.dataset.id;
          this.galleryStatus = newStatus ? newStatus : this.galleryStatus;
        },
        getInfo(){
          axios.get("api/gallery.json").then((res)=>{
            this.dealGallery(res.data.data);
          })
        },
        dealGallery(data){
          for (let i = 0;i<data.length;i++){
            const info = data[i];
            if(data[i].type == 1){
              this.galleryListTypeFir.push(info);
            }else if(data[i].type == 2){
              this.galleryListTypeSec.push(info);
            }else if(data[i].type == 3){
              this.galleryListTypeThr.push(info);
            }
          }
        }
      },
      mounted() {
        this.getInfo();
      }
    }
</script>

<style scoped>
  .galleryContain{
    height: 100%;
    margin: 30px;
    background: #fff;
    border-radius: 4px;
  }
  /*首部样式*/
  .galleryTop{
    color: #696969;
    padding: 10px;
  }
  .active{
    color: #3788EE;
    border-bottom: 1px solid #3788EE;
  }
  .galleryItem{
    padding: 2px;
    height: 30px;
    display: inline-block;
    margin: 15px;
    font-size: 18px;
  }
  .galleryItem:hover{
    cursor: pointer;
  }
  /*中间操作样式*/
  .operation{
    float: right;
  }
  .operationItem{
    display: inline-block;
    margin: 10px;
    color: #9E9E9E;
    font-size: 14px;
  }
  .operationItem:hover{
    cursor: pointer;
  }
  /*图片展示样式*/
  .imgContainer{
    padding: 20px;
  }
  .imgItem{
    display:inline-block;
    width: 215px;
    height: 180px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid rgba(214, 214, 214, .8);
  }
  .showImg{
    height: 90%;
    width: 90%;
    padding: 5%;
  }
</style>
