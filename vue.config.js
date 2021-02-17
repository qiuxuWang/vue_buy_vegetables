module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/web/xlmc',
                changeOrigin: true,  //允许跨域
                pathRewrite: { //如果不重写就会有两个api
                    '^/api': ''
                }
            },
            '/pay': {
                target: 'http://47.98.157.152/WXPayProject/pay',
                changeOrigin: true,
                pathRewrite: {
                    '^/pay': ''
                }
            }
        }
    }
};