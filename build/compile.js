const execSync = require('child_process').execSync;

console.log('Starting to build the module..');
try {
	execSync('babel src/ -d dist --ignore dev/*.js');
	console.log('Module sucessfully built.');
} catch(e) {
	console.log(`Error on building module: ${e}.`);
}
