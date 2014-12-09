
var AddItemOperation = function() {};

AddItemOperation.prototype.POST = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};

    operation.execute(request, options, callback, function(body){ return body;} );
};

AddItemOperation.prototype.Url = function() {
	return '/cart/additem';
}

module.exports = new AddItemOperation();
