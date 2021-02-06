import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// 1. 引入fastClick
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

//2. 引入全局样式(@=src)
import '@/style/common.less'

//3. 引入全局ui组件库
import '@/plugins/vant'

//4. 引入rem
import '@/config/rem'

//5. 引入全局过滤器
import '@/config/filters'

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
