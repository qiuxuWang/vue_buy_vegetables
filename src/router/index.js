import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import DashBoard from './../views/dashboard/Dashboard'

const Home = () => import('./../views/home/Home.vue');
const Category = () => import('./../views/category/Category.vue');
const Cart = () => import('./../views/cart/Cart.vue');

// 用户中心
const Mine = () => import('./../views/mine/Mine.vue');
const UserCenter = () => import('./../views/mine/children/UserCenter');
const MineOrder = () => import('../views/mine/children/MineOrder');

// 地址相关
const Order = () => import('./../views/order/Order');
const OrderDetail = () => import('./../views/order/children/OrderDetail');
const MyAddress = () => import('./../views/order/children/MyAddress');
const AddAddress = () => import('./../views/order/children/children/AddAddress');
const EditAddress = () => import('./../views/order/children/children/EditAddress');

// 引入登录
const Login = () => import('./../views/login/Login');

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
                {
                    path: 'mine', name: 'mine', component: Mine,
                    children: [
                        {path: 'userCenter', name: 'userCenter', component: UserCenter}, //用户中心
                        {path: 'mineOrder', name: 'mineOrder', component: MineOrder}, //订单详情
                    ]
                },
            ]
        },
        {
            path: '/confirmOrder', name: 'order', component: Order,
            children: [
                {
                    path: 'myAddress', name: 'MyAddress', component: MyAddress,
                    children: [
                        //添加地址
                        {path: 'addAddress', name: 'addAddress', component: AddAddress},
                        //编辑地址
                        {path: 'editAddress', name: 'editAddress', component: EditAddress}
                    ]
                },
                {path:'OrderDetail',name:'OrderDetail',component:OrderDetail}
            ]
        },
        {path: '/login', name: 'login', component: Login}
    ]
})