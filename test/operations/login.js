
var LoginOperation = function() {};

LoginOperation.prototype.POST = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};

    operation.execute(request, options, callback, function(body){ return body;} );
};

LoginOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		qs: params,
		method: 'GET',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};

    operation.execute(request, options, callback, function(body){ return body;} );
};

LoginOperation.prototype.Url = function() {
	return '/myoox/login';
}

module.exports = new LoginOperation();
