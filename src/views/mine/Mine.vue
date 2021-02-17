<template>
    <div id="mine" v-if="userInfo.token">
        <!--导航栏-->
        <van-nav-bar
                title="我的"
                :fixed=true
                :border=false
        ></van-nav-bar>

        <van-cell-group style="margin-top: 2.6rem;">
            <van-cell style="background-color: #2eba5a; color: #fff" is-link :center="true"
                      @click="$router.push('/dashboard/mine/userCenter')">
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <div class="personMsg">
                        <img src="./images/xiaoliao.png"/>
                        <!--<img :src="userInfo.icon_url"/>-->
                        <div class="personInfo">
                            <span>{{userInfo.real_name}}</span>
                            <span>手机号：{{userInfo.phone}}</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell icon="label" title="我的订单" value="查看所有的订单" is-link
                      @click="$router.push('/dashboard/mine/MineOrder')"></van-cell>
            <router-link tag="div" :to="'/dashboard/mine/userCenter'">
                <van-grid>
                    <van-grid-item
                            v-for="(order, index) in orderData"
                           :key="index"
                           :icon="order.icon"
                           :text="order.title"
                    >
                    </van-grid-item>
                </van-grid>
            </router-link>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="gold-coin" title="我的优惠券" value="" is-link></van-cell>
            <van-cell icon="todo-list" title="我的收货地址" value="" is-link></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="phone" title="联系客服" value="" is-link></van-cell>
            <van-cell icon="smile-comment" title="意见反馈" value="" is-link></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="gift-card" title="小撩买菜" value="" is-link></van-cell>
        </van-cell-group>

        <!--路由出口-->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <SelectedLogin v-else/>
</template>

<script>
    import {mapState} from 'vuex'
    import SelectedLogin from './../../views/login/SelectedLogin'


    export default {
        name: "Mine",
        data() {
            return {
                orderData: [
                    {icon: 'pending-payment', title: '待支付'},
                    {icon: 'gift-o', title: '待收货'},
                    {icon: 'smile-comment-o', title: '待评价'},
                    {icon: 'cash-back-record', title: '售后/退款'}
                ]
            }
        },
        computed: {
            ...mapState(["userInfo"])
        },
        components: {
            SelectedLogin,
        }
    }
</script>

<style lang="less" scoped>
    #mine {
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
    }

    .van-nav-bar {
        background-color: #3bba63;
    }

    .van-nav-bar__title {
        color: #fff;
        font-size: 1rem;
    }

    .personMsg {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .personMsg > img {
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        border: 0.12rem solid #fff;
    }

    .personInfo {
        display: flex;
        flex-direction: column;
        margin-left: 0.8rem;
    }

    .van-cell__left-icon {
        color: #FAA509;
        font-size: 1.2rem;
    }

    /*转场动画*/
    .router-slider-enter-active, .router-slider-leave-active {
        transition: all 0.3s;
    }

    .router-slider-enter, .router-slider-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>