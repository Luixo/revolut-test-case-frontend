const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const project = require('../project.config.js');

const inProject = file => path.resolve(project.basePath, file);
const inProjectSource = file => path.resolve(project.basePath, project.srcDir, file);

const config = {
	entry: {
		normalize: inProjectSource(project.normalize),
		main: [inProjectSource(project.main), `webpack-hot-middleware/client.js?path=${project.publicPath}__webpack_hmr`],
		vendor: project.vendors
	},
	devtool: project.sourceMaps ? 'source-map' : false,
	output: {
		path: inProject(project.outDir),
		filename: '[name].js',
		publicPath: project.publicPath,
	},
	resolve: {
		modules: [
			inProject(project.srcDir),
			'node_modules',
		],
		extensions: ['*', '.js', '.jsx', '.json'],
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
			}],
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader',
		}],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: inProjectSource(project.index),
			inject: true,
			minify: {
				collapseWhitespace: true,
			},
		}),
		new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'normalize', 'manifest'] }),
		new webpack.DefinePlugin({
			'__DEV__': true,
			OPENEX_API_KEY: JSON.stringify(process.env.OPENEX_API_KEY || 'Put_your_Open_Exchange_API_key_into_>OPENEX_API_KEY<_variable'),
		})
	],
};

module.exports = config;