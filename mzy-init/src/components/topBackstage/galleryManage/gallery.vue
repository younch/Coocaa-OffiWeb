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
      <div style="display: inline-block;" v-show="showConfirmAndCancelBtn">
        <button class="confirmAndCancel" @click="dealChooseCover">封面</button>
        <button class="confirmAndCancel" @click="dealChooseAll">全选</button>
        <button class="confirmAndCancel" @click="dealConfirmBtn">删除</button>
        <button class="confirmAndCancel" @click="dealCancelBtn">取消</button>
      </div>
      <div class="operation" style="margin-right: 5%">
        <span class="operationItem" @click="dealOperation">操作</span>
      </div>
      <!--上传图片-->
      <div class="hello" style="margin-left: 20px;margin-top: 8px;z-index: 10;" v-show="showConfirmAndCancelBtn">
        <div class="upload">
          <div class="upload_warp_left" @click="fileClick">
            <button class="confirmAndCancel" style="width: 75px;margin: 3px;height: 30px;">上传图片</button>
          </div>
          <div class="upload_warp_text">
            选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}};
            <button class="confirmAndCancel" style="width: 100px;margin: -3px;height: 30px;" @click="showHideImgCurrent">显示上传图片</button>
            <button class="confirmAndCancel" style="width: 100px;margin: -3px;height: 30px;margin-left: 10px" @click="uplodeImgs">确定上传图片</button>
            <button class="confirmAndCancel" style="width: 100px;margin: -3px;height: 30px;margin-left: 10px" @click="cancelUplodeImgs">取消上传图片</button>
          </div>
          <!--默认不显示图片，提供按钮查看-->
          <div class="upload_warp" style="border: 1px solid white;" v-show="showImgCurrent">
            <div class="upload_warp_img" v-show="imgList.length!=0" >
              <div class="upload_warp_img_div" v-for="(item,index) of imgList">
                <div class="upload_warp_img_div_top" >
                  <div class="upload_warp_img_div_text" >
                    {{item.file.name}}
                  </div>
                  <img src="" class="upload_warp_img_div_del" @click="fileDel(index)">
                </div>
                <img :src="item.file.src">
              </div>
            </div>
          </div>
          <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
        </div>
      </div>
    </div>
    <!--清除浮动-->
    <br clear="all" />
    <!--展示图片-->
    <div class="GalleryFoot">
      <!--有时间优化下下面代码-->

      <!--分类1图片-->
      <div class="imgContainer"
           data-id="0"
           v-show="galleryStatus == 0"
      >
        <span v-for="item of galleryListAll[0]"
              :key="item.id"
              class="imgItem"
              @click="dealImgOperation($event)"
              ref="one"
              :data-index="item.id"
        >
          <img :src="item.src" alt="lll" class="showImg">
        </span>
        <!--分页代码-->
        <div class="paging" style="padding-bottom: 10px">
          <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
        </div>
      </div>
      <!--分类2图片-->
      <div class="imgContainer"
           data-id="1"
           v-show="galleryStatus == 1"
      >
        <span v-for="item of galleryListAll[1]"
              :key="item.id"
              class="imgItem"
              @click="dealImgOperation($event)"
              ref="two"
              :data-index="item.id"
        >
          <img :src="item.src" alt="" class="showImg">
        </span>
        <!--分页代码-->
        <div class="paging" style="padding-bottom: 10px">
          <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
        </div>
      </div>
      <!--分类3图片-->
      <div class="imgContainer"
           data-id="2"
           v-show="galleryStatus == 2"
      >
        <span v-for="item of galleryListAll[2]"
              :key="item.id"
              class="imgItem"
              @click="dealImgOperation($event)"
              ref="three"
              :data-index="item.id"
        >
          <img :src="item.src" alt="" class="showImg">
        </span>
        <!--分页代码-->
        <div class="paging" style="padding-bottom: 10px">
          <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
        </div>
      </div>
    </div>
    <!--看可不可以改变页面-->
    <div class="hidden" v-show="freshPage"></div>
  </div>

</template>

