
var OrderDetailsOperation = function() {};

OrderDetailsOperation.prototype.GET = function(request, operation, params, callback) {	
	var env = operation.env;
	var url = env.https + operation.session.settings.siteCode + operation.url;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		qs : params,
		url : url,
	};
    operation.execute(request, options, callback, function(body) { 
    		var result = JSON.parse(body);
    		return result;
    	} );
};

OrderDetailsOperation.prototype.Url = function() {
	return '/myoox/orders/{ordernum}';
}

module.exports = new OrderDetailsOperation();
