const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: 'development',
    entry: {
        home: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            },
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./index.html",
            chunks: ["home"],
            inject: "body",
            filename: "index.html",
        }),
        new htmlWebpackPlugin({
            template: "./search.html",
            chunks: ["search"],
            inject: "body",
            filename: "search.html",
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    optimization: {
        runtimeChunk: 'single',
    },

};