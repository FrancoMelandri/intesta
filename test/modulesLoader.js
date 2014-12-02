
var fs = require('fs');

var Load = function() {
	var modules = {};
	var files = fs.readdirSync('./operations/');
	for(var file in files) {
		var module = require('./operations/' + files[file]);
		modules[module.Url()] = module;
	}		
	return modules;
};

exports.Load = Load;