
var CardWalletOperation = function () {};

CardWalletOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		qs : params,
		method : "GET",
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body) { 
        var result = JSON.parse(body);
        return result;} );    
};

CardWalletOperation.prototype.PUT = function(request, operation, params, callback) {
    
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
    operation.execute(request, options, callback, function(body){ return body;} );
};

CardWalletOperation.prototype.POST = function(request, operation, params, callback) {
    
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
    operation.execute(request, options, callback, function(body){ return body;} );
};

CardWalletOperation.prototype.DELETE = function(request, operation, params, callback) {
    
    var env = operation.env;
    var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
        qs: params,
        method : "DELETE",
        url : env.https + operation.session.settings.siteCode + operation.url,
    };
    operation.execute(request, options, callback, function(body){ return body;} );
};
CardWalletOperation.prototype.Url = function() {
	return '/myoox/cardwallet';
}

module.exports = new CardWalletOperation();
