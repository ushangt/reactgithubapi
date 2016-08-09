var webpack = require('webpack');

module.exports = {
    entry: {
            javascript: './src/index.js',
            html: "./src/index.html",
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        },
        {
            test: /\.html$/,
            loader: "file?name=[name].[ext]",
        },
        {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: 'dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ]
};