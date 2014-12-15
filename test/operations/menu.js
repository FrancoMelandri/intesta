
var MenuOperation = function() {};

MenuOperation.prototype.GET = function(request, operation, params, callback) {	
	var env = operation.env;
	var options = {
		qs : params,
		url : env.http + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body) { 
    	var result = JSON.parse(body);
		return result;
		} );
};

MenuOperation.prototype.Url = function() {
	return '/menu';
}

module.exports = new MenuOperation();
