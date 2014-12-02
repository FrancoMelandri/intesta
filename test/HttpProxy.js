var request = require('request');
var async = require('async');
var sync = require('sync-request');
var modules = require('./modulesLoader.js').Load();


var HttpProxy = function() {

	this.get = function(logger, session, env, url, verb, params) {

		logger.log('calling:' + url + ' params: ' + JSON.stringify(params));

		var operation = modules[url][verb];		
		if (operation) {
			return operation(sync, session, env, params);
		}
		return {			
			ErrorCode : 500
		};
	};
};

exports.HttpProxy = HttpProxy;

