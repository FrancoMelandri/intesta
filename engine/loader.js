
var fs = require('fs');

const loader = (rootDir) => {
	var modules = {};
	var files = fs.readdirSync(rootDir);
	for(var file in files) {
		var module = require(rootDir + '/' + files[file]);
		modules[module.Url()] = module;
	}		
	return modules;
}

module.exports = loader;