var request = require('request');
var async = require('async');
var modules = require('./modulesLoader.js').Load();


var HttpProxy = function() {

	this.get = function(op, params, callback) {

		op.logger.log('calling:' + op.url + ' params: ' + JSON.stringify(params));
		
		var operation = modules[op.url][op.verb];
		if (operation) {
			return operation(request, op, params, callback);
		}
		return {			
			ErrorCode : 500
		};
	};
};

exports.HttpProxy = HttpProxy;

