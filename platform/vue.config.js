const {defineConfig} = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
    transpileDependencies: true,
    // publicPath: './',
    // assetsDir: './',
    chainWebpack: config => {
        config.module
            .rule('graphql')
            .test(/\.(graphql|gql)$/)
            .use('graphql-tag/loader')
            .loader('graphql-tag/loader')
            .end();
    },
    configureWebpack: (config) => {
        config.plugins = [
            ...config.plugins,
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ];
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http"),
            "assert": require.resolve("assert/"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer")
        };
    }
})
