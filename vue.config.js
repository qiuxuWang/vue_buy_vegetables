module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/web/xlmc',
                //允许跨域
                changeOrigin: true,
                pathRewrite: { //如果不重写就会有两个api
                    '^/api': ''
                }
            }
        }
    }
};