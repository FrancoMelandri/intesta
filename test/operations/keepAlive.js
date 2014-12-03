

var GET = function(request, operation, params, callback) {
	
	var env = operation.env;
	var options = {
		url : env.http + operation.session.settings.siteCode + Url(),
	};
	request(options, function(err, response, body) {
        if(err) { 
        	callback(true, { 
                            ErrorCode : res.statusCode,
				            ErrorMessage : res.getBody('utf8'),
			             }); 
        	return; 
        }
        var result = {ErrorCode : 200};
        var check = operation.check(result);
        if (check) {
        	callback(true, check);
        	return;
        }
        operation.context.results[operation.name] = result;
        callback(false, result);
      });
};

var Url = function() {
	return '/keepAlive';
}

exports.GET = GET;
exports.Url = Url;
