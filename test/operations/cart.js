
var GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		qs : params,
		url : env.https + operation.session.settings.siteCode + Url(),
	};
	request(options, function(err, response, body) {
        if(err) { 
        	callback(true, {
        		ErrorCode : err,
				ErrorMessage : body,
			}); 
        	return; 
        }
        operation.context.results[operation.name] = body;
        callback(false, body);
      });
};


var Url = function() {
	return '/cart';
}

exports.GET = GET;
exports.Url = Url;
