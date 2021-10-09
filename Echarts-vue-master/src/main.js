import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 引入字体图标
import './assets/font/iconfont.css'
// 引入全局样式
import './assets/css/global.css'
// 对服务端进行websocket连接
import SocketService from '@/utils/socket_service'
SocketService.Instance.connect()
Vue.prototype.$socket = SocketService.Instance

// 配置基准路径
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = axios
// 将全局的echarts对象挂载到vue原型上
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
