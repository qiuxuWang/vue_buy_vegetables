<template>
    <div class="wrapper emptyWrapper">
        <div v-for="(categoriesDetail, index) in categoriesDetail" :key="categoriesDetail.id">
            <div class="categoryTitle">
                {{categoriesDetail.name}}
            </div>
            <ProductItem :products="categoriesDetail.products"/>
        </div>
    </div>
</template>

<script>
    //引入
    import ProductItem from './../components/ProductItem'

    export default {
        name: "ContentView",
        props: {
            categoriesDetail: Array
        },
        components: {
            ProductItem
        }
    }
</script>

<style scoped>
    .wrapper {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }

    .wrapper {
        position: absolute;
        left: 5.3125rem;
        right: 0;
        bottom: 0;
        top: 0;
        background: #FFF;
    }

    .categoryTitle {
        padding: 0 0.3125rem;
        height: 1.25rem;
        line-height: 1.25rem;
        font-size: 0.75rem;
        background: #F8F8F8;
        color: #666666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>