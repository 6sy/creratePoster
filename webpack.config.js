const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 自定义模块
let allModules={
    0:'src',
    1:'diff_vnode',
    2:'poster_test'
}
let customModule=allModules[0]
module.exports = {
    mode: "development",
    devServer: {
        contentBase: "./build",
        port: 9001,
        open: true
    },
    entry: {
        app_1: `./${customModule}/index.js`
    },
    output: {
        filename: "[name].js",
        path: resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            esModule: false,
                            limit: 20
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // html
        new HtmlWebpackPlugin({
            template: `./${customModule}/index.html`
        })
    ]
};
