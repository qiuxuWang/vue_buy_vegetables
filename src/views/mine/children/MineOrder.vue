<template>
    <div id="mineOrder">
        <!--导航栏-->
        <van-nav-bar
                title="我的订单"
                left-arrow
                :fixed=true
                :border=true
                @click-left="$router.go(-1)"
        ></van-nav-bar>
        <!--内容-->
        <van-tabs
                v-model="activeName"
                style="margin-top: 2.6rem"
                title-active-color="#75a342"
                color="#75a342"
                @click="dealWithTabClick"
        >
            <van-tab title="全部" name="a">
                <MineOrderItem v-for="(order, index) in allOrderArr" :order="order" :key="order._id"></MineOrderItem>
            </van-tab>
            <van-tab title="待支付" name="b">
                <MineOrderItem v-for="(order, index) in allWillOrderArr" :order="order" :key="order._id"></MineOrderItem>
            </van-tab>
            <van-tab title="待收货" name="c">
                <MineOrderItem v-for="(order, index) in allPayOrderArr" :order="order" :key="order._id"></MineOrderItem>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {Toast} from 'vant'

    import MineOrderItem from './../children/components/MineOrderItem'
    import {getOrder} from './../../../service/api/index'
    import {mapState} from 'vuex'

    export default {
        name: "MineOrder",
        data() {
            return {
                activeName: 'a',
                allOrderArr: null,      //所有的订单
                allWillOrderArr: null,  //所有待支付订单
                allPayOrderArr: null,   //所有已支付订单
            }
        },
        computed: {
            ...mapState(['userInfo'])
        },
        mounted() {
            //获取订单数据
            this.initOrder();
        },
        methods: {
            //初始化订单数据
            async initOrder() {
                let result = await getOrder(this.userInfo.token);
                if (result.success_code === 200) {
                    this.allOrderArr = result.data;
                    console.log(this.allOrderArr);
                } else {
                    Toast({
                        message: '订单获取失败！',
                        duration: 500
                    })
                }
            },
            async dealWithTabClick(name, title) {
                if (name === 'a') {
                    this.allOrderArr = await this.getTabOrder()
                } else if (name === 'b') {
                    this.allWillOrderArr = await this.getTabOrder('will')
                } else if (name === 'c') {
                    this.allPayOrderArr = await this.getTabOrder('pay')
                }
            },
            async getTabOrder(status) {
                let result = await getOrder(this.userInfo.token, status);
                if (result.success_code === 200) {
                    return result.data;
                } else {
                    Toast({
                        message: '订单获取失败！',
                        duration: 500
                    })
                }
            },
        },
        components: {
            MineOrderItem
        }
    }
</script>

<style scoped>
    #mineOrder {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        height: 120%;
        background-color: #F5F5F5;
        z-index: 200;
    }
</style>