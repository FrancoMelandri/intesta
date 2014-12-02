
var fs = require('fs');

var Load = function() {
	var modules = {};
	var files = fs.readdirSync('./operations/');
	for(var file in files) {
		console.log (files[file]);
		var module = require('./operations/' + files[file]);
		modules[module.Url()] = module;
	}		
	console.log(modules);
	return modules;
};

exports.Load = Load;