
var LabelsOperation = function() {};

LabelsOperation.prototype.GET = function(request, operation, params, callback) {	
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

LabelsOperation.prototype.Url = function() {
	return '/labels';
}

module.exports = new LabelsOperation();
