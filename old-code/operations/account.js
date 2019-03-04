
var AccountOperation = function () {};

AccountOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		qs : params,
		method : "GET",
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body){ return JSON.parse(body);} );
};

AccountOperation.prototype.PUT = function(request, operation, params, callback) {
    
    var env = operation.env;
    var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
        json : true,
        body: params,
        method : "PUT",
        url : env.https + operation.session.settings.siteCode + operation.url,
    };
    operation.execute(request, options, callback, function(body){ return JSON.parse(body);} );
};

AccountOperation.prototype.POST = function(request, operation, params, callback) {
    
    var env = operation.env;
    var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
        json : true,
        body: params,
        method : "POST",
        url : env.https + operation.session.settings.siteCode + operation.url,
    };
    operation.execute(request, options, callback, function(body){ return JSON.parse(body);} );
};


AccountOperation.prototype.Url = function() {
	return '/myoox/account';
}

module.exports = new AccountOperation();
