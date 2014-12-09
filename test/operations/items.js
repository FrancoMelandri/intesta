
var ItemsOperation = function() {};

ItemsOperation.prototype.GET = function(request, operation, params, callback) {	
	var env = operation.env;
	var options = {
		qs : params,
		url : env.http + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body) { return JSON.parse(body);} );
};

ItemsOperation.prototype.Url = function() {
	return '/items';
}

module.exports = new ItemsOperation();