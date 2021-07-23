const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "development",
    devServer: {
        contentBase: "./build",
        port: 9001,
        open: true
    },
    entry: {
        app_1: "./src/index.js"
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
            template: "./src/index.html"
        })
    ],
};
