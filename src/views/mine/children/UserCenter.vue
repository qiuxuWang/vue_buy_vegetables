<template>
    <div id="UserCenter">
        <!--导航栏-->
        <van-nav-bar
                title="用户中心"
                left-arrow
                :fixed=true
                :border=true
                @click-left="$router.back()"
        ></van-nav-bar>
        <div class="logout">
            <button @click="logOut()">退出登录</button>
        </div>
    </div>
</template>

<script>
    import {getLogOut} from './../../../service/api/index'
    import {mapMutations} from 'vuex'
    import {Toast} from 'vant'

    export default {
        name: "UserCenter",
        methods: {
            ...mapMutations(["RESET_USER_INFO", "CLEAR_CART"]),
            async logOut() {
                let result = await getLogOut();
                if (result.success_code === 200) {
                    //清空本地数据
                    this.RESET_USER_INFO();
                    //清空本地购物车数据
                    this.CLEAR_CART();
                    Toast({
                        message: '退出登录成功！',
                        duration: 500
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #UserCenter {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #F5F5F5;
        z-index: 200;
    }

    .logout {
        margin-top: 4rem;
        height: 2.5rem;
        width: 100%;
        background-color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logout > button {
        background-color: transparent;
    }
</style>