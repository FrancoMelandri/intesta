
var PremiereOperation = function() {};

PremiereOperation.prototype.GET = function(request, operation, params, callback) {	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		qs : params,
		url : env.http + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body) { 
    		var result = JSON.parse(body);
    		return result;
    	} );
};

PremiereOperation.prototype.POST = function(request, operation, params, callback) {	
	var env = operation.env;
	params["attributes"] = JSON.parse(params["attributes"]);
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body){ 
    		var result = body;
    		return result;
    		} );
};

PremiereOperation.prototype.DELETE = function(request, operation, params, callback) {	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		qs: params,
		method: 'DELETE',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body){ 
    		var result = body;
    		return result;
    		} );
};

PremiereOperation.prototype.Url = function() {
	return '/myoox/premiere';
}

module.exports = new PremiereOperation();
