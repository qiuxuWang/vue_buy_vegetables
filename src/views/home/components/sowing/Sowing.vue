<template>
    <swiper id="swiper" ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="(sowing, index) in sowing_list" :key="sowing.public_id">
            <img :src="sowing.icon_url"  :alt="sowing.public_name">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: "Sowing",
        props: {
            sowing_list: Array
        },
        data() {
            return {
                swiperOption: {
                    //不需要等到页面数据加载就可以加载组件
                    notNextTick: true,
                    //分页
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    //循环播放
                    loop: true,
                    // 切换时长
                    autoplay: {
                        delay: 1000
                    },
                    //切换速度
                    speed: 600,
                    //滑动后回调函数
                    on: {
                        slideChangeTransitionEnd() {
                        }
                    }
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted() {

        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
    #swiper {
        width: 100%;
        height: 14rem;
        background-color: transparent;
    }

    #swiper img{
        width: 100%;
        height: 100%;
    }

    /*
      穿透修改样式
   */
    #swiper >>> .swiper-pagination-bullet-active{
        background-color: #75a342 ;
    }
</style>