<template>
    <div id="home">
        <Header/>
        <Sowing :sowing_list="sowing_list" />
    </div>
</template>

<script>
    //1. 引入
    import {getHomeData} from './../../service/api/index'
    //2.引入组件
    import Header from './components/header/Header'
    import Sowing from './components/sowing/Sowing'

    export default {
        name: "Home",

        data() {
            return {
                //首页轮播图数据
                sowing_list: [],
            }
        },
        created() {
            //2.请求网络数据
            getHomeData().then((response) => {
                console.log(response);
                if (response.success) {
                    this.sowing_list = response.data.list[0].icon_list;
                }
            }).catch((error) => {
                //todo
                console.log(error);
            })
        },
        components: {
            Header,
            Sowing
        }
    }
</script>

<style lang="less" scoped>
    #home {
        width: 100%;
        height: 100%;
        background-color: purple;
    }
</style>