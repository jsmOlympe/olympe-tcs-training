const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Copy = require('copy-webpack-plugin');
const {merge} = require('webpack-merge');
const {IgnorePlugin} = require('webpack');

const dist = path.join(__dirname, 'dist/web');
const distNode = path.join(__dirname, 'dist/node/node');
const drawPath = path.resolve(__dirname, 'node_modules/@olympeio/draw');

const common = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {test: /\.js$/, enforce: 'pre', use: 'source-map-loader'},
            {test: /\.js$/, enforce: 'pre', use: 'webpack-import-glob-loader'},
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {presets: ['@babel/env', '@babel/react']},
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components)/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            '@olympeio': path.resolve(__dirname, 'node_modules/@olympeio'),
            'olympeio-extensions': path.resolve(__dirname, 'node_modules/@olympeio-extensions'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new IgnorePlugin({resourceRegExp: /^(mssql*|mariasql|.oracle|oracledb|mysql|mysql2|mssql.|tedious|sqlite3|pg-query-stream|pg-native|node-pre-gyp)$/})
    ],
};

const server = {
    devServer: {
        contentBase: dist,
        writeToDisk: true,
        compress: true,
        port: 8888,
    },
};

const draw = {
    entry: './src/main.js',
    output: {path: dist, globalObject: 'this'},
    resolve: {
        alias: {olympe: drawPath},
    },
    plugins: [
        new Copy({patterns: [
            {from: 'res/version.json'},
            {from: 'res/index.html'},
            {from: 'res/stylesheets', to: 'stylesheets'},
            {from: drawPath + '/images', to: 'images'},
            {from: drawPath + '/fonts', to: 'fonts'},
            {from: drawPath + '/css', to: 'css'},
            {from: drawPath + '/doc', to: 'doc'},
        ]}),
    ],
};

const node = {
    entry: './src/main-node.js',
    output: {path: distNode, globalObject: 'this'},
    target: 'node',
    resolve: {
        alias: {olympe: path.resolve(__dirname, 'node_modules/@olympeio/runtime-node')},
    },
    plugins: [
        new Copy({
            patterns: [
                {from: 'res/version.json'},
            ],
        }),
    ],
};

const drawLocal = {
    name: 'drawLocal',
    plugins: [
        new Copy({
            patterns: [
                {from: 'res/oConfig-local.json', to: 'oConfig.json'},
            ],
        }),
    ],
};

const drawDist = {
    name: 'draw',
    plugins: [
        new Copy({
            patterns: [
                {from: 'res/oConfig.json', to: 'oConfig.json'},
            ],
        }),
    ],
};

const nodeLocal = {
    name: 'nodeLocal',
    plugins: [
        new Copy({
            patterns: [
                {from: 'res/oConfigNode-local.json', to: 'oConfig.json'},
            ],
        }),
    ],
};

const nodeDist = {
    name: 'node',
    plugins: [
        new Copy({
            patterns: [
                {from: 'res/oConfigNode.json', to: 'oConfig.json'},
            ],
        }),
    ],
};

module.exports = [merge(common, server, draw, drawLocal),
    merge(common, server, draw, drawDist),
    merge(common, node, nodeLocal),
    merge(common, node, nodeDist)];
