var webpack = require('webpack');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname + '/dist',
        filename: 'tool.js'
    }
}