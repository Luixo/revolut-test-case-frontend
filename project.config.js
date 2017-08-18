module.exports = {
	basePath: __dirname,
	env: process.env.NODE_ENV || 'development',
	srcDir: 'src',
	main: 'dev/main',
	index: 'dev/index.html',
	normalize: 'dev/normalize',
	outDir: 'dist',
	publicPath: '/',
	sourceMaps: true,
	verbose: true,
	vendors: [
		'react',
		'react-dom',
	],
};
