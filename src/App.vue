<template>
  <div id="app">
    <el-row class="header">
      <h1>{{ $route.meta.title }}</h1>
    </el-row>

    <el-row class="links">
      <el-link v-for="(item, index) in links"
               :key="index"
               :href="'/' + item"
               :type="$route.name === item ? 'success': 'primary'">{{ item }}</el-link>
    </el-row>

    <router-view class="container"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {
      links: ['proxy', 'config', 'nginx']
    }
  }
}
</script>

<style lang="less">
@import url("./style/index.less");

.header {
  height: 60px;
  background: #24292e;
  padding: 0 100px;
  color: #fff;
  font-weight: 700;
  line-height: 60px;
}

.links {
  padding: 50px 100px 0 100px;
  .el-link {
    margin-right: 20px;
  }
}

.container {
  margin: 20px 100px;
  position: relative;
}
</style>