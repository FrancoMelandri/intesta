var CartOperation = function() {};

CartOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		qs : params,
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body) { return JSON.parse(body); });
};


CartOperation.prototype.Url = function() {
	return '/cartinfo';
}

module.exports = new CartOperation();
