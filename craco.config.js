/* craco.config.js */
/*
 * TODO: 区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */
const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco')
const webpack = require('webpack')
const CracoLessPlugin = require('craco-less')
// const CracoAntDesignPlugin = require('craco-antd')
const CracoVtkPlugin = require('craco-vtk')
const WebpackBar = require('webpackbar')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const FastRefreshCracoPlugin = require('craco-fast-refresh')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const path = require('path')

// 判断编译环境是否为生产
const isBuildAnalyzer = process.env.BUILD_ANALYZER === 'true'
const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
    webpack: {
        // 别名配置
        alias: {
            '@': pathResolve('.'),
            src: pathResolve('src'),
            assets: pathResolve('src/assets'),
            common: pathResolve('src/common'),
            components: pathResolve('src/components'),
            pages: pathResolve('src/pages'),
            store: pathResolve('src/store'),
            utils: pathResolve('src/utils')
        },
        plugins: [
            // webpack构建进度条
            new WebpackBar({
                profile: false
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // 查看打包的进度
            // new SimpleProgressWebpackPlugin(),
            // 新增模块循环依赖检测插件
            // ...whenDev(
            //     () => [
            //         new CircularDependencyPlugin({
            //             exclude: /node_modules/,
            //             include: /src/,
            //             failOnError: true,
            //             allowAsyncCycles: false,
            //             cwd: process.cwd()
            //         }),
            //         // webpack-dev-server 强化插件
            //         new DashboardPlugin(),
            //         new webpack.HotModuleReplacementPlugin()
            //     ],
            //     []
            // ),
            /**
             * 编译产物分析
             *  - https://www.npmjs.com/package/webpack-bundle-analyzer
             * 新增打包产物分析插件
             */
            ...when(
                isBuildAnalyzer,
                () => [
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static', // html 文件方式输出编译分析
                        openAnalyzer: false,
                        reportFilename: path.resolve(__dirname, `analyzer/index.html`)
                    })
                ],
                []
            ),
            ...whenProd(
                () => [
                    // new TerserPlugin({
                    //   // sourceMap: true, // Must be set to true if using source-maps in production
                    //   terserOptions: {
                    //     ecma: undefined,
                    //     parse: {},
                    //     compress: {
                    //       warnings: false,
                    //       drop_console: true, // 生产环境下移除控制台所有的内容
                    //       drop_debugger: true, // 移除断点
                    //       pure_funcs: ['console.log'] // 生产环境下移除console
                    //     }
                    //   }
                    // }),
                    // 打压缩包
                    new CompressionWebpackPlugin({
                        algorithm: 'gzip', // 使用gzip压缩
                        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'), // 匹配文件名
                        threshold: 10240, // 对超过10k的数据压缩
                        minRatio: 0.8 // 压缩率小于0.8才会压缩
                    })
                ],
                []
            )
        ],
        //抽离公用模块
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        /**
         * 重写 webpack 任意配置
         *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
         *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
         */
        configure: (webpackConfig, { env, paths }) => {
            // paths.appPath='public'
            paths.appBuild = 'dist' // 配合输出打包修改文件目录
            // webpackConfig中可以解构出你想要的参数比如mode、devtool、entry等等，更多信息请查看webpackConfig.json文件
            /**
             * 修改 output
             */
            webpackConfig.output = {
                ...webpackConfig.output,
                // ...{
                //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
                //   chunkFilename: 'static/js/[name].js'
                // },
                path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
                publicPath: './'
            }
            /**
             * webpack split chunks
             */
            // webpackConfig.optimization.splitChunks = {
            //   ...webpackConfig.optimization.splitChunks,
            //   ...{
            //     chunks: 'all',
            //     name: true
            //   }
            // }
            // 返回重写后的新配置
            return webpackConfig
        }
    },
    babel: {
        // 支持装饰器模式语法
        plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            [
                'import',
                {
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true //设置为true即是less
                }
            ],
            [
                'babel-plugin-styled-components',
                {
                    displayName: true //开启styled调试
                }
            ]
        ]
    },
    /**
     * 新增 craco 提供的 plugin
     */
    plugins: [
        // 热更新
        ...whenDev(
            () => [
                {
                    plugin: FastRefreshCracoPlugin
                },
                {
                    plugin: CracoVtkPlugin()
                }
            ],
            []
        ),
        // 方案1、配置Antd主题less
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#F56C6C' },
                        javascriptEnabled: true
                    }
                }
                // css module 配置
                // cssLoaderOptions: {
                //     modules: {
                //         localIdentName: '[local]_[hash:base64:5]',
                //         // 回调必须返回 `local`，`global`，或者 `pure`
                //         mode: resourcePath => {
                //             if (/pure\.(less|css)$/i.test(resourcePath)) {
                //                 return 'pure'
                //             }

                //             if (/(global)\.(less|css)$/i.test(resourcePath)) {
                //                 return 'global'
                //             }

                //             if (/antd/i.test(resourcePath)) {
                //                 return 'global'
                //             }

                //             return 'local'
                //         }
                //     }
                // }
            }
        }
        // 方案2、配置Antd主题
        // {
        //   plugin: CracoAntDesignPlugin,
        //   options: {
        //     customizeTheme: {
        //       '@primary-color': '#FF061C'
        //     }
        //   }
        // },
        // 方案3、配置Antd主题
        // {
        //     plugin: CracoAntDesignPlugin,
        //     options: {
        //         customizeThemeLessPath: path.join(__dirname, 'antd.customize.less')
        //     }
        // }
    ],
    devServer: {
        host: 'localhost',
        port: 80,
        proxy: {
            '/api': {
                target: 'https://placeholder.com/',
                changeOrigin: true,
                secure: false,
                xfwd: false,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
        // target：要使用url模块解析的url字符串
        // forward：要使用url模块解析的url字符串
        // agent：要传递给http（s）.request的对象（请参阅Node的https代理和http代理对象）
        // ssl：要传递给https.createServer（）的对象
        // ws：true / false，是否代理websockets
        // xfwd：true / false，添加x-forward标头
        // secure：true / false，是否验证SSL Certs
        // toProxy：true / false，传递绝对URL作为路径（对代理代理很有用）
        // prependPath：true / false，默认值：true - 指定是否要将目标的路径添加到代理路径
        // ignorePath：true / false，默认值：false - 指定是否要忽略传入请求的代理路径（注意：如果需要，您必须附加/手动）。
        // localAddress：要为传出连接绑定的本地接口字符串
        // changeOrigin：true / false，默认值：false - 将主机标头的原点更改为目标URL
    }
}
