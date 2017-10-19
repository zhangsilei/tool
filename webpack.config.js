/**
 * @author https://github.com/zhangsilei 
 * @description 生产环境配置文件
 */

var webpack = require('webpack');

module.exports = {
    entry: './src/entry.js',
    
    output: {
        path: __dirname + '/dist',
        filename: 'tool.min.js'
    },

    devtool: 'eval-source-map', // 配置debug模式

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { // 压缩配置
                warnings: false
            },
            mangle: true, // 开启混淆
            minimize: true, // 开启压缩loaders
            minify: true, // 开启最小化
            sourcemap: true, // 生成soucemap文件，便于调试
        })
    ]
}