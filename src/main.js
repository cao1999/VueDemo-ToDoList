import Vue from 'vue';
//引入全部样式组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
//将element绑定到全局
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
