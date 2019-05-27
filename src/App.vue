<template>
  <div id="app">
    <router-view/>

  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 1211503 */
    src: url('//at.alicdn.com/t/font_1211503_cdg5r0bnybu.eot');
    src: url('//at.alicdn.com/t/font_1211503_cdg5r0bnybu.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1211503_cdg5r0bnybu.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1211503_cdg5r0bnybu.woff') format('woff'),
    url('//at.alicdn.com/t/font_1211503_cdg5r0bnybu.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1211503_cdg5r0bnybu.svg#iconfont') format('svg');
  }
.iconfont{
  font-family:"iconfont" !important;
  font-size:25px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
html, body, ul, li{
  padding: 0;
  margin: 0;
  list-style: none;
}
html, body{
  height: 100%;
}
</style>
