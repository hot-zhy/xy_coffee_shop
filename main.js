import App from './App'
import store from "./store"

Vue.prototype.$store = store
// #ifndef VUE3
import Vue from 'vue'
// main.js
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false


//引入全局分割线组件
import divider from "@/components/common/divider.vue"

Vue.component('divider',divider)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif