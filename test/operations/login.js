
var LoginOperation = function() {};

LoginOperation.prototype.POST = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		json : true,
		body: params,
		method: 'POST',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body){ return {
			"ErrorCode" : body.ErrorCode,
			"userid" : body.User.idUser,
			"accessToken" : body.User.AccessToken,
			"cartid" : body.CartInfo.CartId,
			"carttoken" : body.CartInfo.CartToken
		};} );
};

LoginOperation.prototype.Url = function() {
	return '/myoox/login';
}

module.exports = new LoginOperation();
