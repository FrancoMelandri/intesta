
var SetCreditCardOperation = function() {};

SetCreditCardOperation.prototype.POST = function(request, operation, params, callback) {
	
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

    operation.execute(request, options, callback, function(body){ return body;} );
};

SetCreditCardOperation.prototype.Url = function() {
	return '/cart/setcreditcard';
}

module.exports = new SetCreditCardOperation();
