
var SetReceiverOperation = function() {};

SetReceiverOperation.prototype.POST = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};

    operation.execute(request, options, callback, function(body){ return body;} );
};

SetReceiverOperation.prototype.Url = function() {
	return '/cart/setreceiver';
}

module.exports = new SetReceiverOperation();
