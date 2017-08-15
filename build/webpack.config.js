const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const project = require('../project.config.js');

const inProject = file => path.resolve(project.basePath, file);
const inProjectSource = file => path.resolve(project.basePath, project.srcDir, file);

const config = {
	entry: {
		normalize: inProjectSource('normalize'),
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
		}],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: inProjectSource('index.html'),
			inject: true,
			minify: {
				collapseWhitespace: true,
			},
		}),
		new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'normalize', 'manifest'] })
	],
};

module.exports = config;