<script>
  import axios from 'axios'
  import paging from '../../paging/paging'
    export default {
      name: "gallery",
      components: {
        paging
      },
      data () {
        return {
          galleryStatus:0,
          //每个页面里面的图片的集合
          galleryListAll: [[],[],[]],
          //保存原始图片信息
          galleryListAllAc: [[],[],[]],
          //每个页面出现三个按钮
          showConfirmAndCancelBtn:false,
          showConfirmAndCancelBtnSeparated:[false,false,false],
        //  封面内容，从后台接收相关数据，当前页的封面
          chooseCover: "",
          chooseCoverSeparated:[],
          //上传图片信息
          imgList: [],
          size: 0,
          imgListAll:[[],[],[]],
        //  展示是否展示需要上传的图片
          showImgCurrent: false,
          showImgSeparated: [false,false,false],
        //  分页信息
          allSize:0,
          perSize:9,
          freshPage: true,
        // 分页的页码数
          pageAc:0,
          pageEn:0
        }
      },
      //如果使用ref改变数据的，麻烦全部改成使用数组改变
      methods: {
        //改变页面
        galleryChange (e){
          var newStatus = e.target.dataset.id;
          this.galleryStatus = newStatus ? newStatus : this.galleryStatus;
          let index = this.galleryStatus;
          //点击图片分类转换按钮，需要按照页面的不同显示操作button以及图片内容等东西
          this.showConfirmAndCancelBtn = this.showConfirmAndCancelBtnSeparated[index];
          //进入每个分页面的时候展示对应上传的图片
          this.imgList = this.imgListAll[this.galleryStatus];
          this.showImgCurrent = this.showImgSeparated[index];
          this.allSize = this.galleryListAllAc[index].length;
        },
        getInfo(){
          axios.get("api/gallery.json").then((res)=>{
            this.dealGallery(res.data.data);
          });
        },
        //刚加载页面处理
        dealGallery(data){
          for (let i = 0;i<data.length;i++){
            const info = data[i];
            this.galleryListAll[(data[i].type-1)].push(info);
            this.galleryListAllAc[(data[i].type-1)].push(info);
          }
          //  分页信息处理
          let index = this.galleryStatus;
          this.allSize = this.galleryListAllAc[index].length;
          // //一开始显示最前面的0 -- perSize页
          this.galleryListAll[index] = this.galleryListAll[index].splice(0,this.perSize);
        },
        //上传图片
        fileClick(){
          let index = this.galleryStatus;
          document.getElementById('upload_file').click();
        },
        fileChange(el){
          if (!el.target.files[0].size) return;
          this.fileList(el.target.files);
          el.target.value = ''
        },
        fileList(files){
          for (let i = 0; i < files.length; i++) {
            this.fileAdd(files[i]);
          }
        //  对于每一个页面上面的图片进行处理，将当前的页面选中的图片放入对应的数组里面存储
          let index = this.galleryStatus;
          this.imgListAll[index] = this.imgList;
        },
        fileAdd(file){
          this.size = this.size + file.size;//总大小
          let reader = new FileReader();
          reader.vue = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            this.vue.imgList.push({
              file
            });
          }
        },
        fileDel(index){
          this.size = this.size - this.imgList[index].file.size;//总大小
          this.imgList.splice(index, 1);
        },
        bytesToSize(bytes){
          if (bytes === 0) return '0 B';
          let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
          return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        },
        dragenter(el){
          el.stopPropagation();
          el.preventDefault();
        },
        dragover(el){
          el.stopPropagation();
          el.preventDefault();
        },
        drop(el){
          el.stopPropagation();
          el.preventDefault();
          this.fileList(el.dataTransfer.files);
        },
        //确定上传图片
        uplodeImgs(){
          if(this.imgList.length == 0){
            alert("请选择需要上传的图片");
          }else{
            let index = this.galleryStatus;
            for (let i = 0;i < this.imgList.length;i++){
              let imgInfo = new Object();
              imgInfo.id = this.galleryListAll[index].length+1;
              imgInfo.type = this.galleryStatus;
              imgInfo.src = this.imgList[i].file.src;
              this.galleryListAllAc[index].unshift(imgInfo);
              this.galleryListAll[index].unshift(imgInfo);
            }
            this.imgList.splice(0,this.imgList.length);
            this.size = 0;
            this.allSize = this.galleryListAllAc[index].length;
            this.pageChange(this.pageAc,this.pageEn);
          }
        },
        //取消上传图片
        cancelUplodeImgs(){
          if(confirm("确定取消上传？")){
            this.imgList.splice(0,this.imgList.length);
            this.size = 0;
          }
        },
        //是否显示图片
        showHideImgCurrent(){
          let index = this.galleryStatus;
          if(this.showImgSeparated[index] == true){
            this.showImgSeparated[index] = false;
          }else {
            this.showImgSeparated[index] = true;
          }
          this.showImgCurrent = this.showImgSeparated[index];
        },
        //显示 操作 按钮
        dealOperation(){
          let index = this.galleryStatus;
          if(this.showConfirmAndCancelBtnSeparated[index] == false){
            this.showConfirmAndCancelBtnSeparated[index] = true;
          }else{
            this.showConfirmAndCancelBtnSeparated[index] = false;
          }
          this.showConfirmAndCancelBtn = this.showConfirmAndCancelBtnSeparated[index];
        },
        //点击确定按钮
        dealConfirmBtn(){
          let index = this.galleryStatus;
          let flag = false;
          //用来记录用户点击需要删除的图片
          let delImg = [];
          //为了前台演示假装删除数组数据
          let delImgIndex = [];
          if(index == 0){
            for (let i = 0;i<this.$refs.one.length;i++){
              if(this.$refs.one[i].style.border != ""){
                flag = true;
                //将图片的信息通过一个个的对象加入数组传给后台
                let imgInfo = new Object();
                imgInfo.id = this.$refs.one[i].dataset.index;
                imgInfo.type = index;
                let JSONInfo = JSON.stringify(imgInfo);
                delImg.push(JSONInfo);
                delImgIndex.push(i);
              }
            }
          }else if(index == 1){
            for (let i = 0;i<this.$refs.two.length;i++){
              if(this.$refs.two[i].style.border != ""){
                flag = true;
                let imgInfo = new Object();
                imgInfo.id = this.$refs.two[i].dataset.index;
                imgInfo.type = index;
                let JSONInfo = JSON.stringify(imgInfo);
                delImg.push(JSONInfo);
                delImgIndex.push(i);
              }
            }
          }else if(index == 2){
            for (let i = 0;i<this.$refs.three.length;i++){
              if(this.$refs.three[i].style.border != ""){
                flag = true;
                let imgInfo = new Object();
                imgInfo.id = this.$refs.three[i].dataset.index;
                imgInfo.type = index;
                let JSONInfo = JSON.stringify(imgInfo);
                delImg.push(JSONInfo);
                delImgIndex.push(i);
              }
            }
          }
          if(flag == true){
            if(confirm("确定删除？") == false)return ;
            //  发送请求给后台
            axios({
              methods: "get",
              url:"",
              params:{
                delImgInfo:delImg
              }
            }).then((res)=>{
              //减少代码量操作
              let idInfo = [];
              if(index == 0){
                for (let i = 0;i<delImgIndex.length;i++) {
                  idInfo.push(this.$refs.one[i].dataset.index);
                }
              }else if(index == 1){
                for (let i = 0;i<delImgIndex.length;i++) {
                  idInfo.push(this.$refs.two[i].dataset.index);
                }
              }else if(index == 2){
                for (let i = 0;i<delImgIndex.length;i++) {
                  idInfo.push(this.$refs.three[i].dataset.index);
                }
              }
                //删除操作
                for (var i = 0;i<idInfo.length;i++){
                  //获取到图片的ID，通过id删除图片信息
                  let id = idInfo[i];
                  for (let j = 0;j<this.galleryListAllAc[index].length;i++){
                    if(this.galleryListAllAc[index][j].id == id){
                      this.galleryListAllAc[index].splice(j,1);
                      break;
                    }
                  }
                  for (let j = 0;j<this.galleryListAll[index].length;i++){
                    if(this.galleryListAll[index][j].id == id){
                      this.galleryListAll[index].splice(j,1);
                      break;
                    }
                  }
                  this.pageChange(this.pageAc,this.pageEn);
                }
                this.allSize = this.galleryListAllAc[index].length;
                this.triggerPaging();
              }
              //  刷新页面，图片重排，重新getInfo???
            );
          }
        },
        //点击取消按钮
        dealCancelBtn(){
          let index = this.galleryStatus;
          //所有的border样式都得取消
          this.showConfirmAndCancelBtn = false;
          if(index == 0){
            this.showConfirmAndCancelBtnSeparated[index] = false;
            for (let i = 0;i<this.$refs.one.length;i++){
              if(this.$refs.one[i].style.border == "1px solid red")continue;
              this.$refs.one[i].style.border = ""
            }
          }else if(index == 1){
            this.showConfirmAndCancelBtnSeparated[index] = false;
            for (let i = 0;i<this.$refs.two.length;i++){
              if(this.$refs.two[i].style.border == "1px solid red")continue;
              this.$refs.two[i].style.border = ""
            }
          }else if(index == 2){
            this.showConfirmAndCancelBtnSeparated[index] = false;
            for (let i = 0;i<this.$refs.three.length;i++){
              if(this.$refs.three[i].style.border == "1px solid red")continue;
              this.$refs.three[i].style.border = ""
            }
          }
        },
        //点击图片
        dealImgOperation(e){
          if(this.showConfirmAndCancelBtn == true){
            //点击图片
            if(e.target.parentNode.style.border != ""){
              e.target.parentNode.style.border = "";
            }else{
              e.target.parentNode.style.border = "1px solid #3788EE";
            }
          }
        },
        //点击全选按钮
        dealChooseAll(){
          let index = this.galleryStatus;
          if(index == 0){
            for (let i = 0;i<this.$refs.one.length;i++){
              this.$refs.one[i].style.border = "1px solid #3788EE"
            }
          }else if(index == 1){
            for (let i = 0;i<this.$refs.one.length;i++){
              this.$refs.two[i].style.border = "1px solid #3788EE"
            }
          }else if(index == 2){
            for (let i = 0;i<this.$refs.one.length;i++){
              this.$refs.three[i].style.border = "1px solid #3788EE"
            }
          }
        },
        //设置为封面
        dealChooseCover(){
          let index= this.galleryStatus;
          let count = 0,imgId;
          //  获取用户点击的一张图片，如果有多张弹出提示
          if(index == 0){
            for (let i = 0;i<this.$refs.one.length;i++){
              if(this.$refs.one[i].style.border != ""){
                count++;
                imgId = i;
              }
            }
          }else if(index == 1){
            for (let i = 0;i<this.$refs.two.length;i++){
              if(this.$refs.two[i].style.border != ""){
                count++;
                imgId = i;
              }
            }
          }else if(index == 2){
            for (let i = 0;i<this.$refs.three.length;i++){
              if(this.$refs.three[i].style.border != ""){
                count++;
                imgId = i;
              }
            }
          }
          if(count != 1){
            alert("请选择一张图片！");
          }else {
            alert("设置成功！");
            if(index == 0) this.$refs.one[imgId].style.border = "1px solid red";
            if(index == 1) this.$refs.two[imgId].style.border = "1px solid red";
            if(index == 2) this.$refs.three[imgId].style.border = "1px solid red";
          }
        },
      //  分页
        pageChange(start, end){
          this.pageAc = start;
          this.pageEn = end;
          let index = this.galleryStatus;
          let imgInfo = [];
          for (let i = 0;i<this.galleryListAllAc[index].length;i++){
            imgInfo.push(this.galleryListAllAc[index][i]);
          }
          this.galleryListAll[index] = imgInfo.slice(start,end);
          this.triggerPaging();
          // this.
        },
      //  触发分页函数
        triggerPaging(){
          if(this.freshPage){
            this.freshPage = false;
          }else {
            this.freshPage = true;
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
  .confirmAndCancel{
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:0;
    font-size: 14px;
    height: 39px;
    width: 70px;
    margin-left: 20px;
    border-radius: 5px;
    background-color: #3788EE;
    color: #fff;
    border: 2px solid #fff;
    cursor: pointer;
  }
  .galleryMiddle{
    height: 80px;
  }
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
  .GalleryFoot{
    /*height: 746px;*/
    overflow: hidden;
  }
  .imgContainer{
    padding: 20px;

  }
  .imgItem{
    display:inline-block;
    width: 300px;
    height: 200px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid rgba(214, 214, 214, .8);
  }
  .showImg{
    height: 90%;
    width: 90%;
    padding: 5%;
  }
  .showImgActive{
    border: 1px solid #3788EE;
  }
  /*上传图片样式*/

  .upload_warp_img_div_del {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  }

  .upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }

  .upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .upload_warp_img_div {
    position: relative;
    height: 100px;
    width: 120px;
    border: 1px solid #ccc;
    margin: 0px 5px 5px 0px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
  }

  .upload_warp_img {
    border-top: 1px solid #D2D2D2;
    padding: 5px 0 0 5px;
    overflow: hidden
  }

  .upload_warp_text {
    text-align: left;
    height: 30px;
    margin-bottom: 5px;
    padding-top: 5px;
    text-indent: 14px;
    border-top: 1px solid #ccc;
    font-size: 14px;
  }

  .upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 4px;
    line-height: 130px;
    color: #999;
  }

  .upload_warp_left button {
    margin: 8px 5px 0px 5px;
    cursor:pointer;
  }

  .upload_warp_left {
    float: left;
  }

  .upload_warp {
    margin: 5px;

  }

  .upload {
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background-color: #fff;
    width: 770px;
    box-shadow: 0px 1px 0px #ccc;
    border-radius: 4px;
  }

  .hello {
    width: 770px;
    text-align: center;
  }

</style>
