import Vue from 'vue'
import Router from 'vue-router'

//引入一级组件
import DashBoard from './../views/dashboard/Dashboard'

const Home = () => import('./../views/home/Home.vue');
const Category = () => import('./../views/category/Category.vue');
const Cart = () => import('./../views/cart/Cart.vue');
const Mine = () => import('./../views/mine/Mine.vue');

// 引入组件相关
const Order = () => import('./../views/order/Order');
const MyAddress = () => import('./../views/order/children/MyAddress');
const AddAddress = () => import('./../views/order/children/children/AddAddress');
const EditAddress = () => import('./../views/order/children/children/EditAddress');

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: '/dashboard'},
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashBoard,
            children: [
                {path: '/dashboard', redirect: '/dashboard/home'},
                {path: 'home', name: 'home', component: Home, meta: {keepAlive: true}},
                {path: 'category', name: 'category', component: Category, meta: {keepAlive: true}},
                {path: 'cart', name: 'cart', component: Cart},
                {path: 'mine', name: 'mine', component: Mine},
            ]
        },
        {
            path: '/confirmOrder', name: 'order', component: Order, children: [
                {path: 'myAddress', name: 'MyAddress', component: MyAddress,children:[
                        //添加地址
                        {path:'addAddress',name:'addAddress',component:AddAddress},
                        //编辑地址
                        {path:'editAddress',name:'editAddress',component:EditAddress}
                    ]}
            ]
        }
    ]
})