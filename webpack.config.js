var webpack = require('webpack');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: './dist',
        // filename: 'tool.min.js'
        filename: 'tool.js'
    },
    plugins: [
        // 暂时没找到自动生成min.js的方法，所以只能手动生成两个文件
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true
        // })
    ]
}