
var SetSenderOperation = function() {};

SetSenderOperation.prototype.POST = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};

    operation.execute(request, options, callback, function(body){ return body;} );
};

SetSenderOperation.prototype.Url = function() {
	return '/cart/setsender';
}

module.exports = new SetSenderOperation();
