var sync = require('sync-request');
var modules = require('./modulesLoader.js').Load();

var HttpProxy = function() {

	this.get = function(logger, session, env, url, verb, params) {

		logger.log('calling:' + url + ' params: ' + JSON.stringify(params));

		var operation = modules[url];
		if (operation) {
			return operation.Do(sync, session, env, verb, url, params);
		}
		return {
			ErrorCode : 500
		};
	};
};

exports.HttpProxy = HttpProxy;

