const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
    output: {
        publicPath: "http://localhost:8085/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 8085,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /react/, // import logo from './logo.svg?react'
                        use: ['@svgr/webpack'],
                    },
                    {
                        type: 'asset/resource', // встроенный в webpack 5 способ вместо file-loader
                    },
                ],
            },
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "layout",
            filename: "remoteEntry.js",
            remotes: {
                "profile": "profile@http://localhost:8082/remoteEntry.js",
                "card": "card@http://localhost:8083/remoteEntry.js"
            },
            exposes: {
                './Footer': './src/component/Footer.js',
                './Header': './src/component/Header.js',
                './Main': './src/component/Main.js'
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
};
