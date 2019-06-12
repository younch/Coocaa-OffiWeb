<template>
  <div class="galleryContain">
    <h2 style="padding: 20px 40px;">图册管理</h2>
    <hr style="background: #F3F6F8;border: none; height: 2px;">
    <!--首部提示框信息，展示图册封面以及基本信息-->
    <div class="galleryTop" v-show="gallertyCoverShowHide">
      <div>
        <button class="coverBtnEach" style="width: 10%;background-color: #778899;float: right;margin-right: 5%" @click="addNewGallery">新增相册</button>
      </div>
      <br clear="all">
      <span v-for="item of gallertyTitle"
            :key="item.pictureId"
            class="imgItem"
      >
            <div class="imgControl" style="width: 300px;height: 200px;" @dblclick="showImgEach(item)">
              <img :src="item.atlasCover" alt="" class="showImg">
            </div>
            <div class="coverInfo" style="width: 300px;">
              <div class="galleryItem" :data-id="item.pictureId" style="display: block;text-align: center;margin-bottom: 10px;">图片信息：{{item.atlasName}}</div>
              <button class="coverBtnEach" @click="viewGalleryInfo(item)">查看相册信息</button>
              <button class="coverBtnEach" @click="deleteCoverGallery(item)">删除相册</button>
            </div>
          </span>
      <!--分页代码-->
      <div class="paging" style="padding-bottom: 10px;margin-top: 15px;">
        <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
      </div>
    </div>
    <!--点击某个相册的信息-->
    <div class="showEachGa" v-show="galleryEachShowHide">
      <button @click="returnCover" class="returnBack">&lt;&nbsp;&nbsp;返回</button>
      <!--中间小字的操作-->
      <div class="galleryMiddle">
        <div style="display: inline-block;" v-show="showConfirmAndCancelBtn">
          <button class="confirmAndCancel" style="width: 80px" @click="modifyImgInfo">修改信息</button>
          <button class="confirmAndCancel" @click="dealChooseAll">全选</button>
          <button class="confirmAndCancel" @click="dealConfirmBtn">删除</button>
          <button class="confirmAndCancel" @click="dealCancelBtn">取消</button>
        </div>
        <div class="operation" style="margin-right: 5%">
          <div class="operationItem" @click="dealOperation" style="font-size: 20px">图片操作</div>
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
              <form enctype="multipart/form-data" method="post">
                <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
              </form>
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
          </div>
        </div>
      </div>
      <!--清除浮动-->
      <br clear="all" />
      <!--展示图片-->
      <div class="GalleryFoot">
        <div class="imgContainer"
             data-id="0"
             style="margin-bottom: 10px">
          <span v-for="item of galleryListAll"
              :key="item.pictureId"
              class="imgItem"
              :data-index="item.pictureId"
                ref="one"
          >
            <div class="imgControl" style="width: 300px;height: 200px;" @click="dealImgOperation(item)">
              <img :src="item.pictureUrl" alt="" class="showImg">
            </div>
            <div class="coverInfo" style="width: 300px;">
              <div class="galleryItem" :data-id="item.pictureId" style="display: block;text-align: center;margin-bottom: 10px;">图片信息：{{item.pictureDescription}}</div>
              <button class="coverBtnEach" @click="chooseImgCover(item)">设置封面</button>
              <button class="coverBtnEach" @click="viewEachImgInfo(item)">查看信息</button>
            </div>
          </span>
        </div>
        <!--分页代码-->
        <div class="paging" style="padding-bottom: 10px;margin-top: 15px;">
          <paging :allSize="allSize" :perSize="perSize" @pageChange="pageChange"></paging>
        </div>
      </div>
      <!--看可不可以改变页面-->
      <div class="hidden" v-show="freshPage"></div>
    </div>
    <!--新增相册弹出框-->
    <div class="addNewGallery userFillImgInfo" v-show="uplodeDisplay">
      图册名称：<input type="text" class="imgInfo" style="width: 72%;" v-model="uplodeGalleryInfoName">
      <br>
      您的ID号：<input type="text" class="imgInfo" style="width: 72%;" v-model="uplodeGalleryInfoId">
      <br>
      图册介绍：<input type="text" class="imgInfo" style="width: 72%;" v-model="uplodeGalleryInfoDes">
      <br>
      <input type="file" style="display: none" id="uplodeImgCover" @change="chooseImgInput($event)">
      <button @click="uplodeImgCover" class="coverBtnEach" style="float:left;margin:0;width: 30%;background-color: #778899">上传封面图片</button>
      <br clear="all">
      <div class="uplodeImg">
        <img src="" alt="" id="uplodeImgSrc" style="width: 250px;height: 150px;margin-top: -10%;margin-left: 23%">
      </div>
      <div class="uplodeButton">
        <button class="coverBtnEach" style="width: 20%; margin: 10px;" @click="uplodeConfirm">确定</button>
        <button class="coverBtnEach" style="width: 20%;" @click="uplodeCancel">取消</button>
      </div>
  </div>
    <!--上传图片信息弹出框------未测试-->
    <div class="userFillImgInfo" v-show="userFillImg">
      <div style="height: 200px; width: 400px">
        <img :src="userChooseImg" alt="" style="height: 200px; width: 400px">
      </div>
      图片描述信息：<input type="text" v-model="userFillImgInfo" class="imgInfo">
      <div>
        <div class="button" style="margin-top: 10px;">
          <button class="coverBtnEach" id="userFillConfig" style="width: 20%;" @click="userFillConfig">确定</button>
          <button class="coverBtnEach" style="width: 20%;" @click="userFillEmpty">清空</button>
        </div>
      </div>
    </div>
    <!--修改信息弹出框-->
    <div class="userFillImgInfo" v-show="userModifyImg">
      <div style="height: 200px; width: 400px">
        <img :src="userModifyImgSrc" alt="" style="height: 200px; width: 400px">
      </div>
      图片描述信息：<input type="text" v-model="userModifyImgInfo" class="imgInfo">
      <div>
        <div class="button" style="margin-top: 10px;">
          <button class="coverBtnEach" style="width: 20%;" @click="userModifyConfig">确定</button>
        </div>
      </div>
    </div>
    <!--图册详细信息框---------OK-->
    <div class="showCoverInfo userFillImgInfo" v-show="showCover">
      图册名称：<input type="text" class="imgInfo" style="width: 72%;" v-model="showCoverInfo.name" disabled>
      <br>
      上传人员：<input type="text" class="imgInfo" style="width: 72%;" v-model="showCoverInfo.id" disabled>
      <br>
      图册介绍：<input type="text" class="imgInfo" style="width: 72%;" v-model="showCoverInfo.des" disabled>
      <br>
      <div class="uplodeImg">
        封面照片：
        <img :src="showCoverInfo.src" alt="" style="width: 250px;height: 150px;margin-left: 10%">
      </div>
      <div class="uplodeButton">
        <button class="coverBtnEach" style="width: 20%; margin: 10px;" @click="showCoverConfig">确定</button>
      </div>
    </div>
    <!--详细图片信息框-->
    <div class="showImgInfo userFillImgInfo" v-show="showImg">
      图册名称：<input type="text" class="imgInfo" style="width: 72%;" v-model="showImgInfo.name" disabled>
      <br>
      图册介绍：<input type="text" class="imgInfo" style="width: 72%;" v-model="showImgInfo.coverDes" disabled>
      <br>
      图片介绍：<input type="text" class="imgInfo" style="width: 72%;" v-model="showImgInfo.imgDes" disabled>
      <br>
      <div class="uplodeImg">
        封面照片：
        <img :src="showImgInfo.src" alt="" style="width: 250px;height: 150px;margin-left: 10%">
      </div>
      <div class="uplodeButton">
        <button class="coverBtnEach" style="width: 20%; margin: 10px;" @click="showImgConfig">确定</button>
      </div>
    </div>
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
        saveClick:[],
        showCoverInfo:new Object(),
        showCover:false,
        showImgInfo:new Object(),
        showImg:false,
        //上传图片对话框
        uplodeDisplay:false,
        uplodeGalleryInfoName:"",
        uplodeGalleryInfoId:"",
        uplodeGalleryInfoDes:"",
        uplodeGalleryInfoUrl:"",
        //图片信息，如果点击某个相册需要隐藏
        gallertyCoverShowHide:true,
        //双击某个相册出现响应的内容
        galleryEachShowHide: false,
        //展示图册的最上面的信息
        gallertyTitle:[],
        //存放原始图片信息
        gallertyTitleAc:[],
        //每个页面里面的图片的集合
        galleryListAll: [],
        galleryListAllAc:[],
        //每个页面出现三个按钮
        showConfirmAndCancelBtn:true,
        //上传图片信息
        imgList: [],
        size: 0,
        //  展示是否展示需要上传的图片
        showImgCurrent: false,
        //  分页信息
        allSize:0,
        perSize: 3,
        freshPage: true,
        // 分页的页码数
        pageAc:0,
        pageEn:0,
        coverId: 1,
      //  用户填写图片信息提示框
        userFillImg: false,
        userFillImgInfo: "",
        userChooseImg: "",
      //  修改
        userModifyImg: false,
        userModifyImgInfo:"",
        userModifyImgSrc: "",
        userModifyImgId : Number,
      }
    },
    //如果使用ref改变数据的，麻烦全部改成使用数组改变
    methods: {
      //封面
      getInfo(){
        axios({
          methods:"get",
          url:"/api/atlas/selectAllAtlas",
        }).then((res)=>{
        //  处理封面相册的基本信息
          if(res.code == 200){
            this.dealCoverGallery(res.data.data);
          }
          this.dealCoverGallery(res.data.data);
        });
      },
      dealCoverGallery(data){
        const coverImgInfo = data.atlas;
        for (let i = 0;i<coverImgInfo.length;i++){
          this.gallertyTitle.push(coverImgInfo[i]);
          this.gallertyTitleAc.push(coverImgInfo[i]);
        }
        this.pageChange(this.pageAc,this.pageEn);
      },
      //新增相册
      addNewGallery(){
      //  填写一个表单
        this.uplodeDisplay = true;
      },
      //上传封面
      uplodeImgCover(){
        document.getElementById("uplodeImgCover").click();
      },
      uplodeConfirm(){
        this.uplodeDisplay = false;
        let info = new Object();
        info.atlasName = this.uplodeGalleryInfoName;
        info.atlasUploader = this.uplodeGalleryInfoId;
        info.atlasDescription = this.uplodeGalleryInfoDes;
        info.atlasCover = document.getElementById("uplodeImgSrc").src;
console.log(info)
        //  上传表单信息，可能需要根下面的保持一致，按照后端的需求继续修改
        axios({
          methods:"post",
          url:"/api/atlas/insertAtlas",
          data:{
            "atlasName": info.atlasName,
            "atlasUploader" : info.atlasUploader,
            "atlasDescription" : info.atlasDescription,
            "atlasCover" : info.atlasCover
          },
          headers:{'Content-Type':'application/json'}
        }).then((res)=>{
          console.log(res.data);
          this.clearUplodeInfo();
          //返回id
          info.atlasId = res.data.data.atlasId;
          this.gallertyTitle.unshift(info);
          //清除表格内容
          this.clearUplodeInfo();
        });
        this.gallertyTitle.unshift(info);
      },
      clearUplodeInfo(){
        this.uplodeGalleryInfoName = "";
        this.uplodeGalleryInfoId = "";
        this.uplodeGalleryInfoDes = "";
        this.uplodeGalleryInfoUrl = "";
      },
      uplodeCancel(){
        this.uplodeDisplay = false;
      //  信息项全为空
        this.clearUplodeInfo();
      },
      chooseImgInput(e){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.src = this.result;
          //似乎时异步请求
          this.uplodeGalleryInfoUrl = file.src;
          document.getElementById("uplodeImgSrc").src = file.src;
        };
      },
      //查看相册封面信息--------OK
      viewGalleryInfo(data){
        //如果有时间就封装成其他好的展现形式
        this.showCoverInfo.id = data.atlasUploader;
        this.showCoverInfo.name = data.atlasName;
        this.showCoverInfo.des = data.atlasDescription;
        this.showCoverInfo.src = data.atlasCover;
        this.showCover = true;
      },
      showCoverConfig(){
        this.showCover = false;
      },
      // 删除封面图册信息-----------OK
      deleteCoverGallery(data){
        if(confirm("确定删除？")){
          axios({
            methods:"get",
            url:"/api/atlas/deleteAtlas/"+data.atlasId,
          }).then((res)=>{
            if(res.data.code == 200){
              alert("删除成功");
              //  本地的也要删除对应的信息
              for (let i = 0;i<this.gallertyTitle.length;i++){
                if(this.gallertyTitle[i].atlasId == data.atlasId){
                  this.gallertyTitle.splice(i,1);
                  break;
                }
              }
              for (let i = 0;i<this.gallertyTitleAc.length;i++){
                if(this.gallertyTitleAc[i].atlasId == data.atlasId){
                  this.gallertyTitleAc.splice(i,1);
                  break;
                }
              }
              console.log(this.gallertyTitle);
            }else{
              alert("删除失败！");
            }
          })
        }
      },
      //点击某一个相册
      showImgEach(data){
        axios({
          methods:"get",
          url:"/api/atlas/selectAtlasById?atlasId="+data.atlasId
        }).then((res)=>{
          const data = res.data;
          if(data.code == 200){
            this.galleryListAllAc = data.data.atlasPicture;
            this.showImgInfo.name = data.data.atlas.atlasName;
            this.showImgInfo.coverDes = data.data.atlas.atlasDescription;
            //  对于页面的处理，封装到某个函数中，方便调用
            this.gallertyCoverShowHide = false;
            this.galleryEachShowHide = true;
            this.coverId = data.data.atlas.atlasId;
            this.pageChange(0,this.perSize);
          }
        });
      },
      //返回----OK
      returnCover(){
        this.gallertyTitle = [];
        this.gallertyTitleAc = [];
        this.getInfo();
        this.gallertyCoverShowHide = true;
        this.galleryEachShowHide = false;
      },
      //设置封面
      chooseImgCover(data){
        axios({
          methods:"get",
          url:"",

        }).then((res)=>{
          alert("设置成功");
        })
      },
      //查看单张图片信息
      viewEachImgInfo(data){
        console.log(data);
        this.showImgInfo.id = data.pictureId;
        this.showImgInfo.imgDes = data.pictureDescription;
        this.showImgInfo.src = data.pictureUrl;
        this.showImg = true;
      },
      showImgConfig(){
        this.showImg = false;
      },
      //上传图片
      fileClick(){
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
        };
        //之前的上传信息
        // let param = new FormData();
        // console.log("before = ",file,file.name)
        // param.append('file',file,file.name);
        // let config = {
        //   headers:{'Content-Type':'multipart/form-data'}
        // };  //添加请求头
        // console.log(param)
        // axios.post('',param,config)
        //   .then(response=>{
        //     console.log(response.data);
        //   })
      },
      fileDel(index){
        this.size = this.size - this.imgList.file.size;//总大小
        this.imgList.splice(index, 1);
      },
      bytesToSize(bytes){
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      //确定上传图片，分页面
      uplodeImgs(){
        if(this.imgList.length == 0){
          alert("请选择需要上传的图片");
        }else{
          if(this.imgList.length == 1){
            this.userChooseImg = this.imgList[0].file.src;
            this.userFillImg = true;
            this.upImgLess(0);
          }else{
            for (let i = 0;i < this.imgList.length;i++){
              let info = new Object();
              this.upImgLess(i);
              info.pictureDescription = "";
              info.pictureUrl = this.imgList[i].file.src;
              info.atlasId = this.coverId;
              info.pictureId = this.showImgInfo.pictureId;
              console.log(i,this.showImgInfo.pictureUrl);
              this.galleryListAllAc.unshift(info);
              console.log(this.showImgInfo);
            }
          }
          this.pageChange(this.pageAc,this.pageEn);
          this.imgList.splice(0,this.imgList.length);
          this.size = 0;
        }
      },
      //封装成函数方面调用
      upImgLess(i){
        this.showImgInfo.atlasId = this.coverId;
        this.showImgInfo.pictureUrl = this.imgList[i].file.src;
        let param = new FormData();
        param.append('file',this.imgList[i].file,this.imgList[i].file.name);
        let config = {
          headers:{'Content-Type':'application/json'}
        };  //添加请求头
        axios.post('/api/atlasPicture/insertAtlasPicture',param,config)
          .then(res=>{
            let data = res.data;
            console.log(res.data);
            this.showImgInfo.pictureId = i+10;
          })
      },
      //用户填写上传图片信息 确认
      userFillConfig(){
        if(this.userFillImgInfo != ""){
          this.showImgInfo.pictureDescription = this.userFillImgInfo;
          this.galleryListAllAc.unshift(this.showImgInfo);
          this.pageChange(this.pageAc,this.pageEn);
          this.userFillImg = false;
        }else {
          alert("请填写图片描述信息");
        }
      },
      userFillEmpty(){
        this.userFillImgInfo = "";
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
        if(this.showImgSeparated == true){
          this.showImgSeparated = false;
        }else {
          this.showImgSeparated = true;
        }
        this.showImgCurrent = this.showImgSeparated;
      },
//显示 操作 按钮
      dealOperation(){
        this.showConfirmAndCancelBtn = this.showConfirmAndCancelBtn == true ? false : true;
      },
//点击确定删除按钮
      dealConfirmBtn(){
        let flag = false;
        //用来记录用户点击需要删除的图片
        let delImg = [];
        //为了前台演示假装删除数组数据
        let delImgIndex = [];
        for (let i = 0;i<this.$refs.one.length;i++){
          if(this.$refs.one[i].style.border != ""){
            this.$refs.one[i].style.border = "";
            flag = true;
            //将图片的信息通过一个个的对象加入数组传给后台
            let imgInfo = new Object();
            imgInfo.id = this.$refs.one[i].dataset.index;
            let JSONInfo = JSON.stringify(imgInfo);
            delImg.push(JSONInfo);
            delImgIndex.push(i);
          }
        }
        if(flag == true){
          if(confirm("确定删除？") == false)return ;
          //  发送请求给后台，处理删除图片按钮
          axios({
            methods: "get",
            url:"",
            params:{
              delImgInfo:delImg
            }
          }).then((res)=>{
              //减少代码量操作
              let idInfo = [];
              for (let i = 0;i<delImgIndex.length;i++) {
                idInfo.push(this.$refs.one[i].dataset.index);
              }
              //删除操作
              for (var i = 0;i<idInfo.length;i++){
                //获取到图片的ID，通过id删除图片信息
                let id = idInfo[i];
                for (let j = 0;j<this.galleryListAllAc.length;j++){
                  if(this.galleryListAllAc[j].pictureId == id){
                    this.galleryListAllAc.splice(j,1);
                    break;
                  }
                }
                this.pageChange(this.pageAc,this.pageEn);
              }
            }
            //  刷新页面，图片重排，重新getInfo???
          );
        }
      },
//点击取消按钮
      dealCancelBtn(){
        //所有的border样式都得取消
        this.showConfirmAndCancelBtn = false;
        for (let i = 0;i<this.$refs.one.length;i++){
          this.$refs.one[i].style.border = ""
        }
        this.saveClick = [];
      },
//点击图片
      dealImgOperation(data){
        for (let i = 0;i<this.$refs.one.length;i++){
          if(this.$refs.one[i].dataset.index == data.pictureId){
            if(this.$refs.one[i].style.border == ""){
              this.$refs.one[i].style.border = "1px solid #3788EE";
              this.saveClick.push(data.pictureId);
            }else{
              this.$refs.one[i].style.border = "";
              this.saveClick.remove(data.pictureId);
            }
          }
        }
      },
//      修改图片信息
      modifyImgInfo(){
      //  一个弹窗，让用户修改，而且得判断数量只有一个
        let count = 0;
        let imgInfo ;
        for (let i = 0;i<this.$refs.one.length;i++){
          if(this.$refs.one[i].style.border != ""){
            count ++ ;
            imgInfo = this.$refs.one[i].dataset.index;
          }
        }
        if(count == 1){
          let imgId = imgInfo;
          //获取到原始的图片描述信息
          for (let i = 0;i < this.galleryListAll.length;i++){
            if(this.galleryListAll[i].pictureId == imgInfo){
              this.userModifyImgInfo = this.galleryListAll[i].pictureDescription;
              this.userModifyImgSrc = this.galleryListAll[i].pictureUrl;
              this.userModifyImgId = this.galleryListAll[i].pictureId;
              this.userModifyImg = true;
              break;
            }
          }
        }else {
          alert("请选择一张图片");
        }
      },
//      修改确定按钮
      userModifyConfig(){
        if(this.userModifyImgInfo != ""){
          for (let i = 0;i<this.galleryListAllAc.length;i++){
            if (this.galleryListAllAc[i].pictureId == this.userModifyImgId){
              this.galleryListAllAc[i].pictureDescription = this.userModifyImgInfo;
              this.pageChange(this.pageAc,this.pageEn);
              break;
            }
          }
          // axios
          this.userModifyImg = false;
        }else{
          alert("请填写修改后的信息！");
        }
      },
//点击全选按钮
      dealChooseAll(){
        for (let i = 0;i<this.$refs.one.length;i++){
          this.$refs.one[i].style.border = "1px solid #3788EE"
        }
      },
      //  分页
      pageChange(start, end){
        this.pageAc = start;
        this.pageEn = end;
        let imgInfo = [];
        if(this.gallertyCoverShowHide == true){
          this.allSize = this.gallertyTitleAc.length;
          for (let i = 0;i<this.gallertyTitleAc.length;i++){
            imgInfo.push(this.gallertyTitleAc[i]);
          }
          this.gallertyTitle = imgInfo.slice(start,end);
        }
        if(this.galleryEachShowHide == true){
          this.allSize = this.galleryListAllAc.length;
          for (let i = 0;i<this.galleryListAllAc.length;i++){
            imgInfo.push(this.galleryListAllAc[i]);
          }
          this.galleryListAll = imgInfo.slice(start,end);
        }
        this.triggerPaging();
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
    },
    watch: {
      currentCover: function f() {
        this.$nextTick(function () {
          this.setUpCover(0,this.currentCover);
        })
      }
    }
  }
