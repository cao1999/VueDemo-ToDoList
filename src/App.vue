<template>
  <div id="app">
    <!--引入子组件-->
    <hello-world></hello-world>
  </div>
</template>

<script>
  //这里引入了其他的组件
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',

  components: {
    HelloWorld,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
