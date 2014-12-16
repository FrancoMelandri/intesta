
var DreamBoxItemOperation = function() {};

DreamBoxItemOperation.prototype.POST = function(request, operation, params, callback) {	
	var env = operation.env;
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
    			return body;
    		} );
};

DreamBoxItemOperation.prototype.PUT = function(request, operation, params, callback) {	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		json : true,
		body: params,
		method: 'PUT',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body){
    			return body;
    		} );
};

DreamBoxItemOperation.prototype.DELETE = function(request, operation, params, callback) {	
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
    			return body;
    		} );
};

DreamBoxItemOperation.prototype.Url = function() {
	return '/myoox/dreamboxitem';
}

module.exports = new DreamBoxItemOperation();