</script>

<style scoped>
  .galleryContain{
    margin: 30px;
    background: #fff;
    border-radius: 4px;
  }
  .coverBtn{
    border: none;
    outline: none;
    outline:0;
    width: 37%;
    height: 50px;
    color: white;
    font-size: 16px;
    background-color: #3788EE;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    margin-left: 12%;
  }
  .coverBtnEach{
    border: none;
    outline: none;
    outline:0;
    width: 37%;
    height: 40px;
    color: white;
    font-size: 16px;
    background-color: #3788EE;
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    margin-left: 8%;
  }
  /*首部样式*/
  .galleryTop{
    color: #696969;
    padding: 10px;
  }
  .coverImg{
    display: inline-block;
    margin: 2%;
    height: 310px;
    border: 1px solid rgba(214, 214, 214, .8);
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
  .returnBack{
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:0;
    font-size: 14px;
    height: 39px;
    width: 70px;
    margin-left: 20px;
    border-radius: 5px;
    background-color: #DCDCDC;
    color: #2F4F4F;
    border: 2px solid #fff;
    cursor: pointer;
    margin-bottom: 10px;
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
    color: #3788EE;
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
    height: 310px;
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
  .userFillImgInfo{
    position: absolute;
    height: 350px;
    width: 400px;
    background-color: #F0F8FF;
    left: 30%;
    top: 30%;
    text-align: center;
    border-radius: 5px;
  }
  .imgInfo{
    -webkit-appearance: none;
    -moz-appearance: none;
    outline:0;
    height: 20px;
    width: 300px;
    margin: 10px;
    border-radius: 5px;
  }

</style>
