
var SuggestionsOperation = function() {};

SuggestionsOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		qs: params,
		method: 'GET',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body){ return JSON.parse(body);} );
};

SuggestionsOperation.prototype.Url = function() {
	return '/suggestions';
}

module.exports = new SuggestionsOperation();
