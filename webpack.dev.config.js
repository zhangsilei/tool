/**
 * @author https://github.com/zhangsilei 
 * @description 开发环境配置文件
 */

module.exports = {
    entry: './src/entry.js',

    output: {
        filename: 'tool.js',
        publicPath: '/asset/' // 设置虚拟目录
    },

    devServer: { 
        historyApiFallback: true, // 页面不跳转，适用于spa应用
        inline: true, // 开启自动刷新
        port: 8080, // 默认使用8080端口
        hot: true, // 开启模块热更新
        compress: true, // 开启gzip压缩
        progress: true, //显示打包进度
        openPage: '/test/test.html', // 指定默认打开文件
    }
}