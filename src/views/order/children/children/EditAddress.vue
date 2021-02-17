<template>
    <div id="editAddress">
        <!--导航栏-->
        <van-nav-bar
                title="修改地址"
                left-arrow
                :fixed=true
                :border=true
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-address-edit
                :area-list="areaList"
                :address-info="addressInfo"
                show-postal
                show-delete
                show-set-default
                @save="onSave"
                @delete="onDelete"
                style="margin-top: 3rem"
        >
        </van-address-edit>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    import {mapState} from 'vuex'
    import {getCurrentUserAddress, changeUserAddress, delUserAddress} from './../../../../service/api/index'
    import areaList from './../../../../config/area'
    import PubSub from 'pubsub-js'

    export default {
        name: "EditAddress",
        data() {
            return {
                areaList: areaList,
                searchResult: [],
                addressInfo: {}
            }
        },
        computed: {
            ...mapState(['userInfo'])
        },
        mounted() {
            // console.log(this.$route);
            if (this.$route.query.address_id) {
                if (this.userInfo.token) {
                    this.getCurrentAddress(this.userInfo.token, this.$route.query.address_id)
                }
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
            },
            //修改收货地址
            async onSave(content) {
                if (this.userInfo.token) {
                    //发起修改请求
                    let result = await changeUserAddress(this.addressInfo.id, this.userInfo.token, content.name, content.tel, content.province + content.city + content.county, content.addressDetail, content.postalCode, content.isDefault, content.province, content.city, content.county, content.areaCode);
                    //判断是否修改成功
                    if (result.success_code === 200) {
                        Toast({
                            message: '修改地址成功！',
                            duration: 500
                        });
                        //返回到上一级界面
                        this.$router.back();
                        //发布修改成功消息
                        PubSub.publish('addOrEditAddressSuccess')
                    } else {
                        Toast({
                            message: '修改地址失败！',
                            duration: 500
                        });
                    }
                }
            },
            //删除收货地址
            async onDelete() {
                let result = await delUserAddress(this.addressInfo.id);
                if (result.success_code === 200) {
                    Toast({
                        message: '删除地址成功！',
                        duration: 500
                    });
                    //返回到上一级界面
                    this.$router.back();
                    //发布修改成功消息
                    PubSub.publish('addOrEditAddressSuccess')
                } else {
                    Toast({
                        message: '删除地址失败！',
                        duration: 500
                    });
                }
            },
            //获取当前修改地址
            async getCurrentAddress(user_id, address_id) {
                let result = await getCurrentUserAddress(user_id, address_id);
                // console.log(result);
                if (result.success_code === 200) {
                    this.addressInfo = {
                        id: result.data._id,
                        name: result.data.address_name,
                        tel: result.data.address_phone,
                        province: result.data.province,
                        city: result.data.city,
                        county: result.data.county,
                        addressDetail: result.data.address_area_detail,
                        areaCode: result.data.areaCode,
                        postalCode: result.data.address_post_code,
                        isDefault: result.data.address_tag
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #editAddress {
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