module.exports = {
	basePath: __dirname,
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
