
var OrdersOperation = function() {};

OrdersOperation.prototype.GET = function(request, operation, params, callback) {	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		qs : params,
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body) { 
    		var result = JSON.parse(body);
    		return result;
    	} );
};

OrdersOperation.prototype.Url = function() {
	return '/myoox/orders';
}

module.exports = new OrdersOperation();
