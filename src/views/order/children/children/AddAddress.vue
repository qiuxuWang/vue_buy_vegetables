<template>
    <div id="addAddress">
        <!--导航栏-->
        <van-nav-bar
                title="添加地址"
                left-arrow
                :fixed=true
                :border=true
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-set-default
                :search-result="searchResult"
                @save="onSave"
                @change-detail="onChangeDetail"
                style="margin-top: 3rem"
        >
        </van-address-edit>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    import areaList from './../../../../config/area'
    import {addUserAddress} from './../../../../service/api/index'
    import {mapState} from 'vuex'
    import PubSub from 'pubsub-js'

    export default {
        name: "AddAddress",
        data() {
            return {
                areaList: areaList,
                searchResult: [],
            }
        },
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            //保存用户信息
            async onSave(content) {
                if (this.userInfo.token) {
                    let result = await addUserAddress(this.userInfo.token, content.name, content.tel, content.province + content.city + content.county, content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
                    console.log(result);
                    //判断
                    if (result.success_code === 200) {
                        Toast({
                            message: '添加地址成功！',
                            duration: 400
                        });
                        //返回上一页
                        this.$router.back();
                        //发起通知
                        PubSub.publish('addOrEditAddressSuccess')
                    } else {
                        Toast({
                            message: '添加地址失败！',
                            duration: 400
                        })
                    }
                }
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [
                        {
                            name: '黄龙万科中心',
                            address: '杭州市西湖区',
                        },
                    ];
                } else {
                    this.searchResult = [];
                }
            },
        }
    }
</script>

<style scoped>
    #addAddress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #F5F5F5;
        z-index: 9999;
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