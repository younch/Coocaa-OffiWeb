<template>
    
	
</template>
<script>
   import index from '../js/index' 
export default {
        name: 'headBox',
        data () {
     return {
       gallery: '俱乐部夏令营'
     }; 
}
}
</script>

<style>
.links {
            position: fixed;
            top: 50%;
            right: 70px;
            /* width: 50px;
            height: 200px; */
        }

aside {
            width: 15%;
            /* background: url(picture/beijing2.png); */
        }


 *{margin:0px;}
    a{text-decoration:none;}
    header,section,footer{width:1200px;margin:auto;}
    .top1{
        width:100%;
        height:38px;
        line-height:38px;
        background-color:white;
        color:white;   
		 z-index: 4;
    }
    .top1 div{
        width:1200px;
		margin-left: -1%;/*导航栏位置*/
    }
    .top1 ul li{
		
		list-style-type:none;
        display:inline;
        padding:6px 30px;      
    }
    .top1 a{color:darkgrey;}
    .top1 li:hover
	{
	position: relative;
    font-size: 16px;
    transition: 0s all linear;
    cursor: pointer;
	}
	.top3::before {
		margin-left: 2px;
    content: "";
    position: absolute;
    top: 0;
    left: 100%;
    width: 0;
    height: 32px;
    border-bottom: 2.5px solid #f36533;
	}

.top3:hover::before {
    width: 100%;
    top: 0;
    left: 0;
    transition-delay: 0s;
    border-bottom-color: #f36533;
    z-index: -1;
}

.top3:hover ~ li::before {
    left: 0;
}

.top3:active {
    background: #fff;
    color: #f36533;
}
</style>
