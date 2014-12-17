
var CreditsOperation = function() {};


CreditsOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		qs: params,
		method: 'GET',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};

    operation.execute(request, options, callback, function(body) {
    			 return JSON.parse(body);
    			} );
};

CreditsOperation.prototype.Url = function() {
	return '/myoox/credits';
}

module.exports = new CreditsOperation();
