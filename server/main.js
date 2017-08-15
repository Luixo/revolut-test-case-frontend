const express = require('express');
const compress = require('compression');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../build/webpack.config');
const project = require('../project.config');

const app = express();
app.use(compress());

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath  : webpackConfig.output.publicPath,
	contentBase : path.resolve(project.basePath, project.srcDir),
	hot         : true,
	quiet       : false,
	noInfo      : false,
	lazy        : false,
	stats       : 'normal',
}));
app.use(webpackHotMiddleware(compiler, {
	path: '/__webpack_hmr'
}));

app.use('*', (req, res, next) => {
	const filename = path.join(compiler.outputPath, 'index.html');
	compiler.outputFileSystem.readFile(filename, (err, result) => {
		if (err)
			return next(err);
		res.set('content-type', 'text/html');
		res.send(result);
		res.end();
	})
});

module.exports = app;
