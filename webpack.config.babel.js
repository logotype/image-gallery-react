const path = require('path');

const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const yargs = require('yargs');

const optimizeMinimize = Boolean(yargs.argv.p);
const nodeEnv = optimizeMinimize ? 'production' : 'development';

const styleGallery = new ExtractTextWebpackPlugin({ filename: 'image-gallery.min.css', allChunks: false });
const styleExample = new ExtractTextWebpackPlugin({ filename: 'example.min.css', allChunks: false });

console.log('Build:', nodeEnv, ' optimizeMinimize:', optimizeMinimize);

const plugins = optimizeMinimize ? [
    new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify(nodeEnv) }
    }),
    new webpack.optimize.UglifyJsPlugin({ comments: false, compress: { warnings: false } }),
    styleGallery,
    styleExample,
    new HtmlWebpackPlugin({
        inject: false,
        filename: 'example.html',
        template: 'templates/example.html'
    })
] : [
    new webpack.DefinePlugin({
        'process.env': { 'NODE_ENV': JSON.stringify(nodeEnv) }
    }),
    styleGallery,
    styleExample,
    new HtmlWebpackPlugin({
        inject: false,
        filename: 'example.html',
        template: 'templates/example.html'
    })
];

module.exports = {
    entry: {
        'image-gallery': './src/ImageGallery.js',
        'example': './src/Example.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.join(__dirname, '/build'),
        library: 'ImageGallery',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
                exclude: /node_modules/ },
            {
                test: /scss\/image-gallery\.scss$/,
                use: styleGallery.extract(['css-loader', 'sass-loader']),
                exclude: /node_modules/
            },
            {
                test: /scss\/example\.scss$/,
                use: styleExample.extract(['css-loader', 'sass-loader']),
                exclude: /node_modules/
            },
            {
                test: /\.jpg$|\.gif$|\.png$|\.mp4$|\.svg$|\.woff$|\.ttf$|\.eot$|\.ico$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: plugins,
    devtool: optimizeMinimize ? false : 'source-map',
    context: __dirname,
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 8090,
        contentBase: __dirname,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {},
        quiet: false,
        noInfo: false,
        stats: {
            // Add asset Information
            assets: false,
            // Sort assets by a field
            assetsSort: 'field',
            // Add information about cached (not built) modules
            cached: true,
            // Show cached assets (setting this to `false` only shows emitted files)
            cachedAssets: true,
            // Add children information
            children: true,
            // Add chunk information (setting this to `false` allows for a less verbose output)
            chunks: false,
            // Add built modules information to chunk information
            chunkModules: false,
            // Add the origins of chunks and chunk merging info
            chunkOrigins: true,
            // Sort the chunks by a field
            chunksSort: 'field',
            // Context directory for request shortening
            context: '../src/',
            // `webpack --colors` equivalent
            colors: true,
            // Display the distance = require(the entry point for each module
            depth: false,
            // Display the entry points with the corresponding bundles
            entrypoints: false,
            // Add errors
            errors: true,
            // Add details to errors (like resolving log)
            errorDetails: true,
            // Exclude modules which match one of the given strings or regular expressions
            exclude: [],
            // Add the hash of the compilation
            hash: true,
            // Set the maximum number of modules to be shown
            maxModules: 15,
            // Add built modules information
            modules: false,
            // Sort the modules by a field
            modulesSort: 'field',
            // Show performance hint when file size exceeds `performance.maxAssetSize`
            performance: true,
            // Show the exports of the modules
            providedExports: false,
            // Add public path information
            publicPath: false,
            // Add information about the reasons why modules are included
            reasons: true,
            // Add the source code of modules
            source: true,
            // Add timing information
            timings: true,
            // Show which exports of a module are used
            usedExports: false,
            // Add webpack version information
            version: true,
            // Add warnings
            warnings: true
        }
    }
};
