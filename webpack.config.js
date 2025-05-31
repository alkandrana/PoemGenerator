const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: 'development',
    entry: {
        home: './src/js/index.js',
        search: './src/js/search.js'
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
            template: "./src/index.html",
            chunks: ["home"],
            inject: "body",
            filename: "index.html",
        }),
        new htmlWebpackPlugin({
            template: "./src/search.html",
            chunks: ["search"],
            inject: "body",
            filename: "search.html",
        }),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/css"),
                    to: path.resolve(__dirname, "dist/css")
                }
                ]})
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    optimization: {
        runtimeChunk: 'single',
    },

};