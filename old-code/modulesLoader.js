
var fs = require('fs');

var Loader = function() {};

Loader.prototype.Load = function() {
	var modules = {};
	var files = fs.readdirSync('./operations/');
	for(var file in files) {
		var module = require('./operations/' + files[file]);
		modules[module.Url()] = module;
	}		
	return modules;
};

module.exports = new Loader();