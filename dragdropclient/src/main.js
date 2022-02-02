import Vue from 'vue'
import App from './App.vue'
import { Drag, Drop } from 'vue-drag-drop';
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('drag', Drag);
Vue.component('drop', Drop);
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
