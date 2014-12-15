var request = require('request');
var async = require('async');
var modules = require('./modulesLoader.js').Load();

//
// substitute parameters in route url. Take a look
// to orderdetails
function fixUrl(url, params, again) {
	var open = url.indexOf('{');
	var close = url.indexOf('}');
	if(open === -1 && close === -1) {
		return url;
	};
	var inner = url.substring(open +1, close);
	var left = url.substring(0, open);
	var right = url.substring(close+1);

	url = left + params[inner] + right;
	open = url.indexOf('{');

	if (open !== -1 && again)
		url = again(url, params, again);
	return url;
};


var HttpProxy = function() {

	this.get = function(op, params, callback) {		
		var operation = modules[op.url][op.verb];

		op.logger.log(op.verb + ' -> ' + op.url + ' params: ' + JSON.stringify(params));
		op.url = fixUrl(op.url, params, fixUrl);
		if (operation) {
			return operation(request, op, params, callback);
		}
		return {			
			ErrorCode : 500
		};
	};
};

exports.HttpProxy = HttpProxy;

