const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {VueLoaderPlugin} = require('vue-loader')
let nodeEnv = process.env.NODE_ENV
module.exports = (config) => {
    console.log(config)
    return ({
        mode: 'development',
        entry: './src/main.js',
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.vue', 'tsx', 'ts'],   // 改变引入文件， 可以不写后缀名
            alias: {							// 配置 import 相对路径引入的文件or图片
                '@': '/src'
            }
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            assetModuleFilename: 'images/[contenthash].[ext]',
            filename: 'main.js'
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'src/static')
            },
            setupMiddlewares:(middlewares, devserver)=>{
                return require('./server/application')(middlewares, devserver)
            },
            compress: true,
            port: 9000,
            open: true
        },
        module: {
            rules: [
                // 配置eslint代码规范
                {
                    test: /\.jsx?$/,
                    loader: 'eslint-loader',
                    options: {fix: true},
                    enforce: "pre",
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node-modules/
                },
                {
                    test: /\.(gif|jpg|jpeg|png|svg)/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1024,
                                name: '[name]-dartgm.[ext]'
                            }
                        }
                    ]
                },
                // 配置scss样式文件处理
                {
                    test: /\.scss$/,
                    exclude: /node-modules/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                // 配置lodash全局注册
                {
                    test: require.resolve('lodash'),
                    loader: 'expose-loader',
                    options: {
                        exposes: {
                            globalName: '_',
                            override: true
                        }
                    }
                },
                // 配置 Vue 适配
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.txt$/,
                    loader: 'raw-loader'
                }
            ]
        },
        // 配置各种项目处理插件
        plugins: [
            // 定义网页入口bundle
            new HtmlWebpackPlugin({
                template: './src/index.html'
            }),
            // 定义css预处理插件
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                DEVELOPMENT: JSON.stringify(nodeEnv === 'development'),
                VERSION: "1",
                EXPRESSION: "1+2",
                COPYRIGHT: {
                    AUTHOR: JSON.stringify("郭明")
                }
            })
        ]
    })
}