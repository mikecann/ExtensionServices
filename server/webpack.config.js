var webpack = require("webpack");
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: {
        "client": './src/client/IndexPage.tsx'
    },
    output: {
        filename: "./dist/public/js/[name].js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         // This has effect on the react lib size
        //         'NODE_ENV': JSON.stringify('production'),
        //     }
        // })
        new LiveReloadPlugin()
    ],
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: 'ts-loader' }
        ]
    }
}
