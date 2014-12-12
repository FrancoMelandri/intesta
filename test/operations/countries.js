
var CountriesOperation = function() {};

CountriesOperation.prototype.GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
        headers: {
                'User-Agent': operation.session.settings.userAgent
        },      
		qs: params,
		method: 'GET',
		url : env.https + operation.session.settings.siteCode + operation.url,
	};
    operation.execute(request, options, callback, getResult );
};

var getResult = function(body){
	return JSON.parse(body);
};

CountriesOperation.prototype.Url = function() {
	return '/countries';
};

module.exports = new CountriesOperation();
