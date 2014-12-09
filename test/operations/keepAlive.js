
var KeepAliveOperation = function() {};

KeepAliveOperation.prototype.GET = function(request, operation, params, callback) {	
	var env = operation.env;
	var options = {
		url : env.http + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body){ return JSON.parse(body);} );
};

KeepAliveOperation.prototype.Url = function() {
	return '/keepAlive';
}

module.exports = new KeepAliveOperation();
