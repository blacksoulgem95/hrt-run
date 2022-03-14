const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: './src/app.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "The HRT Run",
            template: "public/index.html"
        }),
        new CopyPlugin({
            patterns: [
                {from: "public/CNAME", to: ""},
                {from: "public/**/*.jpg", to: "assets/[name][ext]"},
                {from: "public/**/*.png", to: "assets/[name][ext]"},
            ],
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 8085
    },
    mode: 'development'
};


