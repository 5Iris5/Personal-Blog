<template>
  <div id="app">
    <!-- keep-alive是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less">
@import url("//at.alicdn.com/t/font_1664657_h1z3zpvzwgj.css");
@import url("./assets/css/reset.css");
#app {
  width: 100%;
  background: url(./assets/images/left.png) no-repeat fixed bottom left,
    url(./assets/images/right.png) no-repeat fixed top right,
    #f0f2f7;
}
</style>
