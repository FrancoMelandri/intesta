var keepAlive = require('./operations/KeepAlive/keepAlive.js');
var login = require('./operations/login/login.js');
var cart = require('./operations/cart/cart.js');
var getAccount = require('./operations/account/getAccount.js');
var sync = require('sync-request');

var hash = {
	'/keepAlive': {
		instance: keepAlive
	},
	'/myoox/login': {
		instance: login
	},
	'/cart': {
		instance: cart
	},
	'/myoox/Account': {
		instance: getAccount
	},
};

var HttpProxy = function() {

	this.get = function(logger, session, env, url, verb, params) {

		logger.log('calling:' + url + ' params: ' + JSON.stringify(params));

		var operation = hash[url];
		if (operation) {
			return operation.instance.Do(sync, session, env, verb, url, params);
		}
		return {
			ErrorCode : 500
		};
	};
};

exports.HttpProxy = HttpProxy;

