
var SearchResultsOperation = function() {};

SearchResultsOperation.prototype.GET = function(request, operation, params, callback) {	
	var env = operation.env;
	var options = {
		qs : params,
		url : env.http + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, function(body) { return JSON.parse(body);} );
};

SearchResultsOperation.prototype.Url = function() {
	return '/searchresults';
}

module.exports = new SearchResultsOperation();
