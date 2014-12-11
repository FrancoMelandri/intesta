
var ProceedOperation = function() {};

ProceedOperation.prototype.POST = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};

    operation.execute(request, options, callback, function(body){ return body;} );
};

ProceedOperation.prototype.Url = function() {
	return '/cart/proceed';
}

module.exports = new ProceedOperation();
