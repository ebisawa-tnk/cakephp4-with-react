// const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "development";
// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";
module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: MODE,
    entry: {
        'index':'./src/index.js',
        // "room": "./src/room.js"
    },
    output: {
        path: __dirname +'./dist/js',
        // path: '/Users/ebisawa/www/php/hashigo/webroot/assets',
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                // 拡張子 .js の場合
                test: /\.js$/,
                use: [
                    {
                        // Babel を利用する
                        loader: "babel-loader",
                        // Babel のオプションを指定する
                        options: {
                            presets: [
                                // プリセットを指定することで、ES2020 を ES5 に変換
                                "@babel/preset-env","@babel/preset-react"
                            ],
                            plugins: [
                                ["@babel/plugin-proposal-class-properties", { "loose": true }]
                            ]
                        },
                    },
                ],
            },
            {
                test: /\.scss/, // 対象となるファイルの拡張子
                use: [
                    // linkタグに出力する機能
                    MiniCssExtractPlugin.loader,
                    // CSSをバンドルするための機能
                    {
                        loader: "css-loader",
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            url: false,
                            // ソースマップの利用有無
                            sourceMap: enabledSourceMap,

                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            // importLoaders: 2
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            // ソースマップの利用有無
                            sourceMap: enabledSourceMap
                        },
                    },
                ],
            },
        ],
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    externals: {
        //jquery: 'jQuery'
    },
    target: 'node',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new Dotenv({ systemvars: true }),
    ],
    devServer: {
        historyApiFallback: true,
        inline: true,
        // watchContentBase: true,
    }
};